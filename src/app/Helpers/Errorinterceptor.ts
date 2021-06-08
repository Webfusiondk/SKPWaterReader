import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiFetcherService } from './api-fether.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private apiService: ApiFetcherService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if ([401, 403, 404].includes(err.status) && this.apiService.GetToken) {
                // auto logout if 401 or 403 response returned from api
                this.apiService.logout();
            }
            
            const error = err.error?.message || err.statusText;
            console.error(err);
            return throwError(error);
        }))
    }
}