import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './_services/authentication.service';
import { User } from './_models/user';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'qars-ng-app';
  currentUser: User;
  public loggedIn: boolean;
  decodedToken: any;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
}

ngOnInit() {

  if (this.authenticationService.currentUserValue != null) {
    this.decodedToken = jwt_decode(this.authenticationService.currentUserValue['jwt'])
    this.authenticationService.setCurrentRole(this.decodedToken.role)
  }
  
}

logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
}

// temporary
getCurrentPath() {
  return this.router.url;
}

}