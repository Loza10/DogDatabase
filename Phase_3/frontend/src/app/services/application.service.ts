import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Application } from '../models/application.model';
import { ApplicationAllDetails } from '../models/adoption-alldetails.model';
import { DogFees } from '../models/dog-fees.model';
import { AdoptionUpdate } from '../models/adoption-update.model';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

 private baseUrl = 'http://localhost:8080/application';
  
  constructor(private http: HttpClient) { }

  approveApplication(email: string, applicationDate: Date): Observable<any> {
    const encodedEmail = encodeURIComponent(email);
    const encodedDate = encodeURIComponent(applicationDate.toString());
    return this.http.post<any>(`${this.baseUrl}/approve/${encodedEmail}/${encodedDate}`, {});
  }

    rejectApplication(email: string, applicationDate: Date) {
      return this.http.delete(`${this.baseUrl}/reject/${email}/${applicationDate}`);
  }

  addApplication(application:Application){
    return this.http.post<any>(`${this.baseUrl}/add`,application);
  }

  searchApplication(lastName: string): Observable<Application[]>{
    return this.http.get<any>(`${this.baseUrl}/search/${lastName}`);
  }

  mostRecent(email: string): Observable<ApplicationAllDetails>{
    return this.http.get<any>(`${this.baseUrl}/recent/${email}`);
  }

  getDogFees(dogID: number): Observable<DogFees>{
    return this.http.get<any>(`${this.baseUrl}/fees/${dogID}`);
  }

  updateAdoption(adoptDetails: AdoptionUpdate){
      return this.http.post<any>(`${this.baseUrl}/change`, adoptDetails);
    }
}
