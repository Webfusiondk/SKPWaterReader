import { Component, OnInit } from '@angular/core';
import { ApiFetcherService } from '../Helpers/api-fether.service';
import { token } from '../models/token';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-location-controller',
  templateUrl: './location-controller.component.html',
  styleUrls: ['./location-controller.component.css']
})
export class LocationControllerComponent implements OnInit {
  private token : token
  private fetcher : ApiFetcherService
  constructor(private locationApi: ApiService, private router: Router) { }
  public locations;

  ngOnInit(): void {
    this.SetToken();
    if(this.token.Rolle >2){
      this.locationApi.getLocation().subscribe(req => this.locations = req);
    }
    else{
      this.router.navigateByUrl('/readers', { state: this.token});
    }
  }
SetToken(){
  this.token = JSON.parse(localStorage.getItem('token'));
}
}
