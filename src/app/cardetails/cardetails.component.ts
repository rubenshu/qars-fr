import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpService } from '../http.service';
import { DatePipe, Location } from '@angular/common';

import { CustomerService } from '../_services/customer.service';
import { AuthenticationService } from '../_services/authentication.service';
import { BehaviorSubject, Observable } from 'rxjs';

import jwt_decode from 'jwt-decode';
import { User } from 'src/app/_models/user';

import { environment } from 'src/environments/environment';
import { skip } from 'rxjs/operators';

declare const M: any;

@Component({
  selector: 'app-cardetails',
  templateUrl: './cardetails.component.html',
  styleUrls: ['./cardetails.component.scss']
})
export class CardetailsComponent implements OnInit, AfterViewInit {

  private currentUserSubject: BehaviorSubject<User>;
	public currentUser: Observable<User>;

  decodedToken: any;

  car_id: any;
  car: any;

  constructor(private route: ActivatedRoute,
              public datepipe: DatePipe, 
              private _http: HttpService,
              private router: Router,
              private customerService: CustomerService,
              private authenticationService: AuthenticationService,
              private location: Location) {}

  ngOnInit() {
    if (this.authenticationService.currentUserValue) { 
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));	
      this.currentUser = this.currentUserSubject.asObservable();

      this.decodedToken = jwt_decode(this.currentUser.source['value'].jwt);
    }

    this.route.queryParams.subscribe(params => {
      this.car_id = params['car_id'];
    });

    this.getCar(this.car_id)
  }

  ngAfterViewInit() {
    M.AutoInit()
  }

  getCar(id) {
    let sendData = {
      'car_id': id
    }

    this._http.postRequest(`${environment.apiUrl}/api/car/byid`, sendData).subscribe(data => {
      if (data['body'] == undefined) {
        skip;
      } else {
        this.car = data['body']
      }
    })
  }

  pageBack() {
    this.location.back();
  }

}
