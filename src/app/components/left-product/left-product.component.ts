import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-left-product',
  templateUrl: './left-product.component.html',
  styleUrls: ['./left-product.component.css'],
})
export class LeftProductComponent {
  @Input() images: any | undefined;
  @Input() loading: any;
}
