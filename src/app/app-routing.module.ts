import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '../app/home/home.component';
import { LoginComponent } from '../app/login/login.component';
import { RegisterComponent } from '../app/register/register.component';
import { ProfileComponent } from '../app/profile/profile.component';
import { CarsComponent } from '../app/cars/cars.component';
import { AllcarsComponent } from '../app/allcars/allcars.component';
import { CardetailsComponent } from '../app/cardetails/cardetails.component';
import { FilteredcarsComponent } from '../app/filteredcars/filteredcars.component';
import { RentComponent } from '../app/rent/rent.component';
import { AdminComponent } from './admin/admin.component';
import { LicenseRequestsComponent } from './admin/license-requests/license-requests.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { CarsFromEstablishmentComponent } from './cars-from-establishment/cars-from-establishment.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'cars', component: CarsComponent, 
      children: [
        {path: '', redirectTo: 'allcars', pathMatch: 'full'},
        {path: 'allcars', component: AllcarsComponent},
        {path: 'filteredcars', component: FilteredcarsComponent},
        {path: 'cars-from-establishment', component: CarsFromEstablishmentComponent}
      ]
  },
  {path: 'rent', component: RentComponent, 
      children: [
        {path: '', redirectTo: 'cardetails', pathMatch: 'full'},
        {path: 'cardetails', component: CardetailsComponent}
      ]},
  {path: 'admin', component: AdminComponent,
      children: [
        {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
        {path: 'dashboard', component: DashboardComponent},
        {path: 'license-requests', component: LicenseRequestsComponent},
        {path: '**', redirectTo: 'dashboard'}
      ]},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }