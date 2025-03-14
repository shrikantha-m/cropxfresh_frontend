import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  // Method to handle the "Subscribe" button click
  onSubscribeClick() {
    alert('Thank you for subscribing!'); // Replace with actual functionality
  }
}
