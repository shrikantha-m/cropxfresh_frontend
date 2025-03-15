import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FarmersLoginComponent } from './pages/farmers-login/farmers-login.component';

const routes: Routes = [
  { path: 'login', component: FarmersLoginComponent }
];

@NgModule({
  declarations: [
    FarmersLoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ]
})
export class FarmersModule { }
