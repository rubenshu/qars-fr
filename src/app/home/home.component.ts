import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpService } from '../http.service';
import { BehaviorSubject, Observable } from 'rxjs';

import { CustomerService } from '../_services/customer.service';
import { AuthenticationService } from '../_services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from 'src/app/_models/user';
import { environment } from 'src/environments/environment';

import jwt_decode from 'jwt-decode';

declare const M: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  
  private currentUserSubject: BehaviorSubject<User>;
	public currentUser: Observable<User>;

  decodedToken: any;

  startDate: Date;
  endDate: Date;

  startDateInput: string;
  endDateInput: string;

  localTime: string;
  maxDate: Date;
  cars: any;

  selectlist: any;

  constructor(public datepipe: DatePipe, 
              private _http: HttpService,
              private customerService: CustomerService,
              private authenticationService: AuthenticationService,
              private router: Router) 
              
              {}

  ngOnInit() {
    if (this.authenticationService.currentUserValue) { 
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));	
      this.currentUser = this.currentUserSubject.asObservable();

      this.decodedToken = jwt_decode(this.currentUser.source['value'].jwt);
    }

    if (this.decodedToken != undefined) {
      if (this.decodedToken.role == 'admin') {
        this.router.navigate(['/admin']);
        return;
      }
    }
   

    this.startDate = new Date();
    this.endDate = this.addDays(new Date(), 2);

    this.startDateInput = this.datepipe.transform(this.startDate, 'yyyy-MM-dd');
    this.endDateInput = this.datepipe.transform(this.endDate, 'yyyy-MM-dd');

    this.localTime = this.datepipe.transform(this.startDate, 'hh:mm');
    this.maxDate = this.endDate = this.addDays(this.startDate, 365);

    this.getCars();
  }

  ngAfterViewInit() {
    M.AutoInit()
  }

  addDays(date: Date, days: number): Date {
    date.setDate(date.getDate() + days);
    return date;
  }

  getCars() {
    this._http.getRequest(`${environment.apiUrl}/api/car/top6`).subscribe(data => {
      this.cars = data;
    })
  }

  searchOnLocation() {
    var elem = document.getElementById('selectlist');
    var selectlist = M.FormSelect.init(elem);
    if (selectlist.getSelectedValues()[0] === "none") {
      M.toast({html: 'Selecteer een locatie!', classes: 'rounded bg-main'})
      return;
    }
    this.router.navigate(['/cars/filteredcars'], { queryParams: { location: selectlist.getSelectedValues()[0] }})
  }

  reserveerAuto(id) {
    this.router.navigate(['/rent/cardetails'], { queryParams: { car_id: id }});
  }

}