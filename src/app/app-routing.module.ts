import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CategoriesPageComponent } from './pages/categories-page/categories-page.component';
import { SingleProductComponent } from './pages/single-product/single-product.component';
import { CartComponent } from './pages/cart/cart.component';
import { ErrorComponent } from './components/error/error.component';
import { OrderComponent } from './pages/order/order.component';
import { SuccessComponent } from './pages/success/success.component';
import { FailureComponent } from './pages/failure/failure.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'cat/:cat',
    component: CategoriesPageComponent,
  },
  {
    path: 'product/:id',
    component: SingleProductComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'error',
    component: ErrorComponent,
  },
  {
    path: 'order',
    component: OrderComponent,
  },
  {
    path: 'success',
    component: SuccessComponent,
  },
  {
    path: 'failure',
    component: FailureComponent,
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
