import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { FarmerRegistrationComponent } from './features/farmers/pages/farmer-registration/farmer-registration.component';
import { FarmersLoginComponent } from './features/farmers/pages/farmers-login/farmers-login.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'register/farmer', component:  FarmerRegistrationComponent },
  { path: 'farmers/login', component: FarmersLoginComponent },
  { path: 'farmers', loadChildren: () => import('./features/farmers/farmers.module').then(m => m.FarmersModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
