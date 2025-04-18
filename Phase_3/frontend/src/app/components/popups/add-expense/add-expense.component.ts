import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { HeaderHomeComponent } from '../../parts/header-home/header-home.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Select } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DatePickerModule } from 'primeng/datepicker';
import { CardModule } from 'primeng/card';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Expense } from '../../../models/expense.model';
import { DogDetailsService } from '../../../services/dogdetails.service';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';

interface Item {
  name: string;
  id: string;
}

@Component({
  selector: 'app-add-expense',
  imports: [MultiSelectModule, InputTextModule, FormsModule, ReactiveFormsModule, Select, ButtonModule, CheckboxModule, DatePickerModule, CardModule, RouterLink,MessagesModule],
  providers: [MessageService],
  templateUrl: './add-expense.component.html',
  styleUrl: './add-expense.component.css'
})

export class AddExpenseComponent {
  //category_options !: any[];
  category_options !: Item[];
  addExpenseForm !: FormGroup;
  route: ActivatedRoute = inject(ActivatedRoute);
  dogID = -1;
  constructor(private router: Router, private dogDetailsService : DogDetailsService,private messageService: MessageService) {}
  date !: Date;



  addExpenseClick= () => {

    if (!this.addExpenseForm.valid) {
      this.messageService.clear();
      this.messageService.add({ text: "Please fill in all fields", severity: 'error' });
      return;
    }
    //console.log(this.addExpenseForm.value);
    this.dogID = Number(this.route.snapshot.params['dogid']);

    let date = new Date(this.addExpenseForm.get("expense_date")?.value)
    console.log(date);
    /*
    console.log(date);
    let strDate:string;
    strDate = JSON.stringify(date)
    //strDate = strDate.slice(1,11))
    */

    //let sqlDate = new Date(strDate.slice(1,11));
    //console.log(sqlDate);
    
    const expense:Expense = {
      dogID: this.dogID,
      vendor: this.addExpenseForm.get("vendor_name")?.value,
      //expenseDate: this.addExpenseForm.get("expense_date")?.value,
      expenseDate: date,
      amount: this.addExpenseForm.get("amount")?.value,
      category: this.addExpenseForm.get("categories")?.value.name,
    }

    /*
      console.log(this.dogID);
      console.log(this.addExpenseForm.get("vendor_name")?.value);
      console.log(this.addExpenseForm.get("expense_date")?.value);
      console.log(this.addExpenseForm.get("amount")?.value);
      console.log(this.addExpenseForm.get("categories")?.value.name);
    */
    console.log(expense);

    this.dogDetailsService.addExpense(this.dogID, expense).subscribe({
        next: () => {
          console.log('succesful api call');
          this.router.navigate(['/dog-dashboard']);
      },
      error: (error) => {
        const errorMessage = 'Only 1 expense per vendor allowed per day'; 
        this.messageService.add({text:errorMessage, severity:'error'});
        console.error('Error', error);
      }});





  };




  ngOnInit() {
    //hardcoded options
    this.category_options = [
      //{name: 'Food', id: 'Corgi'},
      //{name: 'Medical', id: 'Pug'},
      //{name: 'Unknown', id: 'Unknown'},
      {name: 'Medications', id: 'Terrier'}
    ];

    this.addExpenseForm = new FormGroup({
      expense_date: new FormControl<Date | null>(null,[Validators.required]),
      vendor_name: new FormControl(null,[Validators.required]),
      amount: new FormControl(null,[Validators.required]),
      categories: new FormControl<Item[] | null>(null,[Validators.required])
    });

    this.dogDetailsService.getCategories(this.dogID).subscribe(categories => {
      //console.log(categories);


      for (let i = 0 ; i < categories.length; i++){
        this.category_options.push({
          name: categories[i].categoryName,
          id: categories[i].categoryName

        });
      }


    });



  }
}
