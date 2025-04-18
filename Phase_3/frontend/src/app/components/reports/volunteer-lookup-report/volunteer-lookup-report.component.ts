import { Component } from '@angular/core';
import { HeaderHomeComponent } from '../../parts/header-home/header-home.component';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { Volunteer } from '../../../models/volunteer';
import { ReportService } from '../../../services/report.service';
import { DogService } from '../../../services/dog.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-volunteer-lookup-report',
  imports: [RouterModule,TableModule, DialogModule],
  templateUrl: './volunteer-lookup-report.component.html',
  styleUrl: './volunteer-lookup-report.component.css'
})
export class VolunteerLookupReportComponent {
  report: Volunteer[] = [];
  nameMatch = "";
  availableSpace: number = 0;
  maxCapacty: number = 15;
  currentNumberOfDogs = 0;

  updateReport(event:any){
    this.nameMatch = (event.target as HTMLInputElement).value;
    this.reportService.getVolunteerLookup(this.nameMatch).subscribe(r => {
      this.report = r;
    });
  }

  constructor(private reportService: ReportService, private dogService: DogService) { }
    
      ngOnInit(): void { 
        this.dogService.getCurrentNumberOfDogs().subscribe(currentNumberOfDogs => {
          this.currentNumberOfDogs = currentNumberOfDogs;
          this.availableSpace = this.maxCapacty - currentNumberOfDogs;
        });

        this.reportService.getVolunteerLookup(this.nameMatch).subscribe(r => {
          this.report = r;
        });
      }
}
