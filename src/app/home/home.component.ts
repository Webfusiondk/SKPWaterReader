import { Component } from '@angular/core';

import { User } from '../models/user';
import { AccountService } from '../services/account.service';
import { ApiFetcherService } from '../Helpers/api-fether.service';
import { token } from '../models/token';
import { Observable } from 'rxjs';
import { betterUser } from '../models/betterUser';
import { first } from 'rxjs/operators';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    token : token;
    temp : any;
    user;
    constructor(private ApiFetcherService: ApiFetcherService) {
        this.token =JSON.parse(localStorage.getItem("token"));
    }
    ngOnInit(){
        this.user = betterUser;
        this.fetchData();
    }

    private fetchData(){
        const promise = this.ApiFetcherService.GetUserById(this.token.Id);

        promise.then( (data) => {
          var json = JSON.stringify(data); 
          
          var obj = JSON.parse(json);

          this.user.firstName = obj.FirstName;
        })
    }
}
