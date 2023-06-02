import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { orderModel, orderModelDB } from 'src/app/model/order';
import { DeleteOrder, postOrder } from 'src/app/state/order/order.actions';
import { getOrders } from 'src/app/state/order/order.selector';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogueComponent } from 'src/app/components/dialogue/dialogue.component';
import { Location } from '@angular/common';
import { getTotalAmount } from 'src/app/state/cart/cart.selector';
import { getCarts } from 'src/app/state/cart/cart.selector';
import { ClearCart } from 'src/app/state/cart/cart.action';
import { Router } from '@angular/router';
import { CheckoutService } from 'src/app/services/checkout.service';
import { SendMailsService } from 'src/app/services/send-mails.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent {
  order!: orderModel;
  getParamVal!: string;
  orderLength!: number;
  subtotal!: number;
  carts!: any;
  paymentHandler: any = null;
  success!: boolean;
  failure!: boolean;

  constructor(
    private store: Store,
    private dialog: MatDialog,
    private location: Location,
    private router: Router,
    private checkoutService: CheckoutService,
    private emailService: SendMailsService
  ) {}
  ngOnInit(): void {
    this.getOrders();
    this.getLocation();
    this.getCartTotalAmount();
    this.getCarts();
    this.invokeStripe();
  }

  getOrders() {
    this.store.select(getOrders).subscribe((data: any) => {
      this.order = data;
      this.orderLength = data.length;
    });
  }
  deleteOrder() {
    this.store.dispatch(DeleteOrder());
    this.store.dispatch(ClearCart());
  }
  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      params: this.getParamVal,
    };
    dialogConfig.panelClass = 'dialog-center';
    this.dialog.open(DialogueComponent, dialogConfig);
  }
  getLocation() {
    const path = this.location.path();
    const value = path.substr(1);
    this.getParamVal = value;
  }
  getCartTotalAmount() {
    this.store.select(getTotalAmount).subscribe((data: any) => {
      this.subtotal = data;
    });
  }
  getCarts() {
    this.store.select(getCarts).subscribe((data: any) => {
      this.carts = data;
    });
  }
  openPaymentPopup(amount: number) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51LMTFCBggtccEOr5RBa95aanLRgYIUD2URMfHVUMcxSw4BK0e4GtPJXYWkSjD1Yt6eqxrcYFT7iOFvBtRe4LeSV600eGfkY2Nl',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken);
        paymentStripe(stripeToken, amount);
      },
    });
    const paymentStripe = (stripeToken: any, amount: number) => {
      this.checkoutService
        .makePayment(stripeToken, amount)
        .subscribe((data: any) => {
          if (data.data === 'success') {
            const orders: orderModelDB = {
              name: this.order.firstname + '' + this.order.lastname,
              email: this.order.email,
              orderId: this.order.orderId || '',
              address: this.order.address,
              shippingFee: 20,
              phone: this.order.phone,
              cartItems: this.carts,
              cartTotalAmount: this.subtotal,
            };
            this.store.dispatch(postOrder({ orders }));
            this.sendEmail();
            this.router.navigate(['success']);
            this.store.dispatch(ClearCart());
          } else {
            this.router.navigate(['failure']);
          }
        });
    };
    paymentHandler.open({
      name: 'Orion commerce',
      description: 'Product purchase',
      amount: amount * 100,
    });
  }
  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      (script.type = 'text/javascript'),
        (script.src = 'https://checkout.stripe.com/checkout.js');
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: '',
          locale: 'auto',
          token: function (stripeToken: any) {},
        });
      };
      window.document.body.appendChild(script);
    }
  }
  sendEmail(): void {
    const subject = 'Order details from orion commerce';
    this.getCarts();

    let text = `<h3 class='text-green-400 items-center mx-auto'>YOUR ORDERS WITH ORDERID(${this.order.orderId}) WAS PLACED SUCCESSFULLY</h3><ul>`;
    this.carts.forEach((order: any) => {
      text += `<li><strong>Product:</strong> ${order.name} * ${order.cartQuantity}</li>`;
      text += `<img class='w-[10px]' src=${order.images[0]}> </img>`;
    });
    text += `<h5><strong>Total Price:</strong> ${this.subtotal}</h5>`;
    text += '</ul>';
    this.emailService.sendEmail(this.order.email, subject, text).subscribe(
      () => {
        console.log('Email sent successfully');
      },
      (error) => {
        console.error('Failed to send email:', error);
      }
    );
  }
}
