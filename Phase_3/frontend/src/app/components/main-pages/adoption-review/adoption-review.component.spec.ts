import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptionReviewComponent } from './adoption-review.component';

describe('AdoptionReviewComponent', () => {
  let component: AdoptionReviewComponent;
  let fixture: ComponentFixture<AdoptionReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdoptionReviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdoptionReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
