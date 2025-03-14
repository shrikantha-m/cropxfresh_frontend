import { Component } from '@angular/core';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css']
})
export class TestimonialsComponent {
  testimonials = [
    {
      logo: 'https://d22po4pjz3o32e.cloudfront.net/webflow-logo.svg',
      quote:
        'CropXFresh has transformed the way we source fresh produce. The quality and speed of delivery are unmatched!',
      avatar: 'https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg',
      name: 'Rajesh Kumar',
      role: 'Owner, Local Diner',
    },
    {
      logo: 'https://d22po4pjz3o32e.cloudfront.net/webflow-logo.svg',
      quote:
        'CropXFresh has transformed the way we source fresh produce. The quality and speed of delivery are unmatched!',
      avatar: 'https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg',
      name: 'Rajesh Kumar',
      role: 'Owner, Local Diner',
    },
  ];

  currentIndex = 0;

  // Method to go to the next testimonial
  nextTestimonial() {
    this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
  }

  // Method to go to the previous testimonial
  previousTestimonial() {
    this.currentIndex =
      (this.currentIndex - 1 + this.testimonials.length) % this.testimonials.length;
  }
}
