import { Component, OnInit } from '@angular/core';
import { mergeMap } from 'rxjs/operators';

import { WishlistService } from '../../services/wishlist.service';
import { Product } from 'src/app/models/product.model';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-wishlist-page',
  templateUrl: './wishlist-page.component.html',
  styleUrls: ['./wishlist-page.component.scss']
})
export class WishlistPageComponent implements OnInit {

  products: Product[];

  id: string;

  constructor( private wishlistService: WishlistService,
    private authorizationService: AuthorizationService ) {}

  ngOnInit(): void {
    this.authorizationService.getUser()
    .pipe(mergeMap((response: User) => this.wishlistService.getWishlistById(response.id)))
    .subscribe( (data: Product[]) => this.products = data);
  }

}
