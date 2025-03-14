import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feature-list',
  templateUrl: './feature-list.component.html',
  styleUrls: ['./feature-list.component.css']
})
export class FeatureListComponent {
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
