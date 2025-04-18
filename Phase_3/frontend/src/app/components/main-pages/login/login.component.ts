import { Component, OnInit } from '@angular/core';
import {StyleClassModule} from 'primeng/styleclass';
import { CheckboxModule } from 'primeng/checkbox';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../../services/login.service';
import { FormsModule } from '@angular/forms';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';


@Component({
  selector: 'app-login',
  imports: [StyleClassModule, CheckboxModule, CardModule, InputTextModule, ButtonModule, FormsModule,
    MessagesModule],
  providers: [MessageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent{
  
  emailAddress!: string;
  password!: string

  constructor(private router: Router, private loginservice: LoginService, private messageService: MessageService, private userService: UserService) { }

  btnClick = () => {
    this.loginservice.verifyUser({'emailAddress':this.emailAddress,'password':this.password}).subscribe({
      next: (user: User) => {
        console.log('Response from API:', user);
        this.userService.clearUser();
        this.userService.setUser(user)
        this.router.navigate(['/dog-dashboard']);
    },
      error: (error) => {
        const errorMessage = error.error?.message ||
                     error.error || 
                     error.statusText || 
                     'Unknown error'; 
        this.messageService.add({text:errorMessage, severity:'error'});
        console.error('Error', error);
      }});
};
}
