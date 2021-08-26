import { Component, Input, OnInit } from '@angular/core';
import { ReaderWithDate } from '../models/ReaderWithDate'
import { Reader } from '../Reader';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-clicked-stats',
  templateUrl: './clicked-stats.component.html',
  styleUrls: ['./clicked-stats.component.css']
})
export class ClickedStatsComponent implements OnInit {
  @Input() readerWithDate: ReaderWithDate;
  readerHistory: any;
  readerHistorySorted: Reader[] = [];
  readerChartOptions: any;
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
  }
  ngOnChanges() {
    this.readerHistorySorted = [];
    this.getReaderHistory();
  }
  async getReaderHistory() {
    await this.apiService.getReaderHistoryByDate(this.readerWithDate).toPromise().then(res => this.readerHistory = res);
    this.sortDates();
    this.sortReadings();
    this.setOptionsForGraph();
  }
  sortDates() {
    if (this.readerWithDate.endDate > this.readerWithDate.reader.date) {
      let tempReader: string = JSON.stringify(this.readerWithDate.reader);
      this.readerHistory.push(JSON.parse(tempReader));
    }
    this.readerHistory.sort((a, b) => { return <any>(new Date(a.date)) - <any>(new Date(b.date)) });
  }
  sortReadings() {
    for (var i = 1; i < this.readerHistory.length; i++) {
      if ((this.readerHistory[i - 1].reading * 1) > this.readerHistory[i].reading) {
        let goal: number = 0;
        let reset1: number = 1000 - this.readerHistory[i - 1].reading;
        let reset2: number = 10000 - this.readerHistory[i - 1].reading;
        let reset3: number = 100000 - this.readerHistory[i - 1].reading;
        let reset4: number = 1000000 - this.readerHistory[i - 1].reading;
        let reset5: number = 10000000 - this.readerHistory[i - 1].reading;
        let reset6: number = 100000000 - this.readerHistory[i - 1].reading;
        let resetCounter: number[] = [reset1, reset2, reset3, reset4, reset5, reset6];
        let closest: number = resetCounter.reduce(function (prev, curr) {
          return (Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev);
        });

        let tempNum: number = closest + (this.readerHistory[i].reading * 1);
        let saveReading: number = this.readerHistory[i].reading;
        this.readerHistory[i].reading = tempNum;
        let tempReader: string = JSON.stringify(this.readerHistory[i]);
        this.readerHistorySorted.push(JSON.parse(tempReader));
        this.readerHistory[i].reading = saveReading;
        }
    }
    for (var i = this.readerHistory.length - 1; i >= 0; i--) {
      if (i >= 1) {
        if ((this.readerHistory[i - 1].reading * 1) < this.readerHistory[i].reading) {

          this.readerHistory[i].reading -= this.readerHistory[i - 1].reading;

          this.readerHistorySorted.push(this.readerHistory[i]);
        }
      }
    }
    this.readerHistorySorted.sort((a, b) => { return <any>(new Date(a.date)) - <any>(new Date(b.date)) });
  }
  setOptionsForGraph() {
    let t: string;
    t = this.readerWithDate.reader.readerUnit;
    this.readerChartOptions = {
      title: {
        text: 'Måler forbrug for måler: ' + this.readerWithDate.reader.readerName + " i tidsperioden: " + this.readerWithDate.startDate + " - " + this.readerWithDate.endDate,
      },
      legend: {
      },
      tooltip: {
        trigger: 'item',
        showDelay: 0,
        transitionDuration: 0.2,
        formatter: function (params) {
          return `<b>${params['name']}</b> : ${params['value']} ${t}`;
        }
      },
      xAxis: {
        data: this.readerHistorySorted.map(r => new Date(r.date).toLocaleDateString()),
        boundaryGap: false
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: '{value} ' + t,

        }
      },

      series: [{
        type: 'line',
        data: this.readerHistorySorted.map(r => r.reading),
        symbolSize: 10,
        areaStyle: {}
      },
      ]
    };
  }

}
