import { Routes } from '@angular/router';
import { LoginComponent } from './components/main-pages/login/login.component';
import { DogDashboardComponent } from './components/main-pages/dog-dashboard/dog-dashboard.component';
import { AddDogComponent } from './components/main-pages/add-dog/add-dog.component';
import { AddAdoptionComponent } from './components/main-pages/add-adoption/add-adoption.component';
import { AdoptionReviewComponent } from './components/main-pages/adoption-review/adoption-review.component';
import { AnimalControlReportComponent } from './components/reports/animal-control-report/animal-control-report.component';
import { MonthlyAdoptionReportComponent } from './components/reports/monthly-adoption-report/monthly-adoption-report.component';
import { ExpenseAnalysisReportComponent } from './components/reports/expense-analysis-report/expense-analysis-report.component';
import { VolunteerLookupReportComponent } from './components/reports/volunteer-lookup-report/volunteer-lookup-report.component';
import { VolunteerBdayReportComponent } from './components/reports/volunteer-bday-report/volunteer-bday-report.component';
import { AddExpenseComponent } from './components/popups/add-expense/add-expense.component';
import { DogDetailsComponent } from './components/main-pages/dog-details/dog-details.component';
import { AdoptionSearchComponent } from './components/main-pages/adoption-search/adoption-search.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'dog-dashboard', component: DogDashboardComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'reports', redirectTo: '/dog-dashboard', pathMatch: 'full' },
    { path: 'add-dog', component: AddDogComponent },
    { path: 'add-adoption', component: AddAdoptionComponent },
    { path: 'adoption-review', component: AdoptionReviewComponent },
    { path: 'reports/animal-control', component: AnimalControlReportComponent},
    { path: 'reports/monthly-adoptions', component: MonthlyAdoptionReportComponent },
    { path: 'reports/expense-analysis', component: ExpenseAnalysisReportComponent },
    { path: 'reports/volunteer-lookup', component: VolunteerLookupReportComponent },
    { path: 'reports/volunteer-birthdays', component: VolunteerBdayReportComponent },
    { path: 'dog-details/:dogid', component: DogDetailsComponent },
    { path: 'adopt/:dogid', component: AdoptionSearchComponent }
];
