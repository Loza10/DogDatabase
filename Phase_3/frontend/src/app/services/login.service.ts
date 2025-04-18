import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  verifyUser(loginRequest: any): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/user/login`, loginRequest);
  }
}
