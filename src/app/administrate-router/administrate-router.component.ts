import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-administrate-router',
  templateUrl: './administrate-router.component.html',
  styleUrls: ['./administrate-router.component.css']
})
export class AdministrateRouterComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
  }

}
