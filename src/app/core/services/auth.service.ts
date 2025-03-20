import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

interface LoginResponse {
  access: string;
  refresh: string;
  user: {
    id: number;
    phone: string;
    [key: string]: any;  // for other user properties
  };
}

interface RefreshResponse {
  access: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api/farmers';
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.checkInitialAuthState());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  private checkInitialAuthState(): boolean {
    const token = localStorage.getItem('access_token');
    return !!token;
  }

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  login(credentials: {phone: string, password: string}): Observable<LoginResponse> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    
    // Debug log
    console.log('Sending login request:', {
      url: `${this.apiUrl}/login/`,
      credentials: { phone: credentials.phone, password: '***' }
    });
    
    return this.http.post<LoginResponse>(`${this.apiUrl}/login/`, credentials, { headers })
      .pipe(
        tap(response => {
          console.log('Login response:', response);
          if (response.access && response.refresh) {
            localStorage.setItem('access_token', response.access);
            localStorage.setItem('refresh_token', response.refresh);
            localStorage.setItem('user', JSON.stringify(response.user));
            this.isLoggedInSubject.next(true);
          }
        }),
        catchError(error => {
          console.error('Login error:', error);
          return throwError(() => error?.error?.detail || 'Login failed');
        })
      );
}

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      errorMessage = 'Network error: Please check your internet connection';
    } else {
      if (error.status === 400) {
        // Handle Django validation errors
        const errors = error.error;
        const errorMessages = [];
        
        for (const field in errors) {
          if (errors.hasOwnProperty(field)) {
            errorMessages.push(`${field}: ${errors[field].join(', ')}`);
          }
        }
        errorMessage = errorMessages.join('\n');
      } else {
        errorMessage = error.error?.detail || 'An unknown error occurred';
      }
    }

    console.error('Auth Error:', {
      status: error.status,
      message: errorMessage,
      error: error.error
    });

    return throwError(() => errorMessage);
  }

  refreshToken(token: string): Observable<RefreshResponse> {
    return this.http.post<RefreshResponse>(`${this.apiUrl}/refresh/`, { refresh: token });
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    this.isLoggedInSubject.next(false);
    this.router.navigate(['/login']);
    this.router.navigate(['/farmers/login']);
  }
}