import { Component, OnInit } from '@angular/core';
import { HeaderHomeComponent } from '../../parts/header-home/header-home.component';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { AdoptionReviewReport } from '../../../models/adoption-review.report.model';
import { ReportService } from '../../../services/report.service';
import { ApplicationService } from '../../../services/application.service';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { DogService } from '../../../services/dog.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-adoption-review',
  imports: [RouterModule, FormsModule, TableModule, ButtonModule, MessagesModule],
  providers: [MessageService],
  templateUrl: './adoption-review.component.html',
  styleUrl: './adoption-review.component.css'
})
export class AdoptionReviewComponent implements OnInit {

  report: AdoptionReviewReport[] = [];

  constructor(private reportService: ReportService, private applicationService: ApplicationService, private messageService: MessageService, private dogService: DogService) { }
  availableSpace: number = 0;
  maxCapacty: number = 15;
  currentNumberOfDogs = 0;
  ngOnInit(): void {
    this.retrieveApplications();

    this.dogService.getCurrentNumberOfDogs().subscribe(currentNumberOfDogs => {
      this.currentNumberOfDogs = currentNumberOfDogs;
      this.availableSpace = this.maxCapacty - currentNumberOfDogs;
    });
  }

  approveApplication(email: string, applicationDate:Date) {
    this.applicationService.approveApplication(email, applicationDate).subscribe(response => {
      this.retrieveApplications();
      this.messageService.clear();
      this.messageService.add({text:"Approved application", severity:'success'})
    });
  }

  rejectApplication(email:string, date:Date) {
    this.applicationService.rejectApplication(email, date).subscribe(response => {
      this.retrieveApplications();
      this.messageService.clear();
      this.messageService.add({text:"Rejected application", severity:'success'})
    });
  }
  
  retrieveApplications() {
    this.reportService.getAdoptionReview().subscribe(report => {
      this.report = report;
    });
  }

}
