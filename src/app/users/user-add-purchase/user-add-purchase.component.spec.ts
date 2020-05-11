import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAddPurchaseComponent } from './user-add-purchase.component';

describe('UserAddPurchaseComponent', () => {
  let component: UserAddPurchaseComponent;
  let fixture: ComponentFixture<UserAddPurchaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAddPurchaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAddPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
