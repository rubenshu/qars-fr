import {AfterViewInit, Component, OnInit} from '@angular/core';
import {HttpService} from '../http.service';

import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from 'src/environments/environment';

import {CustomerService} from '../_services/customer.service';
import {AuthenticationService} from '../_services/authentication.service';
import {Router, ActivatedRoute} from '@angular/router';

import {User} from 'src/app/_models/user';

import jwt_decode from 'jwt-decode';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {skip} from 'rxjs/operators';

declare const M: any;

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.scss']
})
export class RentComponent implements OnInit, AfterViewInit {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  decodedToken: any;
  bookingForm: FormGroup;
  carId: number;
  customerInformation: any;

  submitted = false;
  response: any;
  currentDate = new Date();

  beginDate: any;

  constructor(private _http: HttpService,
              private customerService: CustomerService,
              private authenticationService: AuthenticationService,
              private router: Router,
              public formBuilder: FormBuilder,
              private route: ActivatedRoute) 
              {

    this.bookingForm = this.formBuilder.group({
      beginDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required]),
      localStartTime: new FormControl('', [Validators.required]),
      localEndTime: new FormControl('', [Validators.required]),
      dropoffLocation: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
    
    if (this.authenticationService.currentUserValue) {
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
      this.currentUser = this.currentUserSubject.asObservable();

      this.decodedToken = jwt_decode(this.currentUser.source['value'].jwt);
      this.getProfile();
    }

    this.route.queryParams.subscribe(params => {
      this.carId = params.car_id;
    });
  }

  get f() {
    return this.bookingForm.controls;
  }

  submitBooking() {

    this.submitted = true;

    // stop here if form is invalid
    if (this.bookingForm.invalid) {
      return;
    }

    if (this.f.endDate.value <= this.f.beginDate.value) {
      M.toast({html: 'Inleverdatum kan niet gelijk of onder de ophaaldatum zitten!', classes: 'rounded bg-main'}); 
      return;
    } else if (this.f.beginDate.value < this.currentDate.toISOString().slice(0,10)) {
      M.toast({html: 'Ophaaldatum kan niet eerder dan vandaag zijn!', classes: 'rounded bg-main'}); 
      return;
    }

    // redirect naar login pagina als al niet ingelogd bent
    if (!this.authenticationService.currentUserValue) { 
      M.toast({html: 'U moet eerst inloggen!', classes: 'rounded bg-main'})
      return;
    }

    if (this.customerInformation.driverlicense_status !== 'GEACCEPTEERD') {
      M.toast({html: 'Uw rijbewijs is nog niet geaccepteerd, zie profiel!', classes: 'rounded bg-main'});
      return;
    } 
    
    this.customerService.createBooking(this.carId, this.decodedToken.id, this.f.beginDate.value, this.f.endDate.value, this.f.localStartTime.value, this.f.localEndTime.value, this.f.dropoffLocation.value, 50)
    .subscribe(
      res => {
        M.toast({html: 'Uw boeking is succesvol geplaatst.', classes: 'rounded bg-main'})
        this.router.navigate(['/profile']);
      },
      err => {
        M.toast({html: 'Er is iets misgegaan, probeer het later nog eens.', classes: 'rounded bg-main'})
        this.submitted = false;
        return;
      }
    )
  }

  getProfile() {
    const sendData = {
      id: this.decodedToken.id
    };
    this._http.postRequest(`${environment.apiUrl}/api/customer/profile`, sendData).subscribe(data => {
      this.customerInformation = data["body"];
    });
  }

  ngAfterViewInit() {
    M.AutoInit();
  }

}
