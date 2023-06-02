import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftProductComponent } from './left-product.component';

describe('LeftProductComponent', () => {
  let component: LeftProductComponent;
  let fixture: ComponentFixture<LeftProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeftProductComponent]
    });
    fixture = TestBed.createComponent(LeftProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
