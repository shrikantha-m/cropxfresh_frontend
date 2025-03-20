import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
  animations: [
    trigger('fadeInUp', [
      state('void', style({
        opacity: 0,
        transform: 'translateY(20px)'
      })),
      transition('void => *', [
        animate('0.6s ease-out')
      ])
    ]),
    trigger('fadeIn', [
      state('void', style({
        opacity: 0
      })),
      transition('void => *', [
        animate('0.8s ease-out')
      ])
    ])
  ]
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
