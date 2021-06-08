import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AccountService } from '../services/account.service';
import { ApiFetcherService } from './api-fether.service';

@Injectable({ providedIn: 'root' })
export class AuthGuardComponent implements CanActivate {
  constructor(
    private router: Router,
    private apiFetcher : ApiFetcherService
) {}

canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = this.apiFetcher.GetToken;
    this.apiFetcher.UpdateSession().subscribe();
    if (token) {
        // authorised so return true
        console.log("Auth guard true");
        return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/account/login'], { queryParams: { returnUrl: state.url }});
    console.log("Auth guard false")
    return false;
}
}
