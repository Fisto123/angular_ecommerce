import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/appState';
import { ProductModel } from 'src/app/model/product';
import { FetchProduct } from 'src/app/state/product/product.action';
import { getLoading, getProduct } from 'src/app/state/product/product.selector';

@Component({
  selector: 'app-reccommended',
  templateUrl: './reccommended.component.html',
  styleUrls: ['./reccommended.component.css'],
})
export class ReccommendedComponent {
  reccomendedProducts$!: Observable<ProductModel[]>;
  loading!: boolean;
  constructor(private store: Store<AppState>) {}
  ngOnInit(): void {
    this.store.dispatch(FetchProduct());
    this.reccomendedProducts$ = this.store.select(getProduct);
    this.store.select(getLoading).subscribe((data) => {
      this.loading = data;
    });
    // this.reccomendedProducts$.subscribe((products) => console.log(products));
  }
}
