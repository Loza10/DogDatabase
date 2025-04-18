import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrillSurrenderComponent } from './drill-surrender.component';

describe('DrillSurrenderComponent', () => {
  let component: DrillSurrenderComponent;
  let fixture: ComponentFixture<DrillSurrenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrillSurrenderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrillSurrenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
