import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightProductComponent } from './right-product.component';

describe('RightProductComponent', () => {
  let component: RightProductComponent;
  let fixture: ComponentFixture<RightProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RightProductComponent]
    });
    fixture = TestBed.createComponent(RightProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
