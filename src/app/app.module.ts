import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { HeroComponent } from './shared/components/hero/hero.component';
import { HowItWorksComponent } from './shared/components/how-it-works/how-it-works.component';
import { FeatureListComponent } from './shared/components/feature-list/feature-list.component';
import { CtaComponent } from './shared/components/cta/cta.component';
import { BlogComponent } from './shared/components/blog/blog.component';
import { TestimonialsComponent } from './shared/components/testimonials/testimonials.component';
import { AboutComponent } from './shared/components/about/about.component';
import { BenefitsComponent } from './shared/components/benefits/benefits.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { LoginComponent } from './pages/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './core/auth.service';
import { RegisterComponent } from './pages/register/register.component';
import { FarmerRegistrationComponent } from './features/farmers/pages/farmer-registration/farmer-registration.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    HeroComponent,
    HowItWorksComponent,
    FeatureListComponent,
    CtaComponent,
    BlogComponent,
    TestimonialsComponent,
    AboutComponent,
    BenefitsComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    FarmerRegistrationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
