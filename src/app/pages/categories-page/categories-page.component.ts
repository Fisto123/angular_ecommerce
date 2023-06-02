import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, catchError, of, tap, throwError } from 'rxjs';
import { ProductModel } from 'src/app/model/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.css'],
})
export class CategoriesPageComponent {
  price!: any;
  selectedValue: string = '';
  paramValue!: any;
  error$: any = '';
  products$!: Observable<ProductModel[]>;
  productsLen!: number;

  constructor(
    private service: ProductsService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.price = {
      min: '',
      max: '',
    };
    this.selectedValue = 'createdAt';
    this.route.paramMap.subscribe((params) => {
      this.paramValue = params.get('cat');
    });
    this.updateForm();
  }
  setSort(event: Event) {
    this.selectedValue = (event.target as HTMLSelectElement).value;
    this.logSelectedValue();
    this.updateForm();
  }

  updateForm() {
    this.logSelectedValue();

    this.service
      .getByCat(
        this.paramValue,
        this.price.min,
        this.price.max,
        this.selectedValue
      )
      .pipe(
        tap((data: any) => {
          this.products$ = of(data);
          this.productsLen = data.length;
          this.error$ = null;
        }),
        catchError((error) => {
          this.error$ = error.error.message;
          return throwError(error);
        })
      )
      .subscribe();
  }

  logSelectedValue() {
    return (this.selectedValue = this.selectedValue || 'createdAt');
  }
}
