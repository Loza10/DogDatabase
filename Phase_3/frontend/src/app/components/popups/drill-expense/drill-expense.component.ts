import { Component, Input } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { ACDrillExpense } from '../../../models/ac-drill-expense.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-drill-expense',
  imports: [TableModule, DialogModule, CommonModule],
  templateUrl: './drill-expense.component.html',
  styleUrl: './drill-expense.component.css'
})
export class DrillExpenseComponent {
  @Input() drillExpenseReport: ACDrillExpense[] = [];
  @Input() monthYear: string = "";
}
