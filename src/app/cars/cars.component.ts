import { AfterViewInit, Component, OnInit } from '@angular/core';
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
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})
export class CarsComponent implements OnInit, AfterViewInit {

  private currentUserSubject: BehaviorSubject<User>;
	public currentUser: Observable<User>;

  decodedToken: any;

  constructor(private _http: HttpService,
              private customerService: CustomerService,
              private authenticationService: AuthenticationService,
              private router: Router) { }

  ngOnInit() {
    if (this.authenticationService.currentUserValue) { 
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));	
      this.currentUser = this.currentUserSubject.asObservable();

      this.decodedToken = jwt_decode(this.currentUser.source['value'].jwt);
    }

    if (this.decodedToken != undefined) {
      if (this.decodedToken.role == 'admin') {
        M.toast({html: 'Jij bent een admin!', classes: 'rounded bg-main'})
        this.router.navigate(['/admin']);
        return;
      }
    }
    
  }

  ngAfterViewInit() {
    M.AutoInit()
  }

}
