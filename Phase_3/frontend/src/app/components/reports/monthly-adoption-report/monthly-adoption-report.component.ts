import { Component, OnInit } from '@angular/core';
import { HeaderHomeComponent } from '../../parts/header-home/header-home.component';
import { TableModule } from 'primeng/table';
import { ReportService } from '../../../services/report.service';
import { MonthlyAdoptionReport } from '../../../models/monthly-adoption-report.model';
import { DogService } from '../../../services/dog.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-monthly-adoption-report',
  imports: [RouterModule,TableModule,CommonModule],
  templateUrl: './monthly-adoption-report.component.html',
  styleUrl: './monthly-adoption-report.component.css'
})
export class MonthlyAdoptionReportComponent implements OnInit {

  constructor(private reportService: ReportService, private dogService:DogService) { }
  availableSpace: number = 0;
  maxCapacty: number = 15;
  currentNumberOfDogs = 0;

  reportEntries: MonthlyAdoptionReport[] = [];
  
  ngOnInit(): void {
    this.dogService.getCurrentNumberOfDogs().subscribe(currentNumberOfDogs => {
      this.currentNumberOfDogs = currentNumberOfDogs;
      this.availableSpace = this.maxCapacty - currentNumberOfDogs;
    });
    this.reportService.getMonthlyAdoptionReport()
      .subscribe({
        next: (data) => {
          this.reportEntries = data;
        },
        error: (error) => {
          console.error('Error fetching report data:', error);
        }
      });
  }
}