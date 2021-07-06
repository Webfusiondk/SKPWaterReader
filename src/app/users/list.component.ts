import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ApiFetcherService } from '../Helpers/api-fether.service';

import { AccountService } from '../services/account.service';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
  users = null;

  constructor(private apifetch: ApiFetcherService, private router: Router) { }

  ngOnInit() {

    this.apifetch.GetAllUsers()
      .pipe(first())
      .subscribe(users => this.users = users);

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
}
