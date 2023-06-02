import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/appState';
import { ProductModel } from 'src/app/model/product';
import { FetchProduct } from 'src/app/state/product/product.action';
import { getLoading, getProduct } from 'src/app/state/product/product.selector';

@Component({
  selector: 'app-arrival',
  templateUrl: './arrival.component.html',
  styleUrls: ['./arrival.component.css'],
})
export class ArrivalComponent {
  products$!: Observable<ProductModel[]>;
  loading$!: Observable<boolean>;

  products: any[] = [];

  responsiveOptions!: any[];
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(FetchProduct());
    this.products$ = this.store.select(getProduct);
    this.loading$ = this.store.select(getLoading);

    this.products$.subscribe((data: any[]) => {
      this.products = data;
    });
    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1,
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }
}
