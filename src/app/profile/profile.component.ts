import { AfterViewInit, Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl} from '@angular/forms';

import { User } from 'src/app/_models/user';

import { AuthenticationService } from '../_services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from '../_services/customer.service';

import { HttpService } from '../http.service';

import jwt_decode from 'jwt-decode';
import { send } from 'process';
import { skip } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

declare const M: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, AfterViewInit {
  imageURL: string;
  uploadForm: FormGroup;
  loading = false;
  img : any;


  private currentUserSubject: BehaviorSubject<User>;
	public currentUser: Observable<User>;
  decodedToken: any;
  customerInformation: any;

  allbookings: any;
  emptyBookingsList: boolean;

  modalInstance: any;

  constructor(
    private _http: HttpService, 
    private router: Router,
    private authenticationService: AuthenticationService,
    public formBuilder: FormBuilder,
    private customerService: CustomerService
  ) {
      // redirect naar login pagina als al niet ingelogd bent
      if (!this.authenticationService.currentUserValue) { 
        M.toast({html: 'U moet eerst inloggen!', classes: 'rounded bg-main'})
        this.router.navigate(['']);
    }

      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));	
      this.currentUser = this.currentUserSubject.asObservable();

      this.uploadForm = this.formBuilder.group({
        avatar: new FormControl('',[Validators.required]),
        name: new FormControl('',[Validators.required])
      })
   }

  ngOnInit() {

    this.decodedToken = jwt_decode(this.currentUser.source['value'].jwt);

    if (this.decodedToken.role == 'admin') {
      M.toast({html: 'Jij bent een admin!', classes: 'rounded bg-main'})
      this.router.navigate(['/admin']);
      return;
    }

    this.getProfile();

  }

  ngAfterViewInit() {
    M.AutoInit()
  }

  // convenience getter for easy access to form fields
  get f() { return this.uploadForm.controls; }

  // Image Preview
  showPreview(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.uploadForm.patchValue({
      avatar: file
    });
    this.uploadForm.get('avatar').updateValueAndValidity()

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
    }
    reader.readAsDataURL(file)
  }

  // Submit Form
  submit() {

    if (this.imageURL == undefined) {
      M.toast({html: 'Upload uw rijbewijs!', classes: 'rounded bg-main'})
      return;
    }

    this.loading = true;

    this.customerService.uploadLicense(this.decodedToken.id, this.imageURL)
    .subscribe(
      res => {
        M.toast({html: 'Uw aanvraag is succesvol ontvangen', classes: 'rounded bg-main'})
        this.getProfile();
        this.Modal("close", 'modal1');
      },
      err => {
        M.toast({html: 'Iets gaat fout, probeer het later nog eens', classes: 'rounded bg-main'})
        console.log(err['body']);
      }
    )

    }

  Modal(action, id) {
    var elem = document.getElementById(id);
    var instance = M.Modal.init(elem);

    if (action === "open") {
      instance.open()
      return;
    }

    if (action === "close") {
      instance.close();
      return;
    }
  }

  getProfile() {

    let sendData = {
      'id': this.decodedToken.id
    }

    this._http.postRequest(`${environment.apiUrl}/api/customer/profile`, sendData).subscribe(data => {
      this.customerInformation = data['body']
    })

  }

  getBookings() {
    let sendData = {
      'id': this.customerInformation.customer_id
    }

    this._http.postRequest(`${environment.apiUrl}/api/booking/mybookings`, sendData).subscribe(data => {
      this.allbookings = data['body']
      if (data['body'] == undefined) {
        skip;
      } else {
        if (this.allbookings.length == 0) {
          this.emptyBookingsList = true;          
        } else {
          this.emptyBookingsList = false;
        }
      }
      console.log(this.allbookings);
    })
  }

  showBookings() {
    this.getBookings();
    this.Modal('open', 'modal2')
  }

}
