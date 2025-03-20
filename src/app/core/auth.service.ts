import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient, private router: Router) {
    this.initializeAuthState();
  }

  private initializeAuthState() {
    const token = localStorage.getItem('token');
    this.tokenSubject.next(token);
  }

  login(email: string, password: string, role: string): Observable<any> {
    // Replace this with your actual API call
    const mockResponse = { success: true, role, token: 'mock-token' };
    return of(mockResponse).pipe(
      tap((response) => {
        if (response.success) {
          localStorage.setItem('role', role);
          localStorage.setItem('token', response.token);
          this.tokenSubject.next(response.token);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    this.tokenSubject.next(null);
    this.router.navigate(['/login']);
  }

  getRole(): string {
    return localStorage.getItem('role') || '';
  }

  getToken(): string | null {
    return this.tokenSubject.value;
  }

  isAuthenticated(): boolean {
    return !!this.tokenSubject.value;
  }

  get authState(): Observable<string | null> {
    return this.tokenSubject.asObservable();
  }
}
