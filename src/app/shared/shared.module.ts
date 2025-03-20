import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';

// Components
import { NavbarComponent } from './components/navbar/navbar.component';
import { LogoComponent } from './components/logo/logo.component';
import { CustomButtonComponent } from './components/custom-button/custom-button.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { CustomCardComponent } from './components/custom-card/custom-card.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    NavbarComponent,
    LogoComponent,
    CustomButtonComponent,
    SearchBarComponent,
    CustomCardComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [
    MaterialModule,
    NavbarComponent,
    LogoComponent,
    CustomButtonComponent,
    SearchBarComponent,
    CustomCardComponent,
    FooterComponent,
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }