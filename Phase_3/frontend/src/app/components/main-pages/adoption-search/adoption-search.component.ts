import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HeaderHomeComponent } from '../../parts/header-home/header-home.component';
import { Application } from '../../../models/application.model';
import { ApplicationService } from '../../../services/application.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { SelectModule } from 'primeng/select';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ApplicationAllDetails } from '../../../models/adoption-alldetails.model';
import { DogDetailsService } from '../../../services/dogdetails.service';
import { DogDetails } from '../../../models/dogdetails.model';
import { DogFees } from '../../../models/dog-fees.model';
import { DogService } from '../../../services/dog.service';
import { DatePickerModule } from 'primeng/datepicker';
import { AdoptionReviewReport } from '../../../models/adoption-review.report.model';
import { AdoptionUpdate } from '../../../models/adoption-update.model';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-adoption-search',
  imports: [HeaderHomeComponent, TableModule, ButtonModule, RouterLink, BadgeModule, OverlayBadgeModule, SelectModule, FormsModule, ReactiveFormsModule,DialogModule,DatePickerModule],
  templateUrl: './adoption-search.component.html',
  styleUrl: './adoption-search.component.css'
})

export class AdoptionSearchComponent {
  dogID = -1;
  apps: Application[] = [];
  route: ActivatedRoute = inject(ActivatedRoute);
  nameMatch = "";
  dogFees !: DogFees;
  chosenApp!: ApplicationAllDetails;
  adopt_info_popup_visible = false;
  availableSpace: number = 0;
  maxCapacty: number = 15;
  currentNumberOfDogs = 0;
  adopt_confirm_popup = false;
  decision_date = null;
  dateForm: any;
  adoptionUpdate !: AdoptionUpdate;
  dDateString = "";

  
  constructor(private router: Router, private applicationService: ApplicationService, private dogDetailsService: DogDetailsService, private dogService: DogService){
    this.dogID = Number(this.route.snapshot.params['dogid']);
  }

  updateReport(event:any){
    this.nameMatch = (event.target as HTMLInputElement).value;
    this.applicationService.searchApplication(this.nameMatch).subscribe(r => {
      this.apps = r;
    });
  }

  doAdoption(){
    this.dDateString = formatDate(this.dateForm.get("decision_date")?.value, 'yyyy-MM-dd', 'en-US');
    this.adopt_info_popup_visible = false;
    this.adopt_confirm_popup = true;
  }
  cancel(){
    this.adopt_confirm_popup = false;
  }
  confirmAdoption(){
    this.adoptionUpdate = {dogID:this.dogID, fee: this.dogFees.fee, isWaived: this.dogFees.isWaived, decisionDate: formatDate(this.dateForm.get("decision_date")?.value, 'yyyy-MM-dd', 'en-US'), email: this.chosenApp.email, date: this.chosenApp.applicationDate};
    this.applicationService.updateAdoption(this.adoptionUpdate).subscribe(details => {
      this.adopt_confirm_popup = false;
      this.router.navigate(['/dog-dashboard']);
    });
    console.log(this.adoptionUpdate);
    
  }

  ngOnInit(): void {
    this.applicationService.searchApplication("").subscribe(apps => {
      this.apps = apps;
    });

    this.dogService.getCurrentNumberOfDogs().subscribe(currentNumberOfDogs => {
      this.currentNumberOfDogs = currentNumberOfDogs;
      this.availableSpace = this.maxCapacty - currentNumberOfDogs;
    });

    this.dateForm = new FormGroup({
        decision_date: new FormControl<Date | null>(new Date()),
      });
  }

  adoptionClick=  (email: string) => {
    this.applicationService.mostRecent(email).subscribe(apps => {
        this.chosenApp = apps;
        console.log(this.chosenApp);
        this.applicationService.getDogFees(this.dogID).subscribe(apps => {
          this.dogFees = apps;
          console.log(this.dogFees);
          this.adopt_info_popup_visible = true;
        });
     });
    
  };
}
