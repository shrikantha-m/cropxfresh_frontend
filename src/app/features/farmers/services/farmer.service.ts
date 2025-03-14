import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FarmerService {
  private apiUrl = 'http://localhost:8000/api'; // Django backend URL

  constructor(private http: HttpClient) {}

  // Login method
  login(phone: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login/`, { phone, password });
  }
}
