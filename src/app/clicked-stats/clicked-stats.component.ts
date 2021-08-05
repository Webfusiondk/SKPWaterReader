import { Component, Input, OnInit } from '@angular/core';
import { ReaderWithDate } from '../models/ReaderWithDate'
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-clicked-stats',
  templateUrl: './clicked-stats.component.html',
  styleUrls: ['./clicked-stats.component.css']
})
export class ClickedStatsComponent implements OnInit {
  @Input() readerWithDate: ReaderWithDate;
  readerHistory: any;
  readerChartOptions: any;
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
  }
  ngOnChanges() {
    this.getReaderHistory();
  }
  async getReaderHistory() {
    await this.apiService.getReaderHistoryByDate(this.readerWithDate).toPromise().then(res => this.readerHistory = res);
    this.sortDates();
    this.setOptionsForGraph();
  }
  sortDates() {
    this.readerHistory.sort((a, b) => { return <any>(new Date(a.date)) - <any>(new Date(b.date)) });
    console.log(this.readerHistory);
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
        data: this.readerHistory.map(r => new Date(r.date).toLocaleDateString()),
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
        data: this.readerHistory.map(r => r.reading),
        symbolSize: 10,
        areaStyle: {}
      },
      ]
    };
  }

}
