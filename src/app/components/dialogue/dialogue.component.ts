import { Component, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/appState';
import { FormDatas } from 'src/app/model/product';
import {
  EditOrderInfo,
  PostUserDetails,
} from 'src/app/state/order/order.actions';
import { getOrders } from 'src/app/state/order/order.selector';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-dialogue',
  templateUrl: './dialogue.component.html',
  styleUrls: ['./dialogue.component.css'],
})
export class DialogueComponent {
  dataForm!: FormData;
  myForm!: FormGroup;
  newUUID!: string;
  params!: string;
  constructor(
    public fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.params = data.params;
    console.log(this.params);
  }

  @Input() isClicked: any | undefined;

  visible!: boolean;
  ngOnInit(): void {
    this.reactiveForm();
    this.getVal();
  }
  reactiveForm() {
    this.myForm = this.fb.group({
      username: [
        this.params === 'order'
          ? this.params
          : this.params === 'cart'
          ? 'cart'
          : '',
        [Validators.required],
      ],
      email: ['', [Validators.required]],
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]],
    });
  }
  get fc() {
    return this.myForm.controls;
  }

  showDialog() {
    this.visible = true;
  }

  submitForm(values: FormDatas) {
    if (this.params === 'cart') {
      this.newUUID = uuidv4();
      let orders = {
        ...values,
        orderId: this.newUUID,
      };
      this.store.dispatch(PostUserDetails({ orders }));
      this.nav();
    } else if (this.params === 'order') {
      this.store.dispatch(EditOrderInfo({ values }));
    }
  }
  nav() {
    this.router.navigate(['order']);
  }
  getVal() {
    this.store.select(getOrders).subscribe((data: any) => {
      if (data && this.params === 'order') {
        this.myForm.patchValue({
          username: data.username,
          email: data.email,
          firstname: data.firstname,
          lastname: data.lastname,
          phone: data.phone,
          address: data.address,
        });
      } else if (this.params === 'cart') {
        this.myForm.patchValue({
          username: '',
          email: '',
          firstname: '',
          lastname: '',
          phone: '',
          address: '',
        });
      }
    });
  }
}
