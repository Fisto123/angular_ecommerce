import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  FetchProduct,
  FetchProductByCat,
  FetchProductCatInit,
  FetchProductError,
  FetchProductSuccess,
} from 'src/app/state/product/product.action';
import { map, catchError, mergeMap, of, switchMap, throwError } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';
import { orderModelDB } from 'src/app/model/order';
import {
  postOrder,
  postOrderFailure,
  postOrderSuccess,
} from 'src/app/state/order/order.actions';

@Injectable({
  providedIn: 'root',
})
export class ProductsEffects {
  constructor(private action$: Actions, private service: ProductsService) {}
  loadProducts$ = createEffect(() =>
    this.action$.pipe(
      ofType(FetchProduct),
      mergeMap(() =>
        this.service.get().pipe(
          map((data) => {
            return FetchProductSuccess({ product: data });
          }),
          catchError((error) => of(FetchProductError({ error })))
        )
      )
    )
  );
  postUserOrders$ = createEffect(() =>
    this.action$.pipe(
      ofType(postOrder),
      switchMap((action) => {
        return this.service.postUserOrder(action.orders).pipe(
          map((data) => {
            return postOrderSuccess({ orders: data });
          }),
          catchError((error) => {
            return of(postOrderFailure({ error: error.status }));
          })
        );
      })
    )
  );
}
