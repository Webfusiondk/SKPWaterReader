import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ApiFetcherService } from '../Helpers/api-fether.service'

import { AlertService } from '../services/alert.service';
import { AccountService } from '../services/account.service';

import { Alert, AlertType } from '../models/alert';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user';
import { token } from '../models/token';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    form: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private ApiFetcherService: ApiFetcherService,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
      if (this.form.invalid) {
            return;
        }

        this.loading = true;
        this.ApiFetcherService.Login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe({
                next: () =>{
                console.log("Worked");
                const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                this.router.navigateByUrl(returnUrl);
                },
                error: error =>{
                this.alertService.error("Password or Username Invalid");
                this.loading = false;
                }
            });
    }
}
