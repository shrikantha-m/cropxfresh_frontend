import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from './shared/shared.module';
import { HeroComponent } from './shared/components/hero/hero.component';
import { HowItWorksComponent } from './shared/components/how-it-works/how-it-works.component';
import { FeatureListComponent } from './shared/components/feature-list/feature-list.component';
import { CtaComponent } from './shared/components/cta/cta.component';
import { BlogComponent } from './shared/components/blog/blog.component';
import { TestimonialsComponent } from './shared/components/testimonials/testimonials.component';
import { AboutComponent } from './shared/components/about/about.component';
import { BenefitsComponent } from './shared/components/benefits/benefits.component';
import { LoginComponent } from './pages/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './core/auth.service';
import { RegisterComponent } from './pages/register/register.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeroComponent,
    HowItWorksComponent,
    FeatureListComponent,
    CtaComponent,
    BlogComponent,
    TestimonialsComponent,
    AboutComponent,
    BenefitsComponent,
    LoginComponent,
    RegisterComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule // Added MaterialModule to imports array since it was imported but not used
  ],
  providers: [
    AuthService, // Added AuthService to providers since it was imported but not used
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
