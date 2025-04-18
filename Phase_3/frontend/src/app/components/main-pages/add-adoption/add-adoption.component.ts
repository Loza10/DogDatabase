import { Component } from '@angular/core';
import { HeaderHomeComponent } from '../../parts/header-home/header-home.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Select } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DatePickerModule } from 'primeng/datepicker';
import { CardModule } from 'primeng/card';
import { Router } from '@angular/router';
import { ApplicationService } from '../../../services/application.service';
import { Application } from '../../../models/application.model';
import { DialogModule } from 'primeng/dialog';
import { BadgeModule } from 'primeng/badge';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { CommonModule } from '@angular/common';
import { DogService } from '../../../services/dog.service';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { UserService } from '../../../services/user.service';

interface Item {
  name: string;
  id: string;
}

@Component({
  selector: 'app-add-adoption',
  imports: [HeaderHomeComponent, MultiSelectModule, InputTextModule, FormsModule, ReactiveFormsModule, Select, 
  ButtonModule, CheckboxModule, DatePickerModule, CardModule,DialogModule, BadgeModule, OverlayBadgeModule, CommonModule, MessagesModule],
  providers:[MessageService],
  templateUrl: './add-adoption.component.html',
  styleUrl: './add-adoption.component.css'
})

export class AddAdoptionComponent {
  state_options !: Item[];
  addAdoptionForm !: FormGroup;
  confirm_popup_visible = false;
  availableSpace: number = 0;
  maxCapacty: number = 15;
  currentNumberOfDogs = 0;
  constructor(private router: Router, private applicationService: ApplicationService, private dogService: DogService,private messageService: MessageService,private userService: UserService) { }

  dogDashboardClick=  () => {
    this.confirm_popup_visible = false;
    this.router.navigate(["/dog-dashboard"]);
  }

  addAdoptionClick()
  {
    if (this.addAdoptionForm.valid) {
     this.userService.addAdopter({
        firstName: this.addAdoptionForm.get("name_first")?.value,
        lastName: this.addAdoptionForm.get("name_last")?.value,
        emailAddress: this.addAdoptionForm.get("email")?.value,
        city: this.addAdoptionForm.get("address_city")?.value,
        state: this.addAdoptionForm.get("address_state")?.value.id,
        street: this.addAdoptionForm.get("address_street")?.value,
        zip: this.addAdoptionForm.get("address_zip")?.value,
        householdSize: this.addAdoptionForm.get("household_size")?.value,
        phone: this.addAdoptionForm.get("phone")?.value,
        director: false,
        age:0
     })
       .subscribe({
            next: () => {
              this.confirm_popup_visible = true;
              //this.router.navigate(["/dog-dashboard"]);
            },
            error: (error) => {
              console.error('Error adding adopter:', error);
              const errorMessage = error.error?.message ||
                       error.error || 
                       error.statusText || 
                'Unknown error'; 
              this.messageService.clear();
              this.messageService.add({text:errorMessage, severity:'error'});
            }
          });
    }
    else {
      this.messageService.clear();
      this.messageService.add({ text: "Please enter all fields", severity: "error" });
    }
  };

  ngOnInit() {
    this.dogService.getCurrentNumberOfDogs().subscribe(currentNumberOfDogs => {
      this.currentNumberOfDogs = currentNumberOfDogs;
      this.availableSpace = this.maxCapacty - currentNumberOfDogs;
    });

    this.state_options = [
      {name: 'Alabama', id: 'AL'},{name: 'Alaska', id: 'AK'},{name: 'Arizona', id: 'AZ'},{name: 'Arkansas', id: 'AR'}, {name: 'California', id: 'CA'},
      {name: 'Colorado', id: 'CO'},{name: 'Connecticut', id: 'CT'},{name: 'Delaware', id: 'DE'},{name: 'Florida', id: 'FL'}, {name: 'Georgia', id: 'GA'},
      {name: 'Hawaii', id: 'HI'},{name: 'Idaho', id: 'ID'},{name: 'Illinois', id: 'IL'},{name: 'Indiana', id: 'IN'}, {name: 'Iowa', id: 'IA'},
      {name: 'Kansas', id: 'KS'},{name: 'Kentucky', id: 'KY'},{name: 'Louisiana', id: 'LA'},{name: 'Maine', id: 'ME'}, {name: 'Maryland', id: 'MD'},
      {name: 'Massachusetts', id: 'MA'},{name: 'Michigan', id: 'MI'},{name: 'Minnesota', id: 'MN'},{name: 'Mississippi', id: 'MS'}, {name: 'Missouri', id: 'MO'},
      {name: 'Montana', id: 'MT'},{name: 'Nebraska', id: 'NE'},{name: 'Nevada', id: 'NV'},{name: 'New Hampshire', id: 'NH'}, {name: 'New Jersey', id: 'NJ'},
      {name: 'New Mexico', id: 'NM'},{name: 'New York', id: 'NY'},{name: 'North Carolina', id: 'NC'},{name: 'North Dakota', id: 'ND'}, {name: 'Ohio', id: 'OH'},
      {name: 'Oklahoma', id: 'OK'},{name: 'Oregon', id: 'OR'},{name: 'Pennsylvania', id: 'PA'},{name: 'Rhode Island', id: 'RI'}, {name: 'South Carolina', id: 'SC'},
      {name: 'South Dakota', id: 'SD'},{name: 'Tennessee', id: 'TN'},{name: 'Texas', id: 'TX'},{name: 'Utah', id: 'UT'}, {name: 'Vermont', id: 'VT'},
      {name: 'Virginia', id: 'VA'},{name: 'Washington', id: 'WA'},{name: 'West Virginia', id: 'WV'},{name: 'Wisconsin', id: 'WI'}, {name: 'Wyoming', id: 'WY'},
    ];

    this.addAdoptionForm = new FormGroup({
      name_first: new FormControl('', [Validators.required]),
      name_last: new FormControl('', [Validators.required]),
      address_street: new FormControl('', [Validators.required]),
      address_city: new FormControl('', [Validators.required]),
      address_state: new FormControl(null, [Validators.required]),
      address_zip: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      household_size: new FormControl('', [Validators.required]),
      phone: new FormControl('',[Validators.required])
    });
  };
}
