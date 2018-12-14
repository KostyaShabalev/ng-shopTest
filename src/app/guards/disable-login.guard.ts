import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { Observable } from 'rxjs';

import { AuthorizationService } from '../services';

@Injectable({
  providedIn: 'root'
})
export class DisableLoginGuard implements CanActivate {

  private userIsLogin: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthorizationService
  ) {

    this.authService.isAuthorized()
      .subscribe((answer: any) => {
        this.userIsLogin = answer;
      });
  }

  canActivate(): Observable<boolean> | boolean {
    return !this.userIsLogin;
  }
}
