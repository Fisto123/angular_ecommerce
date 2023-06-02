import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, catchError, of, tap, throwError } from 'rxjs';
import { ProductModel } from 'src/app/model/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css'],
})
export class SingleProductComponent {
  @ViewChild('productElement', { static: true }) productElementRef!: ElementRef;

  _id!: any;
  cat!: string;
  products$!: Observable<ProductModel>;
  recommendedProd$!: Observable<ProductModel[]>;
  loading!: boolean;
  backendErr$!: string;

  constructor(
    private route: ActivatedRoute,
    private service: ProductsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProductId();
    this.getReccomdededProd();
    this.scrollToTop();
  }
  getProductId() {
    this.route.paramMap.subscribe((params) => {
      this._id = this.route.snapshot.paramMap.get('id');
      this.loading = true;
      this.service
        .getProductById(this._id)
        .pipe(
          tap((data: any) => {
            this.loading = false;
            this.products$ = data;
            this.cat = data.category;
          }),
          catchError((error) => {
            this.backendErr$ = error.error.message;
            if (this.backendErr$) {
              this.nav();
            }

            return throwError(error);
          })
        )
        .subscribe();
    });
  }
  getReccomdededProd() {
    this.service
      .getProductById(this._id)
      .pipe(
        tap((data: any) => {
          this.products$ = data;
          this.cat = data.category;
          this.service
            .getReccommended(this.cat)
            .pipe(
              tap((data: any) => {
                this.recommendedProd$ = of(data);
              })
            )
            .subscribe();
        })
      )
      .subscribe();
  }
  scrollToTop() {
    if (this.productElementRef) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
  nav() {
    this.router.navigate(['error']);
  }
}
