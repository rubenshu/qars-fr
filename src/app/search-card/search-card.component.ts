import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from '../_services/customer.service';
import {HttpService} from '../http.service';
import {environment} from 'src/environments/environment';

import * as $ from "jquery";
import { skip } from 'rxjs/operators';

declare const M: any;

@Component({
  selector: 'app-search-card',
  templateUrl: './search-card.component.html',
  styleUrls: ['./search-card.component.scss']
})
export class SearchCardComponent implements OnInit, AfterViewInit {

  startDate: Date;
  endDate: Date;

  startDateInput: string;
  endDateInput: string;

  localTime: string;
  maxDate: Date;
  cars: any;
  locations: any;

  selectlist: any;
  selected_option: any;

  constructor(public datepipe: DatePipe, 
              private router: Router,
              private _http: HttpService) { }

  ngOnInit() {
    this.getLocations();
  }

  ngAfterViewInit() {
    M.AutoInit()
  }

  addDays(date: Date, days: number): Date {
    date.setDate(date.getDate() + days);
    return date;
  }

  searchOnLocation() {
    var elem = document.getElementById('selectlist');
    var selectlist = M.FormSelect.init(elem);
    // var options = $.map($('#selectlist option'), function(e) { return e; });

    if (selectlist.getSelectedValues()[0] === "none") {
      M.toast({html: 'Selecteer een locatie!', classes: 'rounded bg-main'})
      return;
    }
    
    if (this.selected_option != undefined) {
      skip;
    } else {
      this.selected_option = selectlist.getSelectedValues()[0]
    }

    this.router.navigate(['/cars/filteredcars'], { queryParams: { location: selectlist.getSelectedValues()[0] }})
  }

  getLocations() {
    this._http.getRequest(`${environment.apiUrl}/api/location`).subscribe(data => {
      this.locations = data;
      // console.log(this.locations)
    })
  }
  
}
