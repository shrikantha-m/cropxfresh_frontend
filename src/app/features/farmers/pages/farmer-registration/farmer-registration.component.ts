import { Component } from '@angular/core';

@Component({
  selector: 'app-farmer-registration',
  templateUrl: './farmer-registration.component.html',
  styleUrls: ['./farmer-registration.component.css']
})
export class FarmerRegistrationComponent {
  // Track the current step (1 or 2)
  currentStep: number = 1;

  // Control visibility of the OTP field
  showOtpField: boolean = false;

  // Track OTP verification status
  isOtpVerified: boolean = false;

  // Simulate sending OTP
  sendOtp(): void {
    console.log('OTP sent to phone number');
    this.showOtpField = true; // Show OTP field
  }

  // Simulate verifying OTP
  verifyOtp(): void {
    console.log('OTP verified');
    this.isOtpVerified = true; // Mark OTP as verified
  }

  // Move to the next step
  nextStep(): void {
    if (this.isOtpVerified) {
      this.currentStep = 2; // Move to Step 2
    }
  }

  // Go back to the previous step
  goBack(): void {
    this.currentStep = 1; // Move back to Step 1
    this.showOtpField = false; // Hide OTP field
    this.isOtpVerified = false; // Reset OTP verification status
  }

  // Simulate registration
  register(): void {
    console.log('Registration successful');
  }

  navigateToLogin(): void {
    // Navigate to the login page
    console.log('Navigating to login page');
  }
}
