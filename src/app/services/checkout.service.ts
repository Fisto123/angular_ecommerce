import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  constructor(private http: HttpClient) {}
  makePayment(stripeToken: any, amount: number): Observable<any> {
    const url =
      'https://orion-commerce.onrender.com/api/stripe/initialize-payment';
    return this.http.post<any>(url, { token: stripeToken, amount: amount });
  }
}
