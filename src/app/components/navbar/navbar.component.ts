import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/appState';
import { getCarts } from 'src/app/state/cart/cart.selector';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  count!: number;
  constructor(private store: Store<AppState>) {}
  ngOnInit(): void {
    this.store.select(getCarts).subscribe((data) => {
      this.count = data.length;
    });
  }
}
