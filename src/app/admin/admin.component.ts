import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ApiService } from '../services/api.service';
import { AlertService } from '../services/alert.service';
import { token } from '../models/token';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {

  submitted = false;
  loading = false;
  token: token;
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.SetToken();

    this.form = this.formBuilder.group({
      readername: ['', Validators.required],
      readernumber: ['', Validators.required],
      readerUnit: ['', Validators.required],
      reading: ['0', Validators.required],
      placement: ['', Validators.required],
      location: [this.token.Region, Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();
    this.alertService.clear();
    console.log(this.form);
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.createReader()
  }
  SetToken() {
    this.token = JSON.parse(localStorage.getItem('token'));
  }
  get f() { return this.form.controls; }

  private createReader() {
    this.api.createReader(this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Måler tilføjet succesfuldt', { keepAfterRouteChange: true });
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        error: error => {
          this.alertService.error(error);
          this.loading = false;
        }
      });
  }
}
