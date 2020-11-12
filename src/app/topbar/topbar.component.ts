import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';

import { User } from 'src/app/_models/user';

import jwt_decode from 'jwt-decode';

declare const M: any;

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  private currentUserSubject: BehaviorSubject<User>;
	public currentUser: Observable<User>;

  decodedToken: any;

  constructor(private router: Router, public authenticationService: AuthenticationService) { }

  ngOnInit() {
    if (this.authenticationService.currentUserValue) { 
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));	
      this.currentUser = this.currentUserSubject.asObservable();

      this.decodedToken = jwt_decode(this.currentUser.source['value'].jwt);
    }
  }

  ngAfterViewInit() {
    M.AutoInit()
  }

  getCurrentRole() {
    return this.decodedToken.role;
  }

  isCustomer() {
    if (this.authenticationService.getCurrentRole === undefined) return false;

    if (this.authenticationService.getCurrentRole === 'customer') {
      return true;
      } else {
        return false;
      }
  }

  isAdmin() {
    if (this.authenticationService.getCurrentRole === undefined) return false;

    if (this.authenticationService.getCurrentRole === 'admin') {
      return true;
    } else {
      return false;
    }
  }

  getCurrentPath() {
    return this.router.url;
  }

  logout() {
		this.authenticationService.logout();
    this.router.navigate(['/login']);
    M.toast({html: 'U bent succesvol uitgelogd', classes: 'rounded bg-main'})
	}
}