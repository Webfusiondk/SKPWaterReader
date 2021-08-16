import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-controller',
  templateUrl: './admin-controller.component.html',
  styleUrls: ['./admin-controller.component.css']
})
export class AdminControllerComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  redirectClick() {
    this.router.navigateByUrl('/adminComponent');
  }
}
