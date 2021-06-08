import { Component, OnInit } from '@angular/core';
import { BetterReader } from '../BetterReader';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-statistic-controller',
  templateUrl: './statistic-controller.component.html',
  styleUrls: ['./statistic-controller.component.css']
})
export class StatisticControllerComponent implements OnInit {

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
