import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinsReviewComponent } from './coins-review.component';

describe('CoinsReviewComponent', () => {
  let component: CoinsReviewComponent;
  let fixture: ComponentFixture<CoinsReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoinsReviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoinsReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
