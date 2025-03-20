import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FarmerService, FarmerRegistrationData } from '../../services/farmer.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

interface RegistrationStep {
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-farmer-registration',
  templateUrl: './farmer-registration.component.html',
  styleUrls: ['./farmer-registration.component.css']
})
export class FarmerRegistrationComponent implements OnInit {
  currentStep = 1;
  totalSteps = 3;
  phoneForm!: FormGroup;
  otpForm!: FormGroup;
  personalInfoForm!: FormGroup;
  farmDetailsForm!: FormGroup;
  steps = [
    { title: 'Phone Verification', completed: false },
    { title: 'Personal Information', completed: false },
    { title: 'Farm Details', completed: false }
  ];

  isLoading = false;
  errorMessage = '';
  farmerId: number | null = null;
  isOtpSent = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private farmerService: FarmerService
  ) {
    this.phoneForm = this.fb.group({
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    });

    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]]
    });

    this.personalInfoForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });

    this.farmDetailsForm = this.fb.group({
      farmName: ['', Validators.required],
      farmLocation: ['', Validators.required],
      farmSize: ['', [Validators.required, Validators.min(0)]],
      primaryCrops: ['', Validators.required]
    });


  }

  ngOnInit(): void {}

  sendOtp(): void {
    if (this.phoneForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      const phoneNumber = this.phoneForm.get('phoneNumber')?.value;
      
      this.farmerService.sendOtp(phoneNumber).subscribe({
        next: (response) => {
          this.isOtpSent = true;
          // Store OTP in local storage for testing
          localStorage.setItem('testOTP', response.message);
          console.log('Test OTP stored in localStorage. Check developer tools.');
          // Type assertion to include farmerId in response type
          this.farmerId = (response as { message: string; farmerId: number }).farmerId;
          this.isLoading = false;
        },
        error: (error) => {
          this.errorMessage = error.error?.message || 'Failed to send OTP. Please try again.';
          this.isLoading = false;
        }
      });
    } else {
      this.errorMessage = 'Please enter a valid 10-digit phone number';
    }
  }

  verifyOtp(): void {
    if (this.otpForm.valid && this.farmerId) {
      this.isLoading = true;
      this.errorMessage = '';
      const enteredOtp = this.otpForm.get('otp')?.value;
      
      this.farmerService.verifyOtp(enteredOtp, this.farmerId).subscribe({
        next: (response) => {
          if (response.status === 'success') {
            this.steps[0].completed = true;
            this.currentStep++;
            localStorage.removeItem('testOTP'); // Clean up test OTP
          } else {
            this.errorMessage = 'Invalid OTP. Please try again.';
          }
          this.isLoading = false;
        },
        error: (error) => {
          this.errorMessage = error.error?.message || 'OTP verification failed. Please try again.';
          this.isLoading = false;
        }
      });
    } else {
      this.errorMessage = 'Please enter a valid 6-digit OTP';
    }
  }

  checkPasswordMatch(): boolean {
    const password = this.personalInfoForm.get('password')?.value;
    const confirmPassword = this.personalInfoForm.get('confirmPassword')?.value;
    return password === confirmPassword;
  }

  nextStep(): void {
    if (this.currentStep === 2 && this.personalInfoForm.valid) {
      if (!this.checkPasswordMatch()) {
        this.errorMessage = 'Passwords do not match';
        return;
      }
    }
    
    if (this.currentStep < this.totalSteps) {
      this.errorMessage = '';
      this.steps[this.currentStep - 1].completed = true;
      this.currentStep++;
    }
  }

  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  getProgressPercentage(): number {
    return (this.steps.filter(step => step.completed).length / this.totalSteps) * 100;
  }

  register(): void {
    if (!this.phoneForm.valid || !this.personalInfoForm.valid || 
        !this.farmDetailsForm.valid) {
      this.errorMessage = 'Please fill all required fields correctly';
      return;
    }

    const registrationData: FarmerRegistrationData = {
      phoneNumber: this.phoneForm.get('phoneNumber')?.value,
      fullName: this.personalInfoForm.get('fullName')?.value,
      email: this.personalInfoForm.get('email')?.value,
      password: this.personalInfoForm.get('password')?.value,
      farmName: this.farmDetailsForm.get('farmName')?.value,
      farmLocation: this.farmDetailsForm.get('farmLocation')?.value,
      farmSize: this.farmDetailsForm.get('farmSize')?.value,
      primaryCrops: this.farmDetailsForm.get('primaryCrops')?.value
    };

    this.isLoading = true;
    this.errorMessage = '';

    this.farmerService.register(registrationData)
      .pipe(
        catchError(error => {
          console.error('Registration error:', error);
          return of({ status: 'error', message: error.error?.message || 'Registration failed. Please try again.' });
        })
      )
      .subscribe(response => {
        this.isLoading = false;
        if (response.status === 'success') {
          // Registration successful
          this.router.navigate(['/farmers/login']);
        } else {
          // Registration failed
          this.errorMessage = response.message;
        }
      });
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  submitRegistration(): void {
    if (!this.phoneForm.valid) {
      this.errorMessage = 'Please complete phone verification';
      this.currentStep = 1;
      return;
    }

    if (!this.personalInfoForm.valid || !this.checkPasswordMatch()) {
      this.errorMessage = 'Please complete personal information correctly';
      this.currentStep = 2;
      return;
    }

    if (!this.farmDetailsForm.valid) {
      this.errorMessage = 'Please fill all farm details correctly';
      return;
    }

    this.register();
  }
}
