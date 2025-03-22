import { Component, Inject, OnInit } from '@angular/core';
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
    <div class="dialog-container mat-typography">
      <h2 mat-dialog-title class="dialog-title mat-headline-6">{{ data ? 'Edit' : 'Add' }} Product</h2>
      <form [formGroup]="productForm" (ngSubmit)="onSubmit()" class="product-form">
        <div mat-dialog-content class="dialog-content">
          <div class="form-field">
            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Product Name</mat-label>
              <input matInput formControlName="name" required class="mat-body-1">
              <mat-error *ngIf="productForm.get('name')?.hasError('required')" class="mat-caption">
                Product name is required
              </mat-error>
            </mat-form-field>
          </div>

          <div class="form-field">
            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Variant</mat-label>
              <mat-select formControlName="variant" required class="mat-body-1">
                <mat-option *ngFor="let variant of variants" [value]="variant.type">
                  {{ variant.name }}
                </mat-option>
              </mat-select>
              <mat-error *ngIf="productForm.get('variant')?.hasError('required')" class="mat-caption">
                Variant is required
              </mat-error>
            </mat-form-field>
          </div>

          <div class="form-field">
            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Base Quantity</mat-label>
              <input matInput type="number" formControlName="baseQuantity" required class="mat-body-1">
              <mat-error *ngIf="productForm.get('baseQuantity')?.hasError('required')" class="mat-caption">
                Base quantity is required
              </mat-error>
              <mat-error *ngIf="productForm.get('baseQuantity')?.hasError('min')" class="mat-caption">
                Base quantity must be 0 or greater
              </mat-error>
            </mat-form-field>
          </div>

          <div class="form-field">
            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Category</mat-label>
              <mat-select formControlName="category" required class="mat-body-1">
                <mat-option *ngFor="let cat of categories" [value]="cat">
                  {{ cat }}
                </mat-option>
              </mat-select>
              <mat-error *ngIf="productForm.get('category')?.hasError('required')" class="mat-caption">
                Category is required
              </mat-error>
            </mat-form-field>
          </div>

          <div class="form-field">
            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Measurement Unit</mat-label>
              <mat-select formControlName="measurementUnit" required class="mat-body-1">
                <mat-option *ngFor="let unit of measurementUnits" [value]="unit">
                  {{ unit }}
                </mat-option>
              </mat-select>
              <mat-error *ngIf="productForm.get('measurementUnit')?.hasError('required')" class="mat-caption">
                Measurement unit is required
              </mat-error>
            </mat-form-field>
          </div>

          <div class="form-field">
            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Base Price</mat-label>
              <input matInput type="number" formControlName="basePrice" required class="mat-body-1">
              <mat-error *ngIf="productForm.get('basePrice')?.hasError('required')" class="mat-caption">
                Base price is required
              </mat-error>
              <mat-error *ngIf="productForm.get('basePrice')?.hasError('min')" class="mat-caption">
                Base price must be greater than 0
              </mat-error>
            </mat-form-field>
          </div>

          <div class="form-field">
            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Description</mat-label>
              <textarea matInput formControlName="description" required rows="4" class="mat-body-1"></textarea>
              <mat-error *ngIf="productForm.get('description')?.hasError('required')" class="mat-caption">
                Description is required
              </mat-error>
            </mat-form-field>
          </div>

          <div class="form-field image-section mat-elevation-z1">
            <p class="image-title mat-subtitle-1">Product Images (Required - Upload up to 4 images)</p>
            <input type="file" (change)="onImageSelected($event)" accept="image/*" hidden #fileInput>
            <div class="image-upload-container">
              <div *ngFor="let preview of imagePreview; let i = index" class="preview-item mat-elevation-z2">
                <img [src]="preview" class="preview-image">
                <button type="button" class="remove-button mat-elevation-z1" (click)="removeImage(i)">
                  <span class="material-icons">close</span>
                </button>
              </div>
              <div *ngIf="imagePreview.length < maxImages" class="upload-placeholder" (click)="fileInput.click()">
                <span class="material-icons upload-icon">add_photo_alternate</span>
                <p class="upload-text mat-caption">Add Image</p>
              </div>
            </div>
            <mat-error *ngIf="productForm.get('images')?.touched && productForm.get('images')?.hasError('required')" class="image-error mat-caption">
              At least one product image is required
            </mat-error>
          </div>
        </div>

        <div mat-dialog-actions class="dialog-actions">
          <button mat-button type="button" class="cancel-button mat-body-1" (click)="onCancel()">Cancel</button>
          <button mat-raised-button color="primary" type="submit" [disabled]="!productForm.valid" class="submit-button mat-body-1">
            {{ data ? 'Update' : 'Add' }}
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .dialog-container {
      padding: 24px;
      background: linear-gradient(to right bottom, #ffffff, #f8f9fa);
      border-radius: 16px;
    }

    .dialog-title {
      color: #2c3e50;
      margin-bottom: 24px;
    }

    .dialog-content {
      max-height: 70vh;
      overflow-y: auto;
      padding-right: 8px;
    }

    .form-field {
      margin-bottom: 20px;
    }

    .image-section {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 12px;
    }

    .image-title {
      color: #2c3e50;
      margin-bottom: 16px;
    }

    .image-upload-container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
      gap: 16px;
      margin-bottom: 16px;
    }

    .preview-item {
      position: relative;
      aspect-ratio: 1;
      border-radius: 12px;
      overflow: hidden;
      transition: transform 0.2s ease;
    }

    .preview-item:hover {
      transform: translateY(-4px);
    }

    .preview-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .remove-button {
      position: absolute;
      top: 8px;
      right: 8px;
      background: rgba(255, 255, 255, 0.9);
      border: none;
      border-radius: 50%;
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background-color 0.2s ease;
    }

    .remove-button:hover {
      background: #ff4444;
      color: white;
    }

    .upload-placeholder {
      aspect-ratio: 1;
      border: 2px dashed #cbd5e0;
      border-radius: 12px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s ease;
      background: white;
    }

    .upload-placeholder:hover {
      border-color: #4299e1;
      background: #ebf8ff;
    }

    .upload-icon {
      font-size: 32px;
      color: #4299e1;
      margin-bottom: 8px;
    }

    .upload-text {
      color: #4a5568;
    }

    .image-error {
      margin-top: 8px;
    }

    .dialog-actions {
      padding: 16px 0 0;
      display: flex;
      justify-content: flex-end;
      gap: 16px;
    }

    .cancel-button {
      color: #4a5568;
    }

    .submit-button {
      background: linear-gradient(to right, #4299e1, #3182ce);
      color: white;
      padding: 0 24px;
    }

    .submit-button:disabled {
      background: #e2e8f0;
    }

    ::-webkit-scrollbar {
      width: 8px;
    }

    ::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 4px;
    }

    ::-webkit-scrollbar-thumb {
      background: #cbd5e0;
      border-radius: 4px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: #a0aec0;
    }

    ::ng-deep .mat-form-field-wrapper {
      margin-bottom: 0;
    }

    ::ng-deep .mat-form-field-flex {
      background-color: white !important;
    }

    ::ng-deep .mat-form-field-label {
      color: rgba(0, 0, 0, 0.6) !important;
    }

    ::ng-deep .mat-form-field-outline {
      color: rgba(0, 0, 0, 0.12) !important;
    }

    ::ng-deep .mat-form-field-outline-thick {
      color: rgba(66, 153, 225, 0.6) !important;
    }

    ::ng-deep .mat-form-field.mat-focused .mat-form-field-label {
      color: #4299e1 !important;
    }

    ::ng-deep .mat-form-field.mat-form-field-invalid .mat-form-field-label {
      color: #ff4444 !important;
    }
  `]
})
export class ProductDialogComponent implements OnInit {
  productForm!: FormGroup;
  imagePreview: string[] = [];
  categories = Object.values(ProductCategory);
  measurementUnits: MeasurementUnit[] = [];
  selectedFiles: File[] = [];
  maxImages = 4;
  allowedImageTypes = ['image/jpeg', 'image/png'];
  maxImageSize = 100 * 1024 * 1024; // 100MB limit

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
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.setupFormSubscriptions();
    this.loadInitialData();
  }

  private initializeForm(): void {
    this.productForm = this.fb.group({
      name: [this.data?.name || '', [Validators.required, Validators.minLength(3)]],
      variant: [this.data?.variant || '', Validators.required],
      description: [this.data?.description || '', [Validators.required, Validators.minLength(10)]],
      baseQuantity: [this.data?.baseQuantity || 1, [Validators.required, Validators.min(1)]],
      basePrice: [this.data?.basePrice || 1, [Validators.required, Validators.min(1)]],
      category: [this.data?.category || '', Validators.required],
      measurementUnit: [this.data?.measurementUnit || '', Validators.required],
      images: [[], [Validators.required, Validators.minLength(1)]]
    });
  }

  private setupFormSubscriptions(): void {
    this.productForm.get('category')?.valueChanges.subscribe(category => {
      this.updateMeasurementUnits(category);
    });
  }

  private loadInitialData(): void {
    if (this.data?.image) {
      this.imagePreview = Array.isArray(this.data.image) ? this.data.image : [this.data.image];
    }
    
    // Initialize measurement units based on initial category
    const initialCategory = this.productForm.get('category')?.value;
    if (initialCategory) {
      this.updateMeasurementUnits(initialCategory);
    }
  }

  onImageSelected(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if (!files) return;

    const remainingSlots = this.maxImages - this.selectedFiles.length;
    const filesToProcess = Array.from(files).slice(0, remainingSlots);

    filesToProcess.forEach(file => {
      if (!this.allowedImageTypes.includes(file.type)) {
        console.error(`Invalid file type for ${file.name}. Please upload JPG or PNG images only.`);
        return;
      }

      if (file.size > this.maxImageSize) {
        console.error(`File ${file.name} is too large. Maximum size is 100MB.`);
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview.push(reader.result as string);
        this.selectedFiles.push(file);
        this.productForm.patchValue({ images: this.selectedFiles });
        this.productForm.get('images')?.updateValueAndValidity();
      };
      reader.readAsDataURL(file);
    });
  }

  removeImage(index: number) {
    this.imagePreview.splice(index, 1);
    this.selectedFiles.splice(index, 1);
    this.productForm.patchValue({ images: this.selectedFiles });
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
      const formData = new FormData();
      const formValue = this.productForm.value;
      
      // Add basic product information
      Object.keys(formValue).forEach(key => {
        if (key !== 'images') {
          formData.append(key, formValue[key]);
        }
      });
      
      // Add images
      this.selectedFiles.forEach(file => {
        formData.append('images', file);
      });

      // Add additional fields
      if (this.data?.id) {
        formData.append('id', this.data.id.toString());
      }
      formData.append('farmerId', (this.data?.farmerId || 1).toString());
      
      this.dialogRef.close(formData);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}