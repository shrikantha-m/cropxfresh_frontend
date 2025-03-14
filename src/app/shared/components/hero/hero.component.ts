import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent {
  constructor(private router: Router) {}

  // Generic method for navigation
  navigateTo(path: string) {
    try {
      this.router.navigate([path]);
    } catch (error) {
      console.error(`Navigation Error: ${error}`);
    }
  }
}
