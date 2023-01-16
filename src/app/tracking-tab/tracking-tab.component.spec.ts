import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackingTabComponent } from './tracking-tab.component';

describe('TrackingTabComponent', () => {
  let component: TrackingTabComponent;
  let fixture: ComponentFixture<TrackingTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackingTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackingTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
