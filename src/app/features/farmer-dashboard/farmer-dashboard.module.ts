import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FarmerDashboardRoutingModule } from './farmer-dashboard-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductFormComponent } from './pages/product-form/product-form.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ProductListComponent,
    ProductFormComponent
  ],
  imports: [
    CommonModule,
    FarmerDashboardRoutingModule
  ]
})
export class FarmerDashboardModule { }
