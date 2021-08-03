
import { Component, OnInit } from '@angular/core';
import { BetterReader } from '../BetterReader';
import { ApiService } from '../services/api.service';
import { FormControl, FormGroup } from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import * as _moment from 'moment';
//tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment, Moment } from 'moment';
const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-statistic-controller',
  templateUrl: './statistic-controller.component.html',
  styleUrls: ['./statistic-controller.component.css'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class StatisticControllerComponent implements OnInit {
  date = new FormControl(moment());
  range = new FormGroup({
    start: this.date,
    end: this.date
  });

  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    datepicker.close();
  }
  constructor(private readerApi: ApiService) { }
  public readers: any;
  public selectedReader: any;
  public locations: any;
  ngOnInit(): void {
    this.loadDataFromApi();
  }

 

  onSelectChange(reader: any) {
    let t: BetterReader;
    for (var i = 0; i < this.readers.length; i++) {
      if (this.readers[i].readerNumber == reader) {
        t = this.readers[i];
      }
    }
    this.selectedReader = t;
  }
  async loadDataFromApi() {
    await this.readerApi.getReaders().toPromise().then(req => this.readers = req);
    this.selectedReader = this.readers[0];
    this.readerApi.getLocation().subscribe(loc => this.locations = loc);
  }
}
 




