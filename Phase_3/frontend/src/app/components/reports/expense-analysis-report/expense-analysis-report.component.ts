import { Component, OnInit } from '@angular/core';
import { HeaderHomeComponent } from '../../parts/header-home/header-home.component';
import { TableModule } from 'primeng/table';
import { ReportService } from '../../../services/report.service';
import { ExpenseAnalysisReport } from '../../../models/expense-analysis-report.model';
import { DogService } from '../../../services/dog.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-expense-analysis-report',
  imports: [RouterModule, TableModule,CommonModule],
  templateUrl: './expense-analysis-report.component.html',
  styleUrl: './expense-analysis-report.component.css'
})
export class ExpenseAnalysisReportComponent implements OnInit {

  constructor(private reportService: ReportService, private dogService: DogService) { }
  availableSpace: number = 0;
  maxCapacty: number = 15;
  currentNumberOfDogs = 0;

  reportEntries: ExpenseAnalysisReport[] = [];
  
  ngOnInit(): void {
    this.dogService.getCurrentNumberOfDogs().subscribe(currentNumberOfDogs => {
      this.currentNumberOfDogs = currentNumberOfDogs;
      this.availableSpace = this.maxCapacty - currentNumberOfDogs;
    });
    this.reportService.getExpenseAnalysisReport()
      .subscribe({
        next: (data) => {
          this.reportEntries = data;
          console.log(data);
        },
        error: (error) => {
          console.error('Error fetching report data:', error);
        }
      });
  }
}
