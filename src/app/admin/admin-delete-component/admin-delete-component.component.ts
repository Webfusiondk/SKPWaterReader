import { Component, OnInit } from '@angular/core';
import { Reader } from '../../Reader';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-admin-delete-component',
  templateUrl: './admin-delete-component.component.html',
  styleUrls: ['./admin-delete-component.component.css']
})
export class AdminDeleteComponentComponent implements OnInit {
  public reader: Reader;
  public readerFound: boolean;
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
  }

  async searchForReader(readerNumber: string) {
    await this.apiService.getReaderByReaderNumber(readerNumber).toPromise().then(res => this.reader = res);
    this.checkForReader();
  }
  checkForReader() {
    if (this.reader.readerNumber) {
      this.readerFound = true;
    } else {
      this.readerFound = false;
    }
  }
}
