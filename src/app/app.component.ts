import { Component } from '@angular/core';
import { token } from './models/token';
import { ApiFetcherService } from './Helpers/api-fether.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SKPPowerReader';
  token: token;

  constructor(private apifetch: ApiFetcherService) {
      this.apifetch.token.subscribe(x => this.token = x);
  }

  logout() {
      this.apifetch.logout();
  }
}
