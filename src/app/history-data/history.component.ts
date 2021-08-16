import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BetterReader } from '../BetterReader';
import { token } from '../models/token';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  dataSource;
  token: token;
  readerHistory: any;
  displayedColumns: string[] = ['readerNumber', 'readerName', 'reading', 'location', 'date'];
  constructor(private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.SetToken();
    this.load_data();
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async load_data() {
    await this.apiService.getAllReadersHistory().toPromise().then(res => this.readerHistory = res);
    if (this.token.Rolle < 3) {
      for (var i = this.readerHistory.length - 1; i >= 0; i--) {
        if (this.readerHistory[i].location != this.token.Region) {
          this.readerHistory.splice(i, 1);
        }
      }
    }
    this.readerHistory.sort((b, a) => { return <any>(new Date(a.date)) - <any>(new Date(b.date)) });
    this.dataSource = new MatTableDataSource<BetterReader>(this.readerHistory);
    this.dataSource.paginator = this.paginator;
  }
  SetToken() {
    this.token = JSON.parse(localStorage.getItem('token'));
  }
}


