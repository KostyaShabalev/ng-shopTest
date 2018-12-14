import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Product } from '../models/product.model';
import { ProductsFilter } from '../models/';
import { environment } from '../../environments/environment';
import { Category } from '../models/category';
import { NotificationService } from '../services/notification.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private httpClient: HttpClient,
    private notify: NotificationService,
  ) { }

  getAllProducts(filter?: any): Observable<Product[]> {
    if (filter) {
      let params: HttpParams = new HttpParams();

      Object.entries(filter).forEach(([key, value]: any) => {
        if (value) {
          params = params.append(key, value);
        }
      });

      return this.httpClient.get<Product[]>(environment.api_url + '/products', { params }).pipe(
        map((data: any) => data['products'])
      );
    }

    return this.httpClient.get<Product[]>(environment.api_url + '/products').pipe(
      map((data: any) => data['products'])
    );
  }

  getProductById(id: string): Observable<Product> {
    return this.httpClient.get<Product[]>(environment.api_url + '/products/' + id, {}).pipe(
      map((data: any) => data['product'])
    );
  }

  createProduct(newProduct: Product): Observable<any> {
    return this.httpClient.post(environment.api_url + '/products', newProduct).pipe(
      tap((res: any) => this.notify.show('Product created.'))
    );
  }

  public getCategories(): Observable<any> {
    return this.httpClient.get<any>(environment.api_url + '/categories').pipe(
      map((data: any) => {
        const categories: string[] = data.categories
          .map((category: any) => category.title)
          .filter((category: string) => category);

          return categories;
      })
    );
  }

  createCategory(newCategory: Category): Observable<any> {
    return this.httpClient.post(environment.api_url + '/categories', newCategory);
  }
}
