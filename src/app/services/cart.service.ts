import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, BehaviorSubject, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../models/user';
import { Product } from '../models/product.model';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private orderUrl: string = `${environment.api_url}/orders`;

  constructor(
    private http: HttpClient
    ) {  }

  getOrders(client: User): Observable<Order> {

    return this.http.get<any>(this.orderUrl)
    .pipe(
      map(
        (res: any) => {
          if (!!res.orders.length) {

            let currOrder = this.filterOrders(client, res.orders)[0];

            return {...currOrder, client };
          }

          return null;
        })
      );
  }

  filterOrders(client: User, orders: any): Order {

    return orders.filter((order: Order) => {
      return ((order.client.id === client.id) && (!order.date));
    });
  }

  updateOrder(
    order_item: { quantity: number, product: Product },
    order: Order,
    deleteProduct: boolean
    ): Observable<any> {

    if (!deleteProduct) {

      order = {
        ...order,
        items: {
          ...order.items,
          [order_item.product.id]: {
            ...order.items[order_item.product.id],
            product: order_item.product,
            quantity: order_item.quantity
          }
        }
      };

      return this.http.put(`${this.orderUrl}/${order.id}`, order);

    }

    order = this.deleteProduct(order, order_item);
    return this.http.put(`${this.orderUrl}/${order.id}`, order);
    

  }

  createOrder(
    client: User,
    order_item: { quantity: number, product: Product }
    ): Observable<Order> {

    const body: any = {
      date: null,
      client: client,
      total: order_item.product.price * order_item.quantity,
      items: {
        [order_item.product.id]: order_item
      }
    };

    return this.http.post(`${this.orderUrl}`, body)
    .pipe(
      map((res: any) => {
        return res;
      })
      );
  }

  deleteProduct(order, product): Order {

    delete order.items[product.product.id];

    return order;
  }

  deleteOrder(orderId: string): Observable<any> {

    return this.http.delete(`${this.orderUrl}/${orderId}`);
  }

}
