import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Product, ProductCategory, MeasurementUnit } from '../../../../../core/models/product.model';

export interface ProductVariant {
  type: string;
  name: string;
}

@Component({
  selector: 'app-product-dialog',
  template: `
    <h2 mat-dialog-title>{{ data ? 'Edit' : 'Add' }} Product</h2>
    <form [formGroup]="productForm" (ngSubmit)="onSubmit()">
      <div mat-dialog-content>
        <div class="mb-4">
          <mat-form-field class="w-full">
            <mat-label>Product Name</mat-label>
            <input matInput formControlName="name" required>
            <mat-error *ngIf="productForm.get('name')?.hasError('required')">
              Product name is required
            </mat-error>
          </mat-form-field>
        </div>

        <div class="mb-4">
          <mat-form-field class="w-full">
            <mat-label>Variant</mat-label>
            <mat-select formControlName="variant" required>
              <mat-option *ngFor="let variant of variants" [value]="variant.type">
                {{ variant.name }}
              </mat-option>
            </mat-select>
            <mat-error *ngIf="productForm.get('variant')?.hasError('required')">
              Variant is required
            </mat-error>
          </mat-form-field>
        </div>

        <div class="mb-4">
          <mat-form-field class="w-full">
            <mat-label>Base Quantity</mat-label>
            <input matInput type="number" formControlName="baseQuantity" required>
            <mat-error *ngIf="productForm.get('baseQuantity')?.hasError('required')">
              Base quantity is required
            </mat-error>
            <mat-error *ngIf="productForm.get('baseQuantity')?.hasError('min')">
              Base quantity must be 0 or greater
            </mat-error>
          </mat-form-field>
        </div>

        <div class="mb-4">
          <mat-form-field class="w-full">
            <mat-label>Category</mat-label>
            <mat-select formControlName="category" required>
              <mat-option *ngFor="let cat of categories" [value]="cat">
                {{ cat }}
              </mat-option>
            </mat-select>
            <mat-error *ngIf="productForm.get('category')?.hasError('required')">
              Category is required
            </mat-error>
          </mat-form-field>
        </div>

        <div class="mb-4">
          <mat-form-field class="w-full">
            <mat-label>Measurement Unit</mat-label>
            <mat-select formControlName="measurementUnit" required>
              <mat-option *ngFor="let unit of measurementUnits" [value]="unit">
                {{ unit }}
              </mat-option>
            </mat-select>
            <mat-error *ngIf="productForm.get('measurementUnit')?.hasError('required')">
              Measurement unit is required
            </mat-error>
          </mat-form-field>
        </div>

        <div class="mb-4">
          <mat-form-field class="w-full">
            <mat-label>Base Price</mat-label>
            <input matInput type="number" formControlName="basePrice" required>
            <mat-error *ngIf="productForm.get('basePrice')?.hasError('required')">
              Base price is required
            </mat-error>
            <mat-error *ngIf="productForm.get('basePrice')?.hasError('min')">
              Base price must be greater than 0
            </mat-error>
          </mat-form-field>
        </div>

        <div class="mb-4">
          <mat-form-field class="w-full">
            <mat-label>Description</mat-label>
            <textarea matInput formControlName="description" required></textarea>
            <mat-error *ngIf="productForm.get('description')?.hasError('required')">
              Description is required
            </mat-error>
          </mat-form-field>
        </div>

        <div class="mb-4">
          <p class="text-sm text-gray-600 mb-2">Product Image (Optional)</p>
          <input type="file" (change)="onImageSelected($event)" accept="image/*" hidden #fileInput>
          <div class="image-upload-container">
            <div class="preview-container" (click)="fileInput.click()">
              <img [src]="data?.image || 'assets/default-product.png'" *ngIf="!imagePreview; else preview" class="preview-image">
              <ng-template #preview>
                <img [src]="imagePreview" class="preview-image">
              </ng-template>
              <div class="overlay-text">Click to upload image</div>
            </div>
          </div>
        </div>
      </div>

      <div mat-dialog-actions class="flex justify-end gap-2">
        <button mat-button type="button" (click)="onCancel()">Cancel</button>
        <button mat-raised-button color="primary" type="submit" [disabled]="!productForm.valid">
          {{ data ? 'Update' : 'Add' }}
        </button>
      </div>
    </form>
  `,
  styles: []
})
export class ProductDialogComponent {
  productForm: FormGroup;
  imagePreview: string | null = null;
  categories = Object.values(ProductCategory);
  measurementUnits: MeasurementUnit[] = [];
  selectedFile: File | null = null;

  variants: ProductVariant[] = [
    { type: 'HYBRID', name: 'Hybrid' },
    { type: 'NATIVE', name: 'Native' },
    { type: 'ORGANIC', name: 'Organic' },
    { type: 'REGULAR', name: 'Regular' }
  ];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product | null
  ) {
    this.productForm = this.fb.group({
      name: [data?.name || '', [Validators.required, Validators.minLength(3)]],
      variant: [data?.variant || '', Validators.required],
      description: [data?.description || '', [Validators.required, Validators.minLength(10)]],
      baseQuantity: [data?.baseQuantity || 1, [Validators.required, Validators.min(1)]],
      basePrice: [data?.basePrice || 1, [Validators.required, Validators.min(1)]],
      category: [data?.category || '', Validators.required],
      measurementUnit: [data?.measurementUnit || '', Validators.required],
      image: [data?.image || '']
    });

    this.productForm.get('category')?.valueChanges.subscribe(category => {
      this.updateMeasurementUnits(category);
    });
    
    if (data?.image) {
      this.imagePreview = data.image;
    }
  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
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

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
        this.productForm.patchValue({ image: reader.result });
      };
      reader.readAsDataURL(file);
      this.selectedFile = file;
    }
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

  onSubmit() {
    if (this.productForm.valid) {
      const formValue = this.productForm.value;
      const product: Partial<Product> = {
        ...formValue,
        id: this.data?.id,
        farmerId: this.data?.farmerId || 1,
        image: this.productForm.value.image || 'assets/default-product.png'
      };
      this.dialogRef.close(product);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}