import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  constructor(private router: Router) {}

  // Method to handle the "Learn More" button click
  onLearnMoreClick() {
    this.router.navigate(['/about']); // Navigate to the about page
  }

  // Method to handle the "Sign Up" button click
  onSignUpClick() {
    this.router.navigate(['/signup']); // Navigate to the signup page
  }
}
