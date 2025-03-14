import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent {
  constructor(private router: Router) {}

  // Method to handle the "View all" button click
  onViewAllClick() {
    this.router.navigate(['/blog']); // Navigate to the blog page
  }
}
