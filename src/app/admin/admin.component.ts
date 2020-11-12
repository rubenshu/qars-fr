import { AfterViewInit, Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { User } from 'src/app/_models/user';

import { AuthenticationService } from '../_services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from '../_services/customer.service';

import { HttpService } from '../http.service';

import jwt_decode from 'jwt-decode';
import { skip } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

declare const M: any;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, AfterViewInit {
  private currentUserSubject: BehaviorSubject<User>;
	public currentUser: Observable<User>;
  decodedToken: any;

  constructor(private _http: HttpService, 
              private router: Router,
              private authenticationService: AuthenticationService
              ) {
            // redirect naar login pagina als al niet ingelogd bent
            if (!this.authenticationService.currentUserValue) { 
              M.toast({html: 'U moet eerst inloggen!', classes: 'rounded bg-main'})
              this.router.navigate(['']);
            }
          
          }

  ngOnInit() {
    if (this.authenticationService.currentUserValue) { 
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));	
      this.currentUser = this.currentUserSubject.asObservable();

      this.decodedToken = jwt_decode(this.currentUser.source['value'].jwt);
    }

    if (this.decodedToken.role == 'admin') {
      return;
    } else {
      M.toast({html: 'U bent geen admin!', classes: 'rounded bg-main'})
      this.router.navigate(['']);
    }
  }

  ngAfterViewInit() {
    M.AutoInit()
  }

}
