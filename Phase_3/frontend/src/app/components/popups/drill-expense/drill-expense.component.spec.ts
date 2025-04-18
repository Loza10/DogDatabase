import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrillExpenseComponent } from './drill-expense.component';

describe('DrillExpenseComponent', () => {
  let component: DrillExpenseComponent;
  let fixture: ComponentFixture<DrillExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrillExpenseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrillExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
