import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAddPurchaseContainerComponent } from './user-add-purchase-container.component';

describe('UserAddPurchaseContainerComponent', () => {
  let component: UserAddPurchaseContainerComponent;
  let fixture: ComponentFixture<UserAddPurchaseContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAddPurchaseContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAddPurchaseContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
