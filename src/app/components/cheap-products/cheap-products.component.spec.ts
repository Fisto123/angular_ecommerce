import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheapProductsComponent } from './cheap-products.component';

describe('CheapProductsComponent', () => {
  let component: CheapProductsComponent;
  let fixture: ComponentFixture<CheapProductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheapProductsComponent]
    });
    fixture = TestBed.createComponent(CheapProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
