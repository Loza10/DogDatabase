import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrillAdoptComponent } from './drill-adopt.component';

describe('DrillAdoptComponent', () => {
  let component: DrillAdoptComponent;
  let fixture: ComponentFixture<DrillAdoptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrillAdoptComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrillAdoptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
