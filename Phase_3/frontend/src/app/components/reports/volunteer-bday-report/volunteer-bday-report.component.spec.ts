import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteerBdayReportComponent } from './volunteer-bday-report.component';

describe('VolunteerBdayReportComponent', () => {
  let component: VolunteerBdayReportComponent;
  let fixture: ComponentFixture<VolunteerBdayReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VolunteerBdayReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VolunteerBdayReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
