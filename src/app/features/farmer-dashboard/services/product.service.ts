import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product } from '../../../core/models/product.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}/products`

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    const headers = new HttpHeaders({
      'X-CSRFToken': this.getCsrfToken()
    });
    return this.http.get<Product[]>(this.apiUrl, { headers, withCredentials: true });
  }

  getProduct(id: number): Observable<Product> {
    const headers = new HttpHeaders({
      'X-CSRFToken': this.getCsrfToken()
    });
    return this.http.get<Product>(`${this.apiUrl}/${id}`, { headers, withCredentials: true });
  }

  createProduct(product: Partial<Product>): Observable<Product> {
    const headers = new HttpHeaders({
      'X-CSRFToken': this.getCsrfToken()
    });
    return this.http.post<Product>(this.apiUrl, product, { headers, withCredentials: true })
      .pipe(
        catchError(error => {
          if (error.status === 403) {
            return throwError(() => new Error('Permission denied. Please ensure you are logged in as a farmer.'));
          }
          return throwError(() => error);
        })
      );
  }

  private getCsrfToken(): string {
    const name = 'csrftoken';
    let cookieValue = '';
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  updateProduct(id: number, product: Partial<Product>): Observable<Product> {
    const headers = new HttpHeaders({
      'X-CSRFToken': this.getCsrfToken()
    });
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product, { headers, withCredentials: true })
      .pipe(
        catchError(error => {
          if (error.status === 403) {
            return throwError(() => new Error('Permission denied. Please ensure you are logged in as a farmer.'));
          }
          return throwError(() => error);
        })
      );
  }

  deleteProduct(id: number): Observable<void> {
    const headers = new HttpHeaders({
      'X-CSRFToken': this.getCsrfToken()
    });
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers, withCredentials: true })
      .pipe(
        catchError(error => {
          if (error.status === 403) {
            return throwError(() => new Error('Permission denied. Please ensure you are logged in as a farmer.'));
          }
          return throwError(() => error);
        })
      );
  }
}
