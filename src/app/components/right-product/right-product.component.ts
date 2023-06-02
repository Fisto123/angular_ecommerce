import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { ProductModel } from 'src/app/model/product';
import { addToCart } from 'src/app/state/cart/cart.action';
import { cartState } from 'src/app/state/cart/cart.state';

@Component({
  selector: 'app-right-product',
  templateUrl: './right-product.component.html',
  styleUrls: ['./right-product.component.css'],
})
export class RightProductComponent {
  cartQuantity: number = 1;
  message!: string;
  @Input() SingleProduct: any | undefined;
  @Input() loading: any;

  constructor(private store: Store<cartState>, private toastr: ToastrService) {}
  increment() {
    this.cartQuantity++;
  }
  decrement() {
    if (this.cartQuantity > 1) {
      this.cartQuantity--;
    }
  }
  addToCart(products: ProductModel, cartQuantity: number) {
    this.store.dispatch(addToCart({ products, cartQuantity }));
    this.toastr.success(
      ` ${cartQuantity} quantity(s) of ${products.name}` + 'added'
    );
  }
}
