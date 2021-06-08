import { Component, Input, OnInit } from '@angular/core';
import { BetterReader } from '../BetterReader';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-clicked-stats',
  templateUrl: './clicked-stats.component.html',
  styleUrls: ['./clicked-stats.component.css']
})
export class ClickedStatsComponent implements OnInit {
  @Input() reader: BetterReader;
  readerHistory: any;
  readerChartOptions: any;
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
  }
  ngOnChanges() {
    this.getReaderHistory();
  }
  async getReaderHistory() {
    await this.apiService.getReaderHistory(this.reader).toPromise().then(res => this.readerHistory = res);
    this.readerHistory.push(this.reader);
    this.sortDates();
    this.setOptionsForGraph();
  }
  sortDates() {
    this.readerHistory.sort((a, b) => { return <any>(new Date(a.date)) - <any>(new Date(b.date)) });
  }
  setOptionsForGraph() {
    let t: string;
    t = this.reader.readerUnit;
    this.readerChartOptions = {
      title: {
        text: 'Måler forbrug i år: ' + this.reader.readerName,
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
        areaStyle: {}
      },
      ]
    };
  }

}
