import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ApiFetcherService } from '../Helpers/api-fether.service';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {

  submitted = false;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private apifetcher: ApiFetcherService,
    private route: ActivatedRoute,
    private router: Router
    ) { }


  ngOnInit(): void {
  }
  
  form = this.formBuilder.group({
    readername: ['', Validators.required],
    readernumber: ['', Validators.required],
    readerUnit: ['', Validators.required],
    reading: ['', Validators.required],
    readerdate: ['', Validators.required],
    readerplacement: ['', Validators.required],
    readerRegion: ['', Validators.required]
  });
    
  onSubmit() {
    console.log("Clicked");
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();
    console.log(this.form);
    // stop here if form is invalid
    if (this.form.invalid) {
      console.log("Failed");
        return;
    }
    
    this.loading = true;
    this.createReader()
  }

  get f() { return this.form.controls; }

  private createReader() {
    this.apifetcher.CreateReader(this.form.value)
        .pipe(first())
        .subscribe({
            next: () => {
                this.alertService.success('Reader added successfully', { keepAfterRouteChange: true });
                this.router.navigate(['../'], { relativeTo: this.route });
            },
            error: error => {
                this.alertService.error(error);
                this.loading = false;
            }
        });
}
}
