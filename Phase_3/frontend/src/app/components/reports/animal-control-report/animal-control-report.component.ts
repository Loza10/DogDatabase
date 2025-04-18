import { Component } from '@angular/core';
import { HeaderHomeComponent } from '../../parts/header-home/header-home.component';
import { ACMainReport } from '../../../models/ac-main-report.model';
import { UserService } from '../../../services/user.service';
import { ReportService } from '../../../services/report.service';
import { TableModule } from 'primeng/table';
import { ACDrillAdopt } from '../../../models/ac-drill-adopt.model';
import { ACDrillExpense } from '../../../models/ac-drill-expense.model';
import { ACDrillSurrender } from '../../../models/ac-drill-surrender.model';
import { DialogModule } from 'primeng/dialog';
import { DrillAdoptComponent } from '../../popups/drill-adopt/drill-adopt.component';
import { DrillExpenseComponent } from '../../popups/drill-expense/drill-expense.component';
import { DrillSurrenderComponent } from '../../popups/drill-surrender/drill-surrender.component';
import { DogService } from '../../../services/dog.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-animal-control-report',
  imports: [RouterModule,TableModule, DialogModule, DrillAdoptComponent, DrillExpenseComponent, DrillSurrenderComponent, CommonModule],
  templateUrl: './animal-control-report.component.html',
  styleUrl: './animal-control-report.component.css'
})
export class AnimalControlReportComponent {
  report: ACMainReport[] = [];
  drillAdoptReport: ACDrillAdopt[] = [];
  drillSurrenderReport: ACDrillSurrender[] = [];
  drillExpenseReport: ACDrillExpense[] = [];
  adopt_popup_visible = false;
  expense_popup_visible = false;
  surrender_popup_visible = false;
  monthYear = "";
  availableSpace: number = 0;
  maxCapacty: number = 15;
  currentNumberOfDogs = 0;

  adoptClick(monthYear: string){
    this.monthYear = monthYear;
    this.reportService.getACDrillAdopt(monthYear).subscribe(r => {
      this.drillAdoptReport = r;
    });
    this.adopt_popup_visible = true;
  }

  surrenderClick(monthYear: string){
    this.monthYear = monthYear;
    this.reportService.getACDrillSurrender(monthYear).subscribe(r => {
      this.drillSurrenderReport = r;
    });
    this.surrender_popup_visible = true;
  }

  expenseClick(monthYear: string){
    this.monthYear = monthYear;
    this.reportService.getACDrillExpense(monthYear).subscribe(r => {
      this.drillExpenseReport = r;
    });
    this.expense_popup_visible = true;
  }

  closeAdoptClick=  () => {
    this.adopt_popup_visible = false;
  };
  
    constructor(private userService: UserService, private reportService: ReportService, private dogService: DogService) { }
  
    ngOnInit(): void {  
      this.dogService.getCurrentNumberOfDogs().subscribe(currentNumberOfDogs => {
        this.currentNumberOfDogs = currentNumberOfDogs;
        this.availableSpace = this.maxCapacty - currentNumberOfDogs;
      });
      this.reportService.getACMainReport().subscribe(r => {
        this.report = r;
      });
    }
}
