import { Component, OnInit } from '@angular/core';

import { switchMap, delay, map } from 'rxjs/operators';

import { CartService } from '../../services/cart.service';
import { AuthorizationService } from '../../services/authorization.service';
import { User } from '../../models/user';
import { Product } from '../../models/product.model';
import { Order } from '../../models/order';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  private currOrder: Order;
  private currClient: User;
  private totalSum: number = 0;
  private productIds: Array<string> = [];
  private isEmpty: boolean = true;

  constructor(
    private cartService: CartService,
    private authService: AuthorizationService
    ) {

    this.getCurrentCart();
  }

  getCurrentCart(): void {
    this.authService.getUser()
    .pipe(
      switchMap((client: User) => {
        if (!client) {
          throw new Error('Could not get a cart of null or undefined');
        }
        this.currClient = client;

        return this.cartService.getOrders(client);
      })
      )
    .subscribe((order: Order) => {

      debugger;

      if (!!order && order.items) {
        this.currOrder = order;

        for (const key in this.currOrder.items) {
          if (!!key) {
            this.currOrder.total += this.currOrder.items[key].quantity * this.currOrder.items[key].product.price;
          }
        }

        this.productIds = Object.keys(this.currOrder.items);
        this.isEmpty = false;

        return;
      }

      this.currOrder = null;
      this.isEmpty = true;
    });
  }

  updateCart(
    order_item: { quantity: number, product: Product },
    id: string,
    quantity: number
    ): void {
    order_item.quantity += quantity;
    order_item.product.id = id;
    this.cartService.updateOrder(order_item, this.currOrder, false)
    .pipe(
      map(
        (res: any) => {
          return res;
        }
        )
      )
    .subscribe((response: any) => {
      this.getCurrentCart();
    });
  }

  deleteProduct(id: string): void {

    this.cartService.updateOrder(this.currOrder.items[id], this.currOrder, true)
    .pipe(
      map((res: any) => res)
      )
    .subscribe((response: any) => {
      this.getCurrentCart();
    });
  }

  clearCart(order: Order): void {
    this.cartService.deleteOrder(order.id)
    .subscribe((res: any) => {
      this.getCurrentCart();
      this.currOrder = null;
      this.isEmpty = true;
    });
  }

}
