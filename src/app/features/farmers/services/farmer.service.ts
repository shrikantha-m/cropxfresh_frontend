import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface OtpVerificationResponse {
  status: string;
  message: string;
  data: {
    id: number;
  };
}

export interface FarmerRegistrationResponse {
  status: string;
  message: string;
  data: {
    id: number;
    phone: string;
    full_name: string;
    address: string;
  };
}

export interface FarmerRegistrationData {
  phoneNumber: string;
  fullName: string;
  email: string;
  password: string;
  farmName: string;
  farmLocation: string;
  farmSize: number;
  primaryCrops: string;
}

@Injectable({
  providedIn: 'root',
})
export class FarmerService {
  private apiUrl = 'http://localhost:8000/api'; // Django backend URL

  constructor(private http: HttpClient) {}

  // Send OTP for phone verification
  sendOtp(phone: string): Observable<{message: string}> {
    return this.http.post<{message: string}>(`${this.apiUrl}/farmers/send-verification-otp/`, { phone });
  }

  // Verify OTP
  verifyOtp(otp: string, farmerId: number): Observable<OtpVerificationResponse> {
    return this.http.post<OtpVerificationResponse>(`${this.apiUrl}/farmers/verify-otp/`, {
      otp,
      farmer_id: farmerId
    });
  }

  // Login method
  login(phone: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/farmers/login/`, { phone, password });
  }

  // Register method
  register(data: FarmerRegistrationData): Observable<FarmerRegistrationResponse> {
    return this.http.post<FarmerRegistrationResponse>(`${this.apiUrl}/farmers/register/`, {
      phone: data.phoneNumber,
      full_name: data.fullName,
      email: data.email,
      password: data.password,
      farm_name: data.farmName,
      farm_location: data.farmLocation,
      farm_size: data.farmSize,
      primary_crops: data.primaryCrops
    });
  }
}
