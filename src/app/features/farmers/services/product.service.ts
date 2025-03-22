import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../../core/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8000/api/products/';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  createProduct(product: Product, imageFile?: File): Observable<Product> {
    const formData = new FormData();
    const productEntries = Object.entries(product) as [keyof Product, any][];
    productEntries.forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value.toString());
      }
    });
    
    if (imageFile) {
      formData.append('image', imageFile);
    }

    return this.http.post<Product>(this.apiUrl, formData, {
      headers: {
        Accept: 'application/json'
      }
    });
  }

  updateProduct(id: number, product: Product, imageFile?: File): Observable<Product> {
    const formData = new FormData();
    const productEntries = Object.entries(product) as [keyof Product, any][];
    productEntries.forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value.toString());
      }
    });
    
    if (imageFile) {
      formData.append('image', imageFile);
    }

    return this.http.put<Product>(`${this.apiUrl}/${id}`, formData, {
      headers: {
        Accept: 'application/json'
      }
    });
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}