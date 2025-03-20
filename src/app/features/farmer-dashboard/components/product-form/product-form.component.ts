import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product, ProductCategory, MeasurementUnit, ProductVariant } from '../../../../core/models/product.model';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  categories = Object.values(ProductCategory);
  measurementUnits: MeasurementUnit[] = [];
  selectedFile: File | null = null;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService
  ) {
    this.initForm();
  }

  ngOnInit(): void {}

  private initForm(): void {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      category: ['', Validators.required],
      basePrice: [0, [Validators.required, Validators.min(1)]],
      baseQuantity: [0, [Validators.required, Validators.min(1)]],
      measurementUnit: ['', Validators.required],
      variants: this.fb.array([]),
      status: ['available']
    });

    // Watch for category changes to update measurement units
    this.productForm.get('category')?.valueChanges.subscribe(category => {
      this.updateMeasurementUnits(category);
    });
  }

  private updateMeasurementUnits(category: ProductCategory): void {
    const measurementUnitControl = this.productForm.get('measurementUnit');
    if (measurementUnitControl) {
      measurementUnitControl.setValue('');
      switch (category) {
        case ProductCategory.VEGETABLES:
          this.measurementUnits = [MeasurementUnit.KG_BOX_25, MeasurementUnit.KG_BOX_50, MeasurementUnit.KG];
          break;
        case ProductCategory.LEAFY_VEGETABLES:
          this.measurementUnits = [MeasurementUnit.BUNDLE, MeasurementUnit.KG];
          break;
        case ProductCategory.FRUITS:
          this.measurementUnits = [MeasurementUnit.KG, MeasurementUnit.PIECE];
          break;
        case ProductCategory.GRAINS:
          this.measurementUnits = [MeasurementUnit.KG_BOX_50, MeasurementUnit.KG];
          break;
        default:
          this.measurementUnits = [MeasurementUnit.KG, MeasurementUnit.PIECE];
      }
    }
  }

  incrementQuantity(): void {
    const quantityControl = this.productForm.get('baseQuantity');
    if (quantityControl) {
      const currentValue = quantityControl.value || 0;
      quantityControl.setValue(currentValue + 1);
    }
  }

  decrementQuantity(): void {
    const quantityControl = this.productForm.get('baseQuantity');
    if (quantityControl) {
      const currentValue = quantityControl.value || 0;
      if (currentValue > 0) {
        quantityControl.setValue(currentValue - 1);
      }
    }
  }

  get variants(): FormArray {
    return this.productForm.get('variants') as FormArray;
  }

  addVariant(): void {
    const variantForm = this.fb.group({
      size: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      quantity: [0, [Validators.required, Validators.min(0)]],
      measurementUnit: ['', Validators.required]
    });

    this.variants.push(variantForm);
  }

  removeVariant(index: number): void {
    this.variants.removeAt(index);
  }

  onFileSelected(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!allowedTypes.includes(file.type)) {
        console.error('Invalid file type. Please upload an image file.');
        return;
      }

      if (file.size > maxSize) {
        console.error('File is too large. Maximum size is 5MB.');
        return;
      }

      this.selectedFile = file;
    }
  }

  errorMessage: string = '';
  successMessage: string = '';

  onSubmit(): void {
    this.errorMessage = '';
    this.successMessage = '';
    
    Object.keys(this.productForm.controls).forEach(key => {
      const control = this.productForm.get(key);
      if (control) {
        control.markAsTouched();
      }
    });

    if (this.productForm.valid) {
      this.isLoading = true;
      const formData = new FormData();
      const productData = this.productForm.value;

      // Append form data
      Object.keys(productData).forEach(key => {
        if (key !== 'variants' && key !== 'image') {
          formData.append(key, productData[key]);
        }
      });

      // Append variants as JSON string
      if (productData.variants.length > 0) {
        formData.append('variants', JSON.stringify(productData.variants));
      }

      // Append image if selected
      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }

      this.productService.createProduct(formData).subscribe(
        (response) => {
          this.isLoading = false;
          this.successMessage = 'Product created successfully';
          this.productForm.reset();
          this.selectedFile = null;
        },
        (error) => {
          this.isLoading = false;
          if (error.message) {
            this.errorMessage = error.message;
          } else {
            this.errorMessage = 'An error occurred while creating the product. Please try again.';
          }
        }
      );
    }
  }
}