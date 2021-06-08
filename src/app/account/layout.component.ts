import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiFetcherService } from '../Helpers/api-fether.service';

@Component({ templateUrl: 'layout.component.html' })
export class LayoutComponent {
    constructor(
        private router: Router,
        private apifetch: ApiFetcherService
    ) {
        // redirect to home if already logged in
        if (this.apifetch.GetToken) {
            this.router.navigate(['/']);
        }
    }
}