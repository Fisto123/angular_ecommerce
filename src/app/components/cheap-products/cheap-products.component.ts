import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, filter, map, of } from 'rxjs';
import { AppState } from 'src/app/appState';
import { ProductModel } from 'src/app/model/product';
import { FilterProduct } from 'src/app/state/product/product.action';
import {
  getFilteredProd,
} from 'src/app/state/product/product.selector';

@Component({
  selector: 'app-cheap-products',
  templateUrl: './cheap-products.component.html',
  styleUrls: ['./cheap-products.component.css'],
})
export class CheapProductsComponent {
  products!: Observable<ProductModel[]>;
  loading$!: Observable<boolean>;
  filteredProducts$!: any;

  responsiveOptions!: any[];
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.applyFilter();
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

  applyFilter() {
    this.store.dispatch(FilterProduct());
    this.store.select(getFilteredProd).subscribe((data) => {
      this.filteredProducts$ = data;
    });
  }
}
