import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ApiFetcherService } from '../Helpers/api-fether.service';
import { token } from '../models/token';

import { AccountService } from '../services/account.service';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
  users = null;
  private token: token

  constructor(private apifetch: ApiFetcherService, private router: Router) { }

  ngOnInit() {
    this.SetToken();
    if (this.token.Rolle > 2) {

      this.apifetch.GetAllUsers()
        .pipe(first())
        .subscribe(users => this.users = users);
    }
    else {
      this.loadDataFromApiWithLowerPermission();

    }
  }

  deleteUser(id: number) {
    let temp;
    this.apifetch.UpdateSession()
      .pipe(first())
      .subscribe({
        next: () => {
          console.log("Nothing wrong");
          temp = true;
          const user = this.users.find(x => x.id === id);
          user.isDeleting = true;
          console.log(id);
          this.apifetch.RemoveUserById(id)
            .pipe(first())
            .subscribe(() => this.users = this.users.filter(x => x.id !== id));
        },
        error: error => {
          console.log("Dose not work");
          temp = false;
        }
      });
  }
  SetToken() {
    this.token = JSON.parse(localStorage.getItem('token'));
  }
  async loadDataFromApiWithLowerPermission() {
    await this.apifetch.GetAllUsers().toPromise().then(users => this.users = users);
    for (var i = this.users.length - 1; i >= 0; i--) {
      if (this.users[i].region != this.token.Region || this.users[i].rolle == "SuperAdmin") {
        this.users.splice(i, 1);
      }
    }
  }
}
