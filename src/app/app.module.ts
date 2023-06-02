import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { BlackComponent } from './components/black/black.component';
import { CardComponent } from './components/card/card.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { DealComponent } from './components/deal/deal.component';
import { HeroComponent } from './components/hero/hero.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ReccommendedComponent } from './components/reccommended/reccommended.component';
import { MatCardModule } from '@angular/material/card';
import { StoreModule } from '@ngrx/store';
import { appReducer } from './appState';
import { ProductsEffects } from './effects/products/products.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ArrivalComponent } from './components/arrival/arrival.component';
import { CarouselModule } from 'primeng/carousel';
import { CategoriesPageComponent } from './pages/categories-page/categories-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SingleProductComponent } from './pages/single-product/single-product.component';
import { LeftProductComponent } from './components/left-product/left-product.component';
import { RightProductComponent } from './components/right-product/right-product.component';
import { AccordionComponent } from './components/accordion/accordion.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CartComponent } from './pages/cart/cart.component';
import { CartItemsComponent } from './components/cart-items/cart-items.component';
import { ToastrModule } from 'ngx-toastr';
import { localStorageSync } from 'ngrx-store-localstorage';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ErrorComponent } from './components/error/error.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogueComponent } from './components/dialogue/dialogue.component';
import { OrderComponent } from './pages/order/order.component';
import { CheapProductsComponent } from './components/cheap-products/cheap-products.component';
import { NgxStripeModule } from 'ngx-stripe';
import { SuccessComponent } from './pages/success/success.component';
import { FailureComponent } from './pages/failure/failure.component';

export function localStorageSyncReducer(reducer: any): any {
  return localStorageSync({
    keys: ['products', 'cart', 'order'],
    rehydrate: true,
  })(reducer);
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BlackComponent,
    CardComponent,
    CategoriesComponent,
    DealComponent,
    HeroComponent,
    NavbarComponent,
    ReccommendedComponent,
    ArrivalComponent,
    CategoriesPageComponent,
    SingleProductComponent,
    LeftProductComponent,
    RightProductComponent,
    AccordionComponent,
    CartComponent,
    CartItemsComponent,
    ErrorComponent,
    DialogueComponent,
    OrderComponent,
    CheapProductsComponent,
    SuccessComponent,
    FailureComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Add this line

  imports: [
    BrowserModule,
    ProgressSpinnerModule,
    NgxStripeModule.forRoot(
      'pk_test_51LMTFCBggtccEOr5RBa95aanLRgYIUD2URMfHVUMcxSw4BK0e4GtPJXYWkSjD1Yt6eqxrcYFT7iOFvBtRe4LeSV600eGfkY2Nl'
    ),
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    ToastrModule.forRoot(),
    SlickCarouselModule,
    FormsModule,
    CarouselModule,
    BrowserAnimationsModule,
    MatCardModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatExpansionModule,
    StoreModule.forRoot(appReducer, {
      metaReducers: [localStorageSyncReducer],
    }),
    EffectsModule.forRoot([ProductsEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: false,
      autoPause: true,
      features: {
        pause: false,
        lock: true,
        persist: true,
      },
    }),
  ],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
