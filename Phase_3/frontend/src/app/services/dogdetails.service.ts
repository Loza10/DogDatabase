import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DogDetails } from '../models/dogdetails.model';
import { Expense } from '../models/expense.model';
import { Category } from '../models/category.model';
import {AddDog} from '../models/add-dog.model';
import { ExpenseDetails } from '../models/expense-details.model';

@Injectable({
  providedIn: 'root'
})
export class DogDetailsService {

  private baseUrl = 'http://localhost:8080';
  
  constructor(private http: HttpClient) { }

  getDetails(dogID: any): Observable<DogDetails> {
    return this.http.get<DogDetails>(`${this.baseUrl}/details/${dogID}`,);
  }
  updateDetails(dogID: any, dogdetails: DogDetails): Observable<DogDetails> {
    return this.http.put<DogDetails>(`${this.baseUrl}/details/${dogID}`, dogdetails);
  }

  addExpense(dogID:any, expense:Expense): Observable<Expense>{
    return this.http.post<Expense>(`${this.baseUrl}/details/${dogID}/expense`, expense);
  }

  getCategories(dogID:any): Observable<Category[]>{
    //return this.http.get<Category>(`${this.baseUrl}/details/1/category`);
    return this.http.get<Category[]>(`${this.baseUrl}/details/${dogID}/category`);
  }

  getExpenses(dogID:any): Observable<ExpenseDetails[]>{
    //return this.http.get<Category>(`${this.baseUrl}/details/1/category`);
    return this.http.get<ExpenseDetails[]>(`${this.baseUrl}/details/${dogID}/expense/get`);
  }

  addDog(addDog: AddDog): Observable<number>{
    return this.http.post<number>(`${this.baseUrl}/add-dog/add`, addDog);
  }
  
  addBreed(addDog: AddDog): Observable<AddDog>{
    return this.http.post<AddDog>(`${this.baseUrl}/add-dog/breed`, addDog);
  }

  addMC(addDog: AddDog): Observable<AddDog>{
    return this.http.post<AddDog>(`${this.baseUrl}/add-dog/microchip`, addDog);
  }

  getMaxDogID(): Observable<number>{
    return this.http.get<number>(`${this.baseUrl}/add-dog/maxID`);
  }
}
