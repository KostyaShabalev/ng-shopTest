import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { NotificationService } from '../services/notification.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  private wishlistUrl: string = `${environment.api_url}/wishlists`;

  constructor(
    private http: HttpClient,
    private notify: NotificationService,
  ) { }

  getWishlist(): Observable<any> {
    return this.http.get<any>(this.wishlistUrl);
  }

  getWishlistById(id: string): Observable<any> {
    return this.http.get<any>(this.wishlistUrl + '/' + id);
  }

  creatWishlist(newWishlist: any): Observable<any> {
    return this.http.post<any>(this.wishlistUrl, newWishlist).pipe(
      tap((res: any) => this.notify.show('Wishlist created.'))
    );
  }

  updateWishlist(id: string, update: any): Observable<any> {
    return this.http.put<any>(this.wishlistUrl + '/' + id, update).pipe(
      tap((res: any) => this.notify.show('Wishlist updated.'))
    );
  }

}
