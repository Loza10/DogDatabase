import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalControlReportComponent } from './animal-control-report.component';

describe('AnimalControlReportComponent', () => {
  let component: AnimalControlReportComponent;
  let fixture: ComponentFixture<AnimalControlReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimalControlReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimalControlReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
