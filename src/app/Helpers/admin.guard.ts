import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiFetcherService } from './api-fether.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private apiFetcher: ApiFetcherService, private router: Router) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = this.apiFetcher.GetToken;
    this.apiFetcher.UpdateSession().subscribe();
    if (token.Rolle > 1) {
      return true;
    }
    if (token) {
      this.router.navigateByUrl('');
      return false;
    }
    this.router.navigate(['/account/login'], { queryParams: { returnUrl: state.url } });
    return false;

  }

}
