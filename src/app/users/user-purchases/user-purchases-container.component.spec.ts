import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPurchasesContainerComponent } from './user-purchases-container.component';

describe('UserPurchasesContainerComponent', () => {
  let component: UserPurchasesContainerComponent;
  let fixture: ComponentFixture<UserPurchasesContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPurchasesContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPurchasesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
