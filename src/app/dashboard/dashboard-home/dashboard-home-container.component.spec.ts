import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardHomeContainerComponent } from './dashboard-home-container.component';

describe('DashboardHomeContainerComponent', () => {
  let component: DashboardHomeContainerComponent;
  let fixture: ComponentFixture<DashboardHomeContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardHomeContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardHomeContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
