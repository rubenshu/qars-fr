import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopbarComponent } from './topbar/topbar.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { CarsComponent } from './cars/cars.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DatePipe } from '@angular/common';
import { CardetailsComponent } from './cardetails/cardetails.component';
import { AllcarsComponent } from './allcars/allcars.component';
import { FilteredcarsComponent } from './filteredcars/filteredcars.component';
import { RentComponent } from './rent/rent.component';
import { AdminComponent } from './admin/admin.component';
import { SearchCardComponent } from './search-card/search-card.component';
import { LicenseRequestsComponent } from './admin/license-requests/license-requests.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';

import { ChartsModule, ThemeService } from 'ng2-charts';
import { Ng2OdometerModule } from 'ng2-odometer';
import { CarsFromEstablishmentComponent } from './cars-from-establishment/cars-from-establishment.component';

@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    ProfileComponent,
    RegisterComponent,
    CarsComponent,
    CardetailsComponent,
    AllcarsComponent,
    FilteredcarsComponent,
    RentComponent,
    AdminComponent,
    SearchCardComponent,
    LicenseRequestsComponent,
    DashboardComponent,
    CarsFromEstablishmentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    Ng2OdometerModule
  ],
  providers: [DatePipe, ThemeService],
  bootstrap: [AppComponent]
})
export class AppModule { }