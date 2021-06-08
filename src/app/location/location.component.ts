import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocationObj } from '../Location';
import { Input } from '@angular/core';
@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  constructor(private router: Router) { }
  @Input()
  public location: LocationObj;

  ngOnInit(): void {
  }
  public redirectClick() {
    this.router.navigateByUrl('/readers', { state: this.location });
  }
}
