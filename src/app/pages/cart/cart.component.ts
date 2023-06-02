import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/appState';
import { ClearCart, GetTotal } from 'src/app/state/cart/cart.action';
import { getCarts, getTotalAmount } from 'src/app/state/cart/cart.selector';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogueComponent } from 'src/app/components/dialogue/dialogue.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  carts$!: any;
  cartLength!: number;
  totalCartAmount!: number;
  isClicked: boolean = false;
  getParamVal!: string;

  constructor(
    private store: Store<AppState>,
    private dialog: MatDialog,
    private location: Location
  ) {}
  ngOnInit(): void {
    this.getCarts();
    this.getTotal();
    this.getLocation();
  }
  getCarts() {
    this.store.select(getCarts).subscribe((data: any) => {
      this.carts$ = data;
      this.cartLength = data.length;
    });
  }
  clearCart() {
    this.store.dispatch(ClearCart());
  }
  getTotal() {
    this.store.dispatch(GetTotal());
    this.store.select(getTotalAmount).subscribe((data) => {
      this.totalCartAmount = data;
    });
  }
  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      params: this.getParamVal,
      // Add more parameters as needed
    };
    dialogConfig.panelClass = 'dialog-center';
    this.dialog.open(DialogueComponent, dialogConfig);
  }
  getLocation() {
    const path = this.location.path();
    const value = path.substr(1);
    this.getParamVal = value;
  }
}
