import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { FarmersRoutingModule } from './farmers-routing.module';
import { FarmersComponent } from './farmers.component';
import { FarmersLoginComponent } from './pages/farmers-login/farmers-login.component';


@NgModule({
  declarations: [
    FarmersComponent,
    FarmersLoginComponent,
  ],
  imports: [
    CommonModule,
    FarmersRoutingModule,
    FormsModule,
    HttpClientModule,
  ]
})
export class FarmersModule { }
