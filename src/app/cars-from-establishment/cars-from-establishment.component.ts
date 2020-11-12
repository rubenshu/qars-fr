import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpService } from '../http.service';
import { environment } from 'src/environments/environment';
import { skip } from 'rxjs/operators';
import { Location } from '@angular/common';

declare const M: any;

@Component({
  selector: 'app-cars-from-establishment',
  templateUrl: './cars-from-establishment.component.html',
  styleUrls: ['./cars-from-establishment.component.scss']
})
export class CarsFromEstablishmentComponent implements OnInit {
  no_cars: boolean;
  cars: any;
  establishmentId: any;

  constructor(private route: ActivatedRoute, private router: Router, private _http: HttpService, private location: Location) { }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.establishmentId = params.establishemt_id;
    });

    this.getCarsFromEstablishment(this.establishmentId)
  }

  getCarsFromEstablishment(establishment_id) {
    let sendData = {
      'establishment_id': establishment_id
    }

    this._http.postRequest(`${environment.apiUrl}/api/car/byestablishment`, sendData).subscribe(data => {
      this.cars = data['body'];
      if (data['body'] == undefined) {
        skip;
      } else {
        if (this.cars.length == 0) {
          this.no_cars = true;
        } else {
          this.no_cars = false;
        }
      }
    })
  }

  reserveerAuto(id) {
    this.router.navigate(['/rent/cardetails'], { queryParams: { car_id: id }});
  }

  pageBack() {
    this.location.back();
  }

}
