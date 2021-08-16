import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { BetterReader } from '../../../BetterReader';
import { AlertService } from '../../../services/alert.service';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-delete-reader',
  templateUrl: './delete-reader.component.html',
  styleUrls: ['./delete-reader.component.css']
})
export class DeleteReaderComponent implements OnInit {
  constructor(private apiService: ApiService, private alertService: AlertService, private router: Router, private route: ActivatedRoute) { }
  @Input()
  public reader: BetterReader;

  ngOnInit(): void {
  }

  deleteReader() {
    this.apiService.deleteReader(this.reader).pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Måler fjernet succefuldt', { keepAfterRouteChange: true });
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        error: error => {
          this.alertService.error(error);
        }
      });
  }
}
