import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptionSearchComponent } from './adoption-search.component';

describe('AdoptionSearchComponent', () => {
  let component: AdoptionSearchComponent;
  let fixture: ComponentFixture<AdoptionSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdoptionSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdoptionSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
