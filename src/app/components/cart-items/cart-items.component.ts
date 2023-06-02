import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/appState';
import {
  DecrementCart,
  DeleteItem,
  GetTotal,
  IncrementCart,
} from 'src/app/state/cart/cart.action';

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.css'],
})
export class CartItemsComponent {
  constructor(private store: Store<AppState>) {}

  @Input() name: string | undefined;
  @Input() images: string | undefined;
  @Input() price: number | undefined;
  @Input() cartQuantity: number | undefined;
  @Input() _id: string | undefined;
  decrementCart(id: any) {
    this.store.dispatch(DecrementCart({ id }));
    this.store.dispatch(GetTotal());
  }
  incrementCart(id: any) {
    this.store.dispatch(IncrementCart({ id }));
    this.store.dispatch(GetTotal());
  }
  deleteItem(id: any) {
    this.store.dispatch(DeleteItem({ id }));
    this.store.dispatch(GetTotal());
  }
}
