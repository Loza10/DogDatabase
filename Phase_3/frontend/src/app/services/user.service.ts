import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Adopter } from '../models/adopter.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly USER_STORAGE_KEY = 'current_user';
  private userSubject = new BehaviorSubject<User | null>(null); // Initially null
  user$: Observable<User | null> = this.userSubject.asObservable();

  constructor(private router: Router, private httpClient: HttpClient) {

    const savedUser = this.getSavedUser();
    if (savedUser) {
      this.userSubject.next(savedUser);
    }
    else {
      this.router.navigate(['/login']);
    }
   }

  setUser(user: User): void {
    this.userSubject.next(user);

    localStorage.setItem(this.USER_STORAGE_KEY, JSON.stringify(user));
  }

  getUser(): User | null {
    return this.userSubject.value;
  }

  clearUser(): void {
    this.userSubject.next(null);
    localStorage.removeItem(this.USER_STORAGE_KEY);
  }

  private getSavedUser(): User | null {
    const userData = localStorage.getItem(this.USER_STORAGE_KEY);
    
    if (!userData) {
      return null;
    }
    
    try {
      return JSON.parse(userData) as User;
    } catch (error) {
      console.error('Error parsing stored user data', error);
      localStorage.removeItem(this.USER_STORAGE_KEY);
      return null;
    }
  }

  addAdopter(adopter: Adopter): Observable<any> {
    return this.httpClient.post(`http://localhost:8080/user/adopter`, adopter);
  }
}