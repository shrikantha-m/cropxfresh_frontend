import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductDialogComponent } from './product-dialog/product-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Product } from '../../../../core/models/product.model';
import { ProductService } from '../../../farmer-dashboard/services/product.service';

interface Order {
  id: number;
  productName: string;
  customerName: string;
  status: 'pending' | 'processing' | 'completed';
  amount: number;
  date: Date;
}

@Component({
  selector: 'app-farmers-dashboard',
  templateUrl: './farmers-dashboard.component.html',
  styleUrls: ['./farmers-dashboard.component.css']
})
export class FarmersDashboardComponent implements OnInit {
  // Statistics
  totalProducts = 0;
  totalOrders = 0;
  totalEarnings = 0;
  monthlyEarnings = 0;

  products: Product[] = [];
  isLoading = false;
  error: string | null = null;

  // Recent Orders
  recentOrders: Order[] = [
    {
      id: 1,
      productName: 'Organic Tomatoes',
      customerName: 'John Doe',
      status: 'completed',
      amount: 29.90,
      date: new Date('2024-01-15')
    },
    {
      id: 2,
      productName: 'Fresh Lettuce',
      customerName: 'Jane Smith',
      status: 'processing',
      amount: 19.90,
      date: new Date('2024-01-16')
    }
  ];

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private productService: ProductService
  ) {}



  ngOnInit() {
    this.loadProducts();
  }

  private loadProducts() {
    this.isLoading = true;
    this.error = null;
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.calculateStatistics();
        this.isLoading = false;
      },
      error: (error) => {
        this.error = 'Failed to load products. Please try again.';
        this.showError(this.error);
        this.isLoading = false;
      }
    });
  }

  private calculateStatistics() {
    this.totalProducts = this.products.length;
    this.totalOrders = this.recentOrders.length;
    this.totalEarnings = this.recentOrders.reduce((sum, order) => sum + order.amount, 0);
    this.monthlyEarnings = this.calculateMonthlyEarnings();
  }

  private calculateMonthlyEarnings(): number {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    return this.recentOrders
      .filter(order => {
        const orderDate = new Date(order.date);
        return orderDate.getMonth() === currentMonth && 
               orderDate.getFullYear() === currentYear;
      })
      .reduce((sum, order) => sum + order.amount, 0);
  }

  private validateProductData(product: Partial<Product>): boolean {
    if (!product) return false;
    return (
      typeof product.name === 'string' && product.name.trim().length > 0 &&
      typeof product.description === 'string' && product.description.trim().length > 0 &&
      typeof product.basePrice === 'number' && product.basePrice > 0 &&
      typeof product.baseQuantity === 'number' && product.baseQuantity >= 0 &&
      typeof product.category === 'string' && product.category.trim().length > 0
    );
  }

  addProduct() {
    if (this.isLoading) return;
    try {
      const dialogRef = this.dialog.open(ProductDialogComponent, {
        width: '500px'
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          if (!this.validateProductData(result)) {
            this.showError('Invalid product data');
            return;
          }
          const newProduct: Product = {
            id: 0, // ID will be properly assigned by backend
            ...result
          };
          this.productService.createProduct(newProduct).subscribe({
            next: (product) => {
              this.products = [...this.products, product];
              this.calculateStatistics();
              this.showSuccess('Product added successfully');
            },
            error: (error) => {
              this.showError('Failed to add product. Please try again.');
              console.error('Error in addProduct:', error);
            }
          });
        }
      });
    } catch (error) {
      this.showError('Error adding product');
      console.error('Error in addProduct:', error);
    }
  }

  editProduct(product: Product) {
    if (this.isLoading) return;
    try {
      if (!product || !product.id) {
        this.showError('Invalid product selected');
        return;
      }

      const dialogRef = this.dialog.open(ProductDialogComponent, {
        width: '500px',
        data: product
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          if (!this.validateProductData(result)) {
            this.showError('Invalid product data');
            return;
          }
          this.productService.updateProduct(product.id, result).subscribe({
            next: (updatedProduct) => {
              this.products = this.products.map(p =>
                p.id === product.id ? updatedProduct : p
              );
              this.calculateStatistics();
              this.showSuccess('Product updated successfully');
            },
            error: (error) => {
              this.showError('Failed to update product. Please try again.');
              console.error('Error in editProduct:', error);
            }
          });
        }
      });
    } catch (error) {
      this.showError('Error updating product');
      console.error('Error in editProduct:', error);
    }
  }

  deleteProduct(productId: number): void {
    if (this.isLoading) return;
    try {
      if (!productId) {
        this.showError('Invalid product ID');
        return;
      }

      if (confirm('Are you sure you want to delete this product?')) {
        this.isLoading = true;
        this.productService.deleteProduct(productId).subscribe({
          next: () => {
            this.products = this.products.filter(p => p.id !== productId);
            this.calculateStatistics();
            this.showSuccess('Product deleted successfully');
            this.isLoading = false;
          },
          error: (error) => {
            this.showError('Failed to delete product. Please try again.');
            console.error('Error in deleteProduct:', error);
            this.isLoading = false;
          }
        });
      }
    } catch (error) {
      this.showError('Error deleting product');
      console.error('Error in deleteProduct:', error);
      this.isLoading = false;
    }
  }



  private showSuccess(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['success-snackbar']
    });
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['error-snackbar']
    });
  }
}