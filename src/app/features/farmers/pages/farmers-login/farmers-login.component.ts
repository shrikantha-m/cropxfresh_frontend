import { Component } from '@angular/core';
import { FarmerService } from '../../services/farmer.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-farmers-login',
  templateUrl: './farmers-login.component.html',
  styleUrls: ['./farmers-login.component.css']
})
export class FarmersLoginComponent {
  phone: string = '';
  password: string = '';

  constructor(private farmerService: FarmerService, private router: Router) {}

  onSubmit(): void {
    this.farmerService.login(this.phone, this.password).subscribe(
      (response) => {
        console.log('Login successful', response);
        // Redirect to the dashboard or home page
        this.router.navigate(['/farmers/dashboard']);
      },
      (error) => {
        console.error('Login failed', error);
      }
    );
  }
}
