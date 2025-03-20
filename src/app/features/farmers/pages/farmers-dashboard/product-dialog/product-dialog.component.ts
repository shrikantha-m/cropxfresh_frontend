import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Product } from '../../../../../core/models/product.model';

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
            <mat-label>Quantity</mat-label>
            <input matInput type="number" formControlName="quantity" required>
            <mat-error *ngIf="productForm.get('quantity')?.hasError('required')">
              Quantity is required
            </mat-error>
            <mat-error *ngIf="productForm.get('quantity')?.hasError('min')">
              Quantity must be 0 or greater
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
          <mat-form-field class="w-full">
            <mat-label>Category</mat-label>
            <mat-select formControlName="category" required>
              <mat-option *ngFor="let cat of ['Vegetables', 'Fruits', 'Grains', 'Dairy', 'Poultry', 'Other']" [value]="cat">
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
            <mat-label>Price</mat-label>
            <input matInput type="number" formControlName="price" required>
            <mat-error *ngIf="productForm.get('price')?.hasError('required')">
              Price is required
            </mat-error>
            <mat-error *ngIf="productForm.get('price')?.hasError('min')">
              Price must be greater than 0
            </mat-error>
          </mat-form-field>
        </div>

        <div class="mb-4">
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

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product | null
  ) {
    this.productForm = this.fb.group({
      name: [data?.name || '', Validators.required],
      description: [data?.description || '', Validators.required],
      quantity: [data?.quantity || 1, [Validators.required, Validators.min(1)]],
      price: [data?.price || 1, [Validators.required, Validators.min(1)]],
      category: [data?.category || '', Validators.required],
      image: [data?.image || '']
    });
    
    if (data?.image) {
      this.imagePreview = data.image;
    }
  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
        this.productForm.patchValue({ image: reader.result });
      };
      reader.readAsDataURL(file);
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