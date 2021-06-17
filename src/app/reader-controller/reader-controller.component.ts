import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service'
import { Reader } from '../Reader';
import { Router } from '@angular/router';
import { LocationObj } from '../Location';

@Component({
  selector: 'app-reader-controller',
  templateUrl: './reader-controller.component.html',
  styleUrls: ['./reader-controller.component.css']
})
export class ReaderControllerComponent implements OnInit {
  constructor(private readerApi: ApiService, private router: Router) { }
  public location;
  public readers;
  ngOnInit(): void {
    this.location = history.state;
    if(this.location.locationName != undefined){
      this.readerApi.getReadersByLocation(this.location.locationName).subscribe(req => this.readers = req);
    }
    else{
      this.readerApi.getReadersByLocation(this.location.Region).subscribe(req => this.readers = req);
    }
  }
  redirectBack() {
    if(this.location.locationName != undefined){
      this.router.navigateByUrl('/location');
    }
    else{
      this.router.navigateByUrl('');
    }
  }
}

