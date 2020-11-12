import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpService } from '../http.service';

import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { CustomerService } from '../_services/customer.service';
import { AuthenticationService } from '../_services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from 'src/app/_models/user';

import jwt_decode from 'jwt-decode';

declare const M: any;

@Component({
  selector: 'app-allcars',
  templateUrl: './allcars.component.html',
  styleUrls: ['./allcars.component.scss']
})
export class AllcarsComponent implements OnInit, AfterViewInit {

  private currentUserSubject: BehaviorSubject<User>;
	public currentUser: Observable<User>;

  decodedToken: any;

  cars: any;

  constructor(private _http: HttpService,
              private customerService: CustomerService,
              private authenticationService: AuthenticationService,
              private router: Router) {}

  ngOnInit() {
    if (this.authenticationService.currentUserValue) { 
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));	
      this.currentUser = this.currentUserSubject.asObservable();

      this.decodedToken = jwt_decode(this.currentUser.source['value'].jwt);
    }

    this.getCars();
  }

  ngAfterViewInit() {
    M.AutoInit()
  }

  getCars() {
    this._http.getRequest(`${environment.apiUrl}/api/car/`).subscribe(data => {
      this.cars = data;
    })
  }

  reserveerAuto(id) {
    this.router.navigate(['/rent/cardetails'], { queryParams: { car_id: id }});
  }

}
