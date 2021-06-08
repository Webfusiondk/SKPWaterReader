import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-location-controller',
  templateUrl: './location-controller.component.html',
  styleUrls: ['./location-controller.component.css']
})
export class LocationControllerComponent implements OnInit {

  constructor(private locationApi: ApiService) { }
  public locations;

  ngOnInit(): void {
    this.locationApi.getLocation().subscribe(req => this.locations = req);
  }

}
