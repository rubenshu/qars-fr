import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';

declare const M: any;

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})

export class FooterComponent implements OnInit {
  decodedToken: any;

  constructor(private router: Router, public authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    M.AutoInit()
  }
  
  getCurrentPath() {
    return this.router.url;
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


  logout() {
		this.authenticationService.logout();
    this.router.navigate(['/login']);
    M.toast({html: 'U bent succesvol uitgelogd', classes: 'rounded bg-main'})
	}

}