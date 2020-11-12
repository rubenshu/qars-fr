import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpService } from '../http.service';
import { DatePipe } from '@angular/common';
import { skip } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

declare const M: any;

@Component({
  selector: 'app-filteredcars',
  templateUrl: './filteredcars.component.html',
  styleUrls: ['./filteredcars.component.scss']
})
export class FilteredcarsComponent implements OnInit, AfterViewInit {

  location: String;
  establishments: any;
  cars: any;

  no_establishments: boolean;
  no_cars: boolean;

  constructor(private route: ActivatedRoute,
              public datepipe: DatePipe, 
              private _http: HttpService,
              private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.location = params['location'];
    });

    if (this.location == undefined) {
      M.toast({html: 'Selecteer een locatie!', classes: 'rounded bg-main'})
      this.router.navigate(['']);
    }

    this.getEstablishmentsByLocation(this.location)

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngAfterViewInit() {
    M.AutoInit()
  }

  getEstablishmentsByLocation(location) {

    let sendData = {
      'location': location
    }

    this._http.postRequest(`${environment.apiUrl}/api/establishment/bylocation`, sendData).subscribe(data => {
      this.establishments = data['body'];
      if (data['body'] == undefined) {
        skip;
      } else {
        this.establishments = data['body']
        if (this.establishments.length == 0) {
          this.no_establishments = true;          
        } else {
          this.no_establishments = false;
        }
      }
    })
  }

  showCarsFromEstablishment(establishment_id) {
    this.router.navigate(['/cars/cars-from-establishment'], { queryParams: { establishemt_id: establishment_id }});
  }

}
