import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FarmersComponent } from './farmers.component';
import { FarmersDashboardComponent } from './pages/farmers-dashboard/farmers-dashboard.component';
import { FarmerRegistrationComponent } from './pages/farmer-registration/farmer-registration.component';

const routes: Routes = [
  { path: '', component: FarmersComponent },
  { path: 'dashboard', component: FarmersDashboardComponent },
  { path: 'register', component: FarmerRegistrationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FarmersRoutingModule { }
