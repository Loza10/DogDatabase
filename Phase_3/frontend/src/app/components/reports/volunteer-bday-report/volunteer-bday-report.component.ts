import { Component, OnInit } from '@angular/core';
import { HeaderHomeComponent } from '../../parts/header-home/header-home.component';
import { Volunteer } from '../../../models/volunteer';
import { TableModule } from 'primeng/table';
import { ReportService } from '../../../services/report.service';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { DogService } from '../../../services/dog.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-volunteer-bday-report',
  imports: [RouterModule, TableModule, FormsModule, DropdownModule, ButtonModule],
  templateUrl: './volunteer-bday-report.component.html',
  styleUrl: './volunteer-bday-report.component.css'
})
export class VolunteerBdayReportComponent implements OnInit {

  volunteers: Volunteer[] = [];
  month?: string;
  year?: string;
  months: any[] = [];
  years: any[] = [];
  availableSpace: number = 0;
  maxCapacty: number = 15;
  currentNumberOfDogs = 0;
  
  constructor (private reportService: ReportService, private dogService: DogService){ }

  ngOnInit(): void {
    this.dogService.getCurrentNumberOfDogs().subscribe(currentNumberOfDogs => {
      this.currentNumberOfDogs = currentNumberOfDogs;
      this.availableSpace = this.maxCapacty - currentNumberOfDogs;
    });

    this.constructMonthDD();
    this.constructYears();
    this.getReport();
  }

  private constructMonthDD() {
      this.month = (new Date().getMonth() + 1).toString();
      this.months = [
      { name: 'January', value: '1' },
      { name: 'February', value: '2' },
      { name: 'March', value: '3' },
      { name: 'April', value: '4' },
      { name: 'May', value: '5' },
      { name: 'June', value: '6' },
      { name: 'July', value: '7' },
      { name: 'August', value: '8' },
      { name: 'September', value: '9' },
      { name: 'October', value: '10' },
      { name: 'November', value: '11' },
      { name: 'December', value: '12' }
      ];
    }
  
  private constructYears() {
    const currentYear = new Date().getFullYear();
    this.years = [
      { name: currentYear.toString(), value: currentYear.toString() },
      { name: (currentYear - 1).toString(), value: (currentYear - 1).toString() }
    ];
    this.year = currentYear.toString();
  }

  getReport() {
     this.reportService.getVolunteerBirthdayReport(this.month, this.year).subscribe(report => {
      this.volunteers = report;
    });
  }

  }

