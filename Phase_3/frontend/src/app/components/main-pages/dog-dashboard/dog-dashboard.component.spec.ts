import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DogDashboardComponent } from './dog-dashboard.component';

describe('DogDashboardComponent', () => {
  let component: DogDashboardComponent;
  let fixture: ComponentFixture<DogDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DogDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DogDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
