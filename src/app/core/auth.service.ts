import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string, role: string): Observable<any> {
    // Replace this with your actual API call
    const mockResponse = { success: true, role };
    return of(mockResponse).pipe(
      tap((response) => {
        if (response.success) {
          localStorage.setItem('role', role); // Store the user's role
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }

  getRole(): string {
    return localStorage.getItem('role') || '';
  }
}
