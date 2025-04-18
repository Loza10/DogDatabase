import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteerLookupReportComponent } from './volunteer-lookup-report.component';

describe('VolunteerLookupReportComponent', () => {
  let component: VolunteerLookupReportComponent;
  let fixture: ComponentFixture<VolunteerLookupReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VolunteerLookupReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VolunteerLookupReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
