import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { BetterReader } from '../../../BetterReader';
import { Reader } from '../../../Reader';
import { AlertService } from '../../../services/alert.service';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-edit-reader',
  templateUrl: './edit-reader.component.html',
  styleUrls: ['./edit-reader.component.css']
})
export class EditReaderComponent implements OnInit {
  @Input()
  public reader: BetterReader;
  private sendReader: Reader;
  submitted = false;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router
  ) { }


  ngOnInit(): void {
  }

  form = this.formBuilder.group({
    readername: ['', Validators.required],
    readerUnit: ['', Validators.required],
    reading: ['', Validators.required],
    placement: ['', Validators.required],
    location: ['', Validators.required]
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
    this.updateReader()
  }

  get f() { return this.form.controls; }

  private updateReader() {
    this.sendReader = this.form.value;
    this.sendReader.readerNumber = this.reader.readerNumber;
    this.api.updateReader(this.sendReader)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Måler opdateret succesfuldt', { keepAfterRouteChange: true });
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        error: error => {
          this.alertService.error(error);
          this.loading = false;
        }
      });
  }
}

