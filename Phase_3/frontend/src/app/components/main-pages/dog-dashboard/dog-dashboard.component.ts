import { Component, OnInit, SimpleChanges } from '@angular/core';
import { HeaderHomeComponent } from '../../parts/header-home/header-home.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { BadgeModule } from 'primeng/badge';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';
import { DogService } from '../../../services/dog.service';
import { Dog } from '../../../models/dog.model';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dog-dashboard',
  imports: [HeaderHomeComponent, TableModule, ButtonModule, RouterLink, BadgeModule, OverlayBadgeModule, SelectModule, FormsModule],
  templateUrl: './dog-dashboard.component.html',
  styleUrl: './dog-dashboard.component.css'
})

export class DogDashboardComponent implements OnInit {

  user: User | null = null;

  availableSpace: number = 0;

  displayAddDog: boolean = true;

  maxCapacty: number = 15;
  
  currentNumberOfDogs = 0

  dogs: Dog[] = [];

  statuses!: any[];

  constructor(private userService: UserService, private dogService: DogService) { }

  ngOnInit(): void {

    this.userService.user$.subscribe(user => {
      this.user = user
    });

    this.dogService.getCurrentNumberOfDogs().subscribe(currentNumberOfDogs => {
      this.currentNumberOfDogs = currentNumberOfDogs;
      this.availableSpace = this.maxCapacty - currentNumberOfDogs;
    });

    this.dogService.getDogs().subscribe(dogs => {
      this.dogs = dogs;
    });

     this.statuses = [
            { label: 'Adopted', value: 'Adopted' },
            { label: 'Adoptable', value: 'Adoptable' },
            { label: 'Not Adoptable', value: 'Not Adoptable' }
        ];
  }
}
