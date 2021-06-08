import { Component, OnInit, Input} from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Reader } from '../Reader';
@Component({
  selector: 'app-water-reader',
  templateUrl: './water-reader.component.html',
  styleUrls: ['./water-reader.component.css']
})
export class WaterReaderComponent implements OnInit {
  constructor(private router: Router, apiService: ApiService) { }
  @Input()
  public reader: Reader;

  ngOnInit(): void {
  }

  redirectClick() {
    this.router.navigateByUrl('/clicked', { state: this.reader });
  }
}
