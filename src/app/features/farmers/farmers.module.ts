import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FarmersLoginComponent } from './pages/farmers-login/farmers-login.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FarmersDashboardComponent } from './pages/farmers-dashboard/farmers-dashboard.component';
import { FarmerRegistrationComponent } from './pages/farmer-registration/farmer-registration.component';
import { ProductDialogComponent } from './pages/farmers-dashboard/product-dialog/product-dialog.component';

const routes: Routes = [
  { path: 'login', component: FarmersLoginComponent },
  { path: 'dashboard', component: FarmersDashboardComponent },
  { path: 'register', component: FarmerRegistrationComponent } // Added registration route
];

@NgModule({
  declarations: [
    FarmersLoginComponent,
    FarmersDashboardComponent,
    FarmerRegistrationComponent,
    ProductDialogComponent
  ],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSnackBarModule,
    MatButtonModule,
    MatSelectModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class FarmersModule { }
