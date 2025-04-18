import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dog } from '../models/dog.model';

@Injectable({
  providedIn: 'root'
})
export class DogService {

  private baseUrl = 'http://localhost:8080';
  
  constructor(private http: HttpClient) { }

  getCurrentNumberOfDogs() : Observable<number> {
     return this.http.get<number>(`${this.baseUrl}/dog/currentNumberOfDogs`);
  }

  getDogs(): Observable<Dog[]>{
    return this.http.get<Dog[]>(`${this.baseUrl}/dog`,);
  }
}
