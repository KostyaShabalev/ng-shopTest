import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { ProductsService } from '../../services/products.service';
import { CartService } from '../../services/cart.service';
import { AuthorizationService } from '../../services/authorization.service';
import { Product } from '../../models/product.model';
import { Order } from '../../models/order';
import { User } from '../../models/user';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {

  public products$: Observable<Product[]>;
  public categories$: Observable<string[]>;

  private currClient: User | null = null;
  private currOrder: Order | null = null;

  price: FormControl;
  stock: FormControl;
  category: FormControl;
  filtersForm: FormGroup;

  constructor(
    private productsService: ProductsService,
    private cartService: CartService,
    private authService: AuthorizationService
  ) {
    this.products$ = this.productsService.getAllProducts();
    this.categories$ = this.productsService.getCategories();

    this.filtersForm = new FormGroup({
      price: new FormControl(''),
      stock: new FormControl(''),
      category: new FormControl('')
    });

    this.authService.getUser()
      .pipe(
        switchMap((client: User) => {
          this.currClient = client;
          return this.cartService.getOrders(client);
        })
        )
      .subscribe((order: Order) => {
        this.currOrder = order;
      });
    }

  public getFilteredProducts(): void {

    const filter: { [key: string]: number | string } = {};
    const params: { [key: string]: number | string } = this.filtersForm.value;
    Object.keys(params)
      .filter((item: number | string) => params[item])
      .forEach((item: number | string) => filter[item] = params[item]);

    this.products$ = this.productsService.getAllProducts(filter);
  }

  public onResetFilters(): void {
    this.filtersForm.reset();
    this.products$ = this.productsService.getAllProducts();
  }

  public onAddToCart(product: Product, evt: any): void {    
    if (evt && product) {
      evt.stopPropagation();
      
      if (!!this.currOrder) {
        this.cartService.updateOrder({ quantity: 1, product: product }, this.currOrder, false)
        .subscribe((res: any) => {
        });
        
        return;
      }

      this.cartService.createOrder(
        this.currClient,
        { quantity: 1, product: product }
        )
      .subscribe(res => {
        console.log('order created');
      });
    }
  }
}