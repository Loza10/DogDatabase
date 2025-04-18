import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyAdoptionReportComponent } from './monthly-adoption-report.component';

describe('MonthlyAdoptionReportComponent', () => {
  let component: MonthlyAdoptionReportComponent;
  let fixture: ComponentFixture<MonthlyAdoptionReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonthlyAdoptionReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthlyAdoptionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
