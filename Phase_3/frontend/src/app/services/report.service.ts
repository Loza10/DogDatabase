import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MonthlyAdoptionReport } from '../models/monthly-adoption-report.model';
import { ACMainReport } from '../models/ac-main-report.model';
import { ACDrillAdopt } from '../models/ac-drill-adopt.model';
import { ACDrillExpense } from '../models/ac-drill-expense.model';
import { ACDrillSurrender } from '../models/ac-drill-surrender.model';
import { Volunteer } from '../models/volunteer';
import { ExpenseAnalysisReport } from '../models/expense-analysis-report.model';
import { AdoptionReviewReport } from '../models/adoption-review.report.model';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

 private baseUrl = 'http://localhost:8080/report';
 
  constructor(private http: HttpClient) { }
 
   getMonthlyAdoptionReport(): Observable<MonthlyAdoptionReport[]> {
     return this.http.get<MonthlyAdoptionReport[]>(`${this.baseUrl}/monthly-adoption`);
   }

   getExpenseAnalysisReport(): Observable<ExpenseAnalysisReport[]> {
    return this.http.get<ExpenseAnalysisReport[]>(`${this.baseUrl}/expense-analysis`);
  }

   getACMainReport(): Observable<ACMainReport[]> {
    return this.http.get<ACMainReport[]>(`${this.baseUrl}/ac-main-report`);
  }

  getACDrillAdopt(monthYear: any): Observable<ACDrillAdopt[]> {
    return this.http.get<ACDrillAdopt[]>(`${this.baseUrl}/ac-drill-adopt/${monthYear}`);
  }

  getACDrillExpense(monthYear: any): Observable<ACDrillExpense[]> {
    return this.http.get<ACDrillExpense[]>(`${this.baseUrl}/ac-drill-expense/${monthYear}`);
  }

  getACDrillSurrender(monthYear: any): Observable<ACDrillSurrender[]> {
    return this.http.get<ACDrillSurrender[]>(`${this.baseUrl}/ac-drill-surrender/${monthYear}`);
  }

  getVolunteerLookup(name: any): Observable<Volunteer[]> {
    return this.http.get<Volunteer[]>(`${this.baseUrl}/volunteer/${name}`);
  }

  getVolunteerBirthdayReport(month?: string, year?: string): Observable<Volunteer[]> {
    return this.http.get<Volunteer[]>(`${this.baseUrl}/volunteer-birthday/${month}/${year}`);
  }

  getAdoptionReview(): Observable<AdoptionReviewReport[]>{
    return this.http.get<AdoptionReviewReport[]>(`${this.baseUrl}/adoption-review`);
  }

}
