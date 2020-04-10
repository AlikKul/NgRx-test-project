import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEditContainerComponent } from './user-edit-container.component';

describe('UserEditContainerComponent', () => {
  let component: UserEditContainerComponent;
  let fixture: ComponentFixture<UserEditContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserEditContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEditContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
