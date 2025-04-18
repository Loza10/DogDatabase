import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header-home',
  imports: [MenubarModule, CommonModule, RouterModule],
  templateUrl: './header-home.component.html',
  styleUrl: './header-home.component.css'
})
export class HeaderHomeComponent implements OnInit, OnChanges, OnDestroy {

  isDirector: boolean = false;

  header_items: MenuItem[] = [];

  private userSubscription: Subscription | null = null;

  @Input() maxCapacityReached: number = 0;

  constructor(private router: Router, private userService: UserService) { }
  ngOnInit() {
    
   this.userSubscription = this.userService.user$.subscribe(user => {
      this.isDirector = Boolean(user?.director);
      console.log(`User is ${user ? JSON.stringify(user) : 'null'} and director value is ${this.isDirector}`);
      this.populateMenuItems();
    });
  }

    ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
      }
    }
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes['maxCapacityReached']) {
      this.populateMenuItems();
    }
  } 

  populateMenuItems() {
    this.header_items = [ 
      { 
        label: "Add Dog", 
        icon: "pi pi-plus",
        route: "/add-dog",
        visible: this.maxCapacityReached <= 0 ? false : true
      }, 
      { 
        label: "Add Adoption Application", 
        icon: "pi pi-plus",
        route: "/add-adoption"
      }, 
      { 
        label: "Adoption Application Review", 
        icon: "pi pi-search",
        route: "/adoption-review",
        visible: this.isDirector
      }, 
      { 
          label: "Reports", 
          icon: "pi pi-file",
          visible: this.isDirector,
          items: [
            { 
              label: "Animal Control Report", 
              route: "/reports/animal-control"
            }, 
            { 
              label: "Monthly Adoption Report", 
              route: "/reports/monthly-adoptions"
            },
            { 
              label: "Expense Analysis", 
              route: "/reports/expense-analysis"
            }, 
            { 
              label: "Volunteer Lookup", 
              route: "/reports/volunteer-lookup"
            },
            { 
              label: "Volunteer Birthdays", 
              route: "/reports/volunteer-birthdays"
            }
          ]
      },
      { 
        label: "Sign out", 
        icon: "pi pi-sign-out",
        style: {'margin-left': 'auto'},
        command: () => this.signOut()
      }] 
  }

  signOut() {
    this.userService.clearUser();
    this.router.navigate(['/login']);
  }
}