import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/appState';
import { ProductModel } from 'src/app/model/product';
import { FetchProduct } from 'src/app/state/product/product.action';
import { getProduct } from 'src/app/state/product/product.selector';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent {
  catProducts$!: Observable<ProductModel[]>;
  constructor(private store: Store<AppState>) {}
  ngOnInit(): void {
    this.store.dispatch(FetchProduct());
    this.catProducts$ = this.store.select(getProduct);
    // this.reccomendedProducts$.subscribe((products) => console.log(products));
  }
}
