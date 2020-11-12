import { AfterViewInit, Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { User } from 'src/app/_models/user';

import { AuthenticationService } from '../../_services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../_services/customer.service';

import { HttpService } from '../../http.service';

import jwt_decode from 'jwt-decode';
import { skip } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

declare const M: any;

@Component({
  selector: 'app-license-requests',
  templateUrl: './license-requests.component.html',
  styleUrls: ['./license-requests.component.scss']
})
export class LicenseRequestsComponent implements OnInit, AfterViewInit {
  private currentUserSubject: BehaviorSubject<User>;
	public currentUser: Observable<User>;
  decodedToken: any;

  license_requests: any;
  no_license_requests: boolean;

  selectedRequest: any;
  selectedLicenseImage: any;

  loading: boolean = false;

  constructor(private _http: HttpService,
              private authenticationService: AuthenticationService,
              private router: Router) {}

  ngOnInit() {
    if (this.authenticationService.currentUserValue) { 
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));	
      this.currentUser = this.currentUserSubject.asObservable();

      this.decodedToken = jwt_decode(this.currentUser.source['value'].jwt);
    }

    this.getLicenseRequests();
  }

  ngAfterViewInit() {
    M.AutoInit()
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

  getLicenseRequests() {
    this.loading = true;
    this._http.getRequest(`${environment.apiUrl}/api/admin/license-requests/`).subscribe(data => {
      this.license_requests = data;
      this.loading = false;
      if (this.license_requests.length == 0) {
        this.no_license_requests = true;
      } else {
        this.no_license_requests = false;
      }
    })
  }

  showLicenseRequest(request) {
    this.selectedRequest = request;
    this.selectedLicenseImage = request.licensephoto;
    this.Modal('open', 'modal1')
  }

  responseToRequest(response) {
    let sendData = {
      'customerid': this.selectedRequest.id,
      'response': response
    }
    
    this._http.postRequest(`${environment.apiUrl}/api/admin/license-response/`, sendData).subscribe(
      res => {
      if (res['status'] == 200) {
        M.toast({html: 'De aanvraag is succesvol beantwoord.', classes: 'rounded bg-main'})
        this.getLicenseRequests();
        this.Modal("close", 'modal1');
      }
    }
  )
  }

}
