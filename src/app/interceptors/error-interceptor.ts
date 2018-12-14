import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthorizationService } from '../services/authorization.service';
import { NotificationService } from '../services/notification.service';

@Injectable({
  providedIn: 'root'
})

export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthorizationService,
    private notify: NotificationService,
  ) {
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request)
      .pipe(
        catchError(
          (error: any) => {
            if (error.status === 401) {
              this.authService.logout();
            }

            const errToThrow: string = error.error.message || error.statusText;

            this.notify.show(error.error.code || error.error.error);

            return throwError(errToThrow);
          })
      );
  }

}
