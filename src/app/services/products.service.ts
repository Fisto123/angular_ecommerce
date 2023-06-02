import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductModel } from '../model/product';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';
import { orderModelDB } from '../model/order';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  secretKey: string =
    'sk_test_51LMTFCBggtccEOr5cZZ52IoXxorG12tPwZBVgUHDatCBNORFEQcvMatBGiMKQE5BhqmY8z5GP0NhdKyD3utpmJAS008CjK8RaP';
  stripe: any;

  constructor(private http: HttpClient) {
    this.loadStripe();
  }
  private async loadStripe() {
    const stripe = await import('@stripe/stripe-js');
    this.stripe = await stripe.loadStripe(environment.stripePublicKey);
  }
  get(): Observable<ProductModel> {
    return this.http.get<ProductModel>(
      `${environment.apiEndPoint}/api/product/getProduct`
    );
  }
  getByCat(
    category: string,
    min: number,
    max: number,
    sort: string
  ): Observable<ProductModel> {
    return this.http.get<ProductModel>(
      ` https://orion-commerce.onrender.com/api/product/getProductCat?cat=${category}&min=${min}&max=${max}&sort=${sort}`
    );
  }
  getProductById(id: number): Observable<ProductModel> {
    return this.http.get<ProductModel>(
      `${environment.apiEndPoint}/api/product/getProductId/${id}`
    );
  }
  getReccommended(cat: string): Observable<ProductModel> {
    return this.http.get<ProductModel>(
      `${environment.apiEndPoint}/api/product/getProductCat?cat=${cat}
`
    );
  }
  postUserOrder(orders: orderModelDB) {
    return this.http.post<orderModelDB>(
      `${environment.apiEndPoint}/api/order/createOrder`,
      orders
    );
  }
}
