import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { RequestOptions } from '@angular/http';

import { Observable, BehaviorSubject, ReplaySubject, throwError, of } from 'rxjs';
import { catchError, tap, switchMap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { NotificationService } from '../services/notification.service';
import { User, Credentials, AuthorizationResponse } from '../models/';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  private user: BehaviorSubject<User | null>;
  private authorized: BehaviorSubject<boolean>;
  private ready: BehaviorSubject<boolean>;

  constructor(
    private http: HttpClient,
    private notify: NotificationService
  ) {

    this.ready = new BehaviorSubject<boolean>(false);
    this.authorized = new BehaviorSubject<boolean>(false);
    this.user = new BehaviorSubject<User | null>(null);
  }

  // using for prevent app rendering untill user token is validated
  public isReady(): Observable<boolean> {
    if (!this.getToken()) {
      this.ready.next(true);
    }

    return this.ready.asObservable();
  }

  public isAuthorized(): Observable<boolean> {
    if (!this.authorized.getValue() && this.getToken()) {
        return this.fetchUser().pipe(
          switchMap((user: User) => {

            return of(true);
          })
        );
    }

      return this.authorized.asObservable();
  }

  public getUser(): Observable<User> {

    return this.user.asObservable();
  }

  private authResponseHandler(response: AuthorizationResponse): void {
    if (!!response.success) {
      this.saveToken(response.token);
      this.authorized.next(true);
      this.notify.show('Action success.');

    }
  }

  public login(credentials: Credentials): Observable<AuthorizationResponse> {

    return this.http.post<AuthorizationResponse>(`${ environment.api_url }/login`, credentials).pipe(

      tap((response: AuthorizationResponse) => {
        this.authResponseHandler(response);
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  public register(credentials: Credentials): Observable<AuthorizationResponse> {

    return this.http.post<AuthorizationResponse>(`${ environment.api_url }/auth`, credentials).pipe(
      tap((response: AuthorizationResponse) => {
        this.authResponseHandler(response);
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  private fetchUser (): Observable<User> {

    return this.http.get<User>(`${ environment.api_url }/user`).pipe(
      tap((res: User) => {
        this.authorized.next(true);
        this.user.next(res);
        this.ready.next(true);
      })
    );
  }

  public logout (): void {

    this.authorized.next(false);
    this.user.next(null);
    this.removeToken();
    this.notify.show('You\'re successfully logged out.');
  }

  private saveToken(token: string): void {

    localStorage.setItem('token', token);
  }

  private getToken(): string {

    return localStorage.getItem('token');
  }

  private removeToken(): void {

    localStorage.removeItem('token');
  }

}
