import { Component, ViewChild, OnInit} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BetterReader } from '../BetterReader';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  dataSource;
  readerHistory: any;
  displayedColumns: string[] = ['readerNumber', 'readerName', 'reading', 'location','date' ];
  constructor(private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.load_data();
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async load_data() {
    await this.apiService.getAllReadersHistory().toPromise().then(res => this.readerHistory = res);
    this.dataSource = new MatTableDataSource<BetterReader>(this.readerHistory);

    this.dataSource.paginator = this.paginator;
  }
}


