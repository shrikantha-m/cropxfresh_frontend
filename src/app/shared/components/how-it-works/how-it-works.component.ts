import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-how-it-works',
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.css']
})
export class HowItWorksComponent {
  constructor(private router: Router) {}

  // Method to handle the "Learn More" button click
  onLearnMoreClick() {
    this.router.navigate(['/process']); // Navigate to the process page
  }

  // Method to handle the "Explore" button click
  onExploreClick() {
    this.router.navigate(['/quality']); // Navigate to the quality page
  }

  // Method to handle the "Get Started" button click
  onGetStartedClick() {
    this.router.navigate(['/logistics']); // Navigate to the logistics page
  }
}
