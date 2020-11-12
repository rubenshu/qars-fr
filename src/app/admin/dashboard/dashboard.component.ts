import { AfterViewInit, Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { User } from 'src/app/_models/user';

import { HttpService } from '../../http.service';

import { environment } from 'src/environments/environment';

import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

declare const M: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  private currentUserSubject: BehaviorSubject<User>;
	public currentUser: Observable<User>;
  decodedToken: any;

  cars: any;
  users: any;

  public chartType: string = 'horizontalBar';

  public chartDatasets: Array<any> = [
    { data: [], label: 'Aantal keer geboekt' }
  ];

  public chartLabels: Array<any> = [];

  public chartColors: Array<any> = [
    {
      backgroundColor: [],
      borderColor: [],
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true
  };

  constructor(private _http: HttpService) {}

  ngOnInit() {
    this.getCars();
    this.getCustomers();
  }

  ngAfterViewInit() {
  }

  getCars() {
    this._http.getRequest(`${environment.apiUrl}/api/car/`).subscribe(data => {
      this.cars = data;
      
      for (let car in data) {
        this.chartLabels.push(data[car]['carmodel'])
        this.chartDatasets[0]['data'].push(data[car]['counter'])
        this.chartColors[0]['backgroundColor'].push('rgba(255, 213, 79, 0.7)')
        this.chartColors[0]['borderColor'].push('rgb(255, 213, 79)')
      }

    })
  }

  getCustomers() {
    this._http.getRequest(`${environment.apiUrl}/api/customer/count`).subscribe(data => {
      this.users = data;
    })
  }

}
