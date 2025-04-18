import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { HeaderHomeComponent } from '../../parts/header-home/header-home.component';
import { Select } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DatePickerModule } from 'primeng/datepicker';
import { CardModule } from 'primeng/card';
import { BadgeModule } from 'primeng/badge';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { AddExpenseComponent } from '../../popups/add-expense/add-expense.component';
import { DialogModule } from 'primeng/dialog';
import { DogDetailsService } from '../../../services/dogdetails.service';
import { DogDetails } from '../../../models/dogdetails.model';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import { Expense } from '../../../models/expense.model';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { DogService } from '../../../services/dog.service';
import { ExpenseDetails } from '../../../models/expense-details.model';

interface Item {
  name: string;
  id: string;
}

@Component({
  selector: 'app-dog-details',
  imports: [HeaderHomeComponent, MultiSelectModule, InputTextModule, FormsModule, ReactiveFormsModule, Select, ButtonModule, CheckboxModule, DatePickerModule, CardModule, RouterLink, AddExpenseComponent, DialogModule, BadgeModule, OverlayBadgeModule,TableModule,CommonModule],
  templateUrl: './dog-details.component.html',
  styleUrl: './dog-details.component.css'
})

export class DogDetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  dogID = -1;
  breed_options !: any[];
  sex_options !: Item[];
  manufacturer_options !: Item[];
  addDogForm !: FormGroup;
  expense_popup_visible: boolean = false;
  confirm_popup_visible: boolean = false;
  details !: DogDetails;
  user: User | null = null;
  dogName = "";
  expenses !: ExpenseDetails[];
  adopt_visible: boolean = false;
  isDirector: boolean = false;
  private userSubscription: Subscription | null = null;
  availableSpace: number = 0;
  maxCapacty: number = 15;
  currentNumberOfDogs = 0;
  add_expenses = true;
  volAge = 0;

  addExpenseClick=  () => {
    this.expense_popup_visible = true;
  };

  closeExpenseClick=  () => {
    this.expense_popup_visible = false;
    //console.log(this.addExpenseForm);
  };

  addAdoptionClick= () => {
    this.router.navigate(['/adopt', this.dogID]);
  }

  saveDogClick = () => {
    this.confirm_popup_visible = true;
  
    const breedControl = this.addDogForm.get("breeds");
    const isBreedSelectionDisabled = breedControl?.disabled;
    
    let dogdetails: DogDetails = {
      dogName: this.addDogForm.get("dog_name")?.value,
      dogID: this.addDogForm.get("dog_id")?.value,
      breeds: isBreedSelectionDisabled ? "" : breedControl?.value?.map((breed: Item) => breed.id).join(", ") ?? "UNKNOWN",
      sex: this.addDogForm.get("sex")?.value?.id ?? "Unknown",
      altered: this.addDogForm.get("altered")?.value,
      ageYears: this.addDogForm.get("age_years")?.value,
      ageMonths: this.addDogForm.get("age_months")?.value,
      description: this.addDogForm.get("description")?.value,
      microchipID: this.addDogForm.get("microchip_id")?.value,
      microchipVendor: this.addDogForm.get("manufacturers")?.value?.id ?? "Unknown",
      surrenderDate: this.addDogForm.get("surrender_date")?.value,
      surrenderPhone: this.addDogForm.get("surrender_phone")?.value,
      byAnimalControl: this.addDogForm.get("surrender_animalctrl")?.value,
      adoptability: ''
    };
  
    this.dogDetailsService.updateDetails(this.dogID, dogdetails).subscribe(details => {
      this.details = details;
    });
  };

  dogDashboardClick=  () => {
    this.confirm_popup_visible = false;
    this.router.navigate(["/dog-dashboard"]);
  };

  constructor(private router: Router, private userService: UserService, private dogDetailsService: DogDetailsService, private dogService:DogService) {
    this.dogID = Number(this.route.snapshot.params['dogid']);
    this.userSubscription = this.userService.user$.subscribe(user => {
      this.isDirector = Boolean(user?.director);
      this.volAge = Number(user?.age);
    });
  }

  ngOnInit() {
    this.createEmptyForm();

    this.dogDetailsService.getExpenses(this.dogID).subscribe(details => {
      this.expenses = details;
      console.log(this.expenses);
    });
    
    this.dogService.getCurrentNumberOfDogs().subscribe(currentNumberOfDogs => {
      this.currentNumberOfDogs = currentNumberOfDogs;
      this.availableSpace = this.maxCapacty - currentNumberOfDogs;
    });

    //hardcoded options
    this.breed_options = [
      {name: 'Affenpinscher', id: 'Affenpinscher'},
      {name: 'Afghan Hound', id: 'Afghan Hound'},
      {name: 'Airedale Terrier', id: 'Airedale Terrier'},
      {name: 'Akbash Dog', id: 'Akbash Dog'},
      {name: 'Akita', id: 'Akita'},
      {name: 'Alapaha Blue Blood Bulldog', id: 'Alapaha Blue Blood Bulldog'},
      {name: 'Alaskan Husky', id: 'Alaskan Husky'},
      {name: 'Alaskan Malamute', id: 'Alaskan Malamute'},
      {name: 'American Bulldog', id: 'American Bulldog'},
      {name: 'American Eskimo', id: 'American Eskimo'},
      {name: 'American Foxhound', id: 'American Foxhound'},
      {name: 'American Pit Bull Terrier', id: 'American Pit Bull Terrier'},
      {name: 'American Staffordshire Terrier', id: 'American Staffordshire Terrier'},
      {name: 'American Water Spaniel', id: 'American Water Spaniel'},
      {name: 'Anatolian Shepherd Dog', id: 'Anatolian Shepherd Dog'},
      {name: 'Aussiedoodle', id: 'Aussiedoodle'},
      {name: 'Australian Cattle Dog', id: 'Australian Cattle Dog'},
      {name: 'Australian Kelpie', id: 'Australian Kelpie'},
      {name: 'Australian Shepherd', id: 'Australian Shepherd'},
      {name: 'Australian Terrier', id: 'Australian Terrier'},
      {name: 'Azawakh', id: 'Azawakh'},
      {name: 'Basador', id: 'Basador'},
      {name: 'Basenji', id: 'Basenji'},
      {name: 'Basset Bleu de Gascogne', id: 'Basset Bleu de Gascogne'},
      {name: 'Basset Hound', id: 'Basset Hound'},
      {name: 'Beagle', id: 'Beagle'},
      {name: 'Bearded Collie', id: 'Bearded Collie'},
      {name: 'Beauceron', id: 'Beauceron'},
      {name: 'Bedlington Terrier', id: 'Bedlington Terrier'},
      {name: 'Belgian Laekenois', id: 'Belgian Laekenois'},
      {name: 'Belgian Malinois', id: 'Belgian Malinois'},
      {name: 'Belgian Sheepdog', id: 'Belgian Sheepdog'},
      {name: 'Belgian Tervuren', id: 'Belgian Tervuren'},
      {name: 'Bergamasco', id: 'Bergamasco'},
      {name: 'Berger Picard', id: 'Berger Picard'},
      {name: 'Bernese Mountain Dog', id: 'Bernese Mountain Dog'},
      {name: 'Bichon Frise', id: 'Bichon Frise'},
      {name: 'Black and Tan Coonhound', id: 'Black and Tan Coonhound'},
      {name: 'Black Russian Terrier', id: 'Black Russian Terrier'},
      {name: 'Bloodhound', id: 'Bloodhound'},
      {name: 'Blue Picardy Spaniel', id: 'Blue Picardy Spaniel'},
      {name: 'Bluetick Coonhound', id: 'Bluetick Coonhound'},
      {name: 'Boerboel', id: 'Boerboel'},
      {name: 'Bolognese', id: 'Bolognese'},
      {name: 'Border Collie', id: 'Border Collie'},
      {name: 'Border Terrier', id: 'Border Terrier'},
      {name: 'Borzoi', id: 'Borzoi'},
      {name: 'Boston Terrier', id: 'Boston Terrier'},
      {name: 'Bouvier des Flandres', id: 'Bouvier des Flandres'},
      {name: 'Boxer', id: 'Boxer'},
      {name: 'Boykin Spaniel', id: 'Boykin Spaniel'},
      {name: 'Bracco Italiano', id: 'Bracco Italiano'},
      {name: 'Briard', id: 'Briard'},
      {name: 'Brittany', id: 'Brittany'},
      {name: 'Brussels Griffon', id: 'Brussels Griffon'},
      {name: 'Bull Terrier', id: 'Bull Terrier'},
      {name: 'Bulldog', id: 'Bulldog'},
      {name: 'Bullmastiff', id: 'Bullmastiff'},
      {name: 'Cairn Terrier', id: 'Cairn Terrier'},
      {name: 'Canaan Dog', id: 'Canaan Dog'},
      {name: 'Cane Corso', id: 'Cane Corso'},
      {name: 'Cardigan Welsh Corgi', id: 'Cardigan Welsh Corgi'},
      {name: 'Catahoula Leopard Dog', id: 'Catahoula Leopard Dog'},
      {name: 'Caucasian Ovcharka', id: 'Caucasian Ovcharka'},
      {name: 'Cavalier King Charles Spaniel', id: 'Cavalier King Charles Spaniel'},
      {name: 'Cavapom', id: 'Cavapom'},
      {name: 'Cavapoo', id: 'Cavapoo'},
      {name: 'Cesky Terrier', id: 'Cesky Terrier'},
      {name: 'Chart Polski', id: 'Chart Polski'},
      {name: 'Chesapeake Bay Retriever', id: 'Chesapeake Bay Retriever'},
      {name: 'Chihuahua', id: 'Chihuahua'},
      {name: 'Chinese Crested', id: 'Chinese Crested'},
      {name: 'Chinese Shar-Pei', id: 'Chinese Shar-Pei'},
      {name: 'Chinook', id: 'Chinook'},
      {name: 'Chow Chow', id: 'Chow Chow'},
      {name: 'Chug', id: 'Chug'},
      {name: 'Cirneco dell\'Etna', id: 'Cirneco dell\'Etna'},
      {name: 'Clumber Spaniel', id: 'Clumber Spaniel'},
      {name: 'Cockapoo', id: 'Cockapoo'},
      {name: 'Cocker Spaniel', id: 'Cocker Spaniel'},
      {name: 'Collie', id: 'Collie'},
      {name: 'Coton de Tulear', id: 'Coton de Tulear'},
      {name: 'Curly-Coated Retriever', id: 'Curly-Coated Retriever'},
      {name: 'Dachshund', id: 'Dachshund'},
      {name: 'Dalmatian', id: 'Dalmatian'},
      {name: 'Dandie Dinmont Terrier', id: 'Dandie Dinmont Terrier'},
      {name: 'Doberman Pinscher', id: 'Doberman Pinscher'},
      {name: 'Dogo Argentino', id: 'Dogo Argentino'},
      {name: 'Dogue de Bordeaux', id: 'Dogue de Bordeaux'},
      {name: 'Doxiepoo', id: 'Doxiepoo'},
      {name: 'English Cocker Spaniel', id: 'English Cocker Spaniel'},
      {name: 'English Foxhound', id: 'English Foxhound'},
      {name: 'English Setter', id: 'English Setter'},
      {name: 'English Springer Spaniel', id: 'English Springer Spaniel'},
      {name: 'English Toy Spaniel', id: 'English Toy Spaniel'},
      {name: 'Entlebucher Mountain Dog', id: 'Entlebucher Mountain Dog'},
      {name: 'Eurasier', id: 'Eurasier'},
      {name: 'Field Spaniel', id: 'Field Spaniel'},
      {name: 'Fila Brasileiro', id: 'Fila Brasileiro'},
      {name: 'Finnish Lapphund', id: 'Finnish Lapphund'},
      {name: 'Finnish Spitz', id: 'Finnish Spitz'},
      {name: 'Flat-Coated Retriever', id: 'Flat-Coated Retriever'},
      {name: 'Fox Terrier', id: 'Fox Terrier'},
      {name: 'French Bulldog', id: 'French Bulldog'},
      {name: 'German Pinscher', id: 'German Pinscher'},
      {name: 'German Shepherd Dog', id: 'German Shepherd Dog'},
      {name: 'German Shorthaired Pointer', id: 'German Shorthaired Pointer'},
      {name: 'German Spitz', id: 'German Spitz'},
      {name: 'German Wirehaired Pointer', id: 'German Wirehaired Pointer'},
      {name: 'Giant Schnauzer', id: 'Giant Schnauzer'},
      {name: 'Glen of Imaal Terrier', id: 'Glen of Imaal Terrier'},
      {name: 'Golden Retriever', id: 'Golden Retriever'},
      {name: 'Goldendoodle', id: 'Goldendoodle'},
      {name: 'Gordon Setter', id: 'Gordon Setter'},
      {name: 'Great Dane', id: 'Great Dane'},
      {name: 'Great Pyrenees', id: 'Great Pyrenees'},
      {name: 'Greater Swiss Mountain Dog', id: 'Greater Swiss Mountain Dog'},
      {name: 'Greyhound', id: 'Greyhound'},
      {name: 'Harrier', id: 'Harrier'},
      {name: 'Havanese', id: 'Havanese'},
      {name: 'Ibizan Hound', id: 'Ibizan Hound'},
      {name: 'Icelandic Sheepdog', id: 'Icelandic Sheepdog'},
      {name: 'Irish Red and White Setter', id: 'Irish Red and White Setter'},
      {name: 'Irish Setter', id: 'Irish Setter'},
      {name: 'Irish Terrier', id: 'Irish Terrier'},
      {name: 'Irish Water Spaniel', id: 'Irish Water Spaniel'},
      {name: 'Irish Wolfhound', id: 'Irish Wolfhound'},
      {name: 'Italian Greyhound', id: 'Italian Greyhound'},
      {name: 'Jack Russell Terrier', id: 'Jack Russell Terrier'},
      {name: 'Japanese Chin', id: 'Japanese Chin'},
      {name: 'Keeshond', id: 'Keeshond'},
      {name: 'Kerry Blue Terrier', id: 'Kerry Blue Terrier'},
      {name: 'Komondor', id: 'Komondor'},
      {name: 'Kooikerhondje', id: 'Kooikerhondje'},
      {name: 'Kromfohrlander', id: 'Kromfohrlander'},
      {name: 'Kuvasz', id: 'Kuvasz'},
      {name: 'Labradoodle', id: 'Labradoodle'},
      {name: 'Labrador Retriever', id: 'Labrador Retriever'},
      {name: 'Lacy Dog', id: 'Lacy Dog'},
      {name: 'Lagotto Romagnolo', id: 'Lagotto Romagnolo'},
      {name: 'Lakeland Terrier', id: 'Lakeland Terrier'},
      {name: 'Large Munsterlander', id: 'Large Munsterlander'},
      {name: 'Leonberger', id: 'Leonberger'},
      {name: 'Lhasa Apso', id: 'Lhasa Apso'},
      {name: 'Lhasapoo', id: 'Lhasapoo'},
      {name: 'Longdog', id: 'Longdog'},
      {name: 'Lowchen', id: 'Lowchen'},
      {name: 'Lurcher', id: 'Lurcher'},
      {name: 'Maltese', id: 'Maltese'},
      {name: 'Maltipoo', id: 'Maltipoo'},
      {name: 'Manchester Terrier', id: 'Manchester Terrier'},
      {name: 'Mastiff', id: 'Mastiff'},
      {name: 'Miniature American Shepherd', id: 'Miniature American Shepherd'},
      {name: 'Miniature Bull Terrier', id: 'Miniature Bull Terrier'},
      {name: 'Miniature Pinscher', id: 'Miniature Pinscher'},
      {name: 'Miniature Schnauzer', id: 'Miniature Schnauzer'},
      {name: 'Mixed', id: 'Mixed'},
      {name: 'Mudi', id: 'Mudi'},
      {name: 'Neapolitan Mastiff', id: 'Neapolitan Mastiff'},
      {name: 'Newfoundland', id: 'Newfoundland'},
      {name: 'Norfolk Terrier', id: 'Norfolk Terrier'},
      {name: 'Norwegian Buhund', id: 'Norwegian Buhund'},
      {name: 'Norwegian Elkhound', id: 'Norwegian Elkhound'},
      {name: 'Norwegian Lundehund', id: 'Norwegian Lundehund'},
      {name: 'Norwich Terrier', id: 'Norwich Terrier'},
      {name: 'Nova Scotia Duck Tolling Retriever', id: 'Nova Scotia Duck Tolling Retriever'},
      {name: 'Old English Sheepdog', id: 'Old English Sheepdog'},
      {name: 'Otterhound', id: 'Otterhound'},
      {name: 'Papillon', id: 'Papillon'},
      {name: 'Pekeapoo', id: 'Pekeapoo'},
      {name: 'Pekingese', id: 'Pekingese'},
      {name: 'Pembroke Welsh Corgi', id: 'Pembroke Welsh Corgi'},
      {name: 'Perro de Presa Canario', id: 'Perro de Presa Canario'},
      {name: 'Peruvian Inca Orchid', id: 'Peruvian Inca Orchid'},
      {name: 'Petit Basset Griffon Vendeen', id: 'Petit Basset Griffon Vendeen'},
      {name: 'Pharaoh Hound', id: 'Pharaoh Hound'},
      {name: 'Plott', id: 'Plott'},
      {name: 'Pointer', id: 'Pointer'},
      {name: 'Polish Lowland Sheepdog', id: 'Polish Lowland Sheepdog'},
      {name: 'Pomapoo', id: 'Pomapoo'},
      {name: 'Pomeranian', id: 'Pomeranian'},
      {name: 'Pomsky', id: 'Pomsky'},
      {name: 'Poodle', id: 'Poodle'},
      {name: 'Portuguese Podengo', id: 'Portuguese Podengo'},
      {name: 'Portuguese Water Dog', id: 'Portuguese Water Dog'},
      {name: 'Pug', id: 'Pug'},
      {name: 'Pugapoo', id: 'Pugapoo'},
      {name: 'Puggle', id: 'Puggle'},
      {name: 'Puli', id: 'Puli'},
      {name: 'Pumi', id: 'Pumi'},
      {name: 'Pyrenean Shepherd', id: 'Pyrenean Shepherd'},
      {name: 'Rat Terrier', id: 'Rat Terrier'},
      {name: 'Redbone Coonhound', id: 'Redbone Coonhound'},
      {name: 'Rhodesian Ridgeback', id: 'Rhodesian Ridgeback'},
      {name: 'Rottweiler', id: 'Rottweiler'},
      {name: 'Russian Toy', id: 'Russian Toy'},
      {name: 'Saint Bernard', id: 'Saint Bernard'},
      {name: 'Saluki', id: 'Saluki'},
      {name: 'Samoyed', id: 'Samoyed'},
      {name: 'Schapendoes', id: 'Schapendoes'},
      {name: 'Schipperke', id: 'Schipperke'},
      {name: 'Schnoodle', id: 'Schnoodle'},
      {name: 'Scottish Deerhound', id: 'Scottish Deerhound'},
      {name: 'Scottish Terrier', id: 'Scottish Terrier'},
      {name: 'Sealyham Terrier', id: 'Sealyham Terrier'},
      {name: 'Shetland Sheepdog', id: 'Shetland Sheepdog'},
      {name: 'Shiba Inu', id: 'Shiba Inu'},
      {name: 'Shih Tzu', id: 'Shih Tzu'},
      {name: 'Shihpoo', id: 'Shihpoo'},
      {name: 'Siberian Husky', id: 'Siberian Husky'},
      {name: 'Silken Windhound', id: 'Silken Windhound'},
      {name: 'Silky Terrier', id: 'Silky Terrier'},
      {name: 'Skye Terrier', id: 'Skye Terrier'},
      {name: 'Sloughi', id: 'Sloughi'},
      {name: 'Small Munsterlander Pointer', id: 'Small Munsterlander Pointer'},
      {name: 'Soft Coated Wheaten Terrier', id: 'Soft Coated Wheaten Terrier'},
      {name: 'Spanish Greyhound', id: 'Spanish Greyhound'},
      {name: 'Spanish Water Dog', id: 'Spanish Water Dog'},
      {name: 'Spinone Italiano', id: 'Spinone Italiano'},
      {name: 'Sprollie', id: 'Sprollie'},
      {name: 'Staffordshire Bull Terrier', id: 'Staffordshire Bull Terrier'},
      {name: 'Standard Schnauzer', id: 'Standard Schnauzer'},
      {name: 'Sussex Spaniel', id: 'Sussex Spaniel'},
      {name: 'Swedish Lapphund', id: 'Swedish Lapphund'},
      {name: 'Swedish Vallhund', id: 'Swedish Vallhund'},
      {name: 'Thai Ridgeback', id: 'Thai Ridgeback'},
      {name: 'Tibetan Mastiff', id: 'Tibetan Mastiff'},
      {name: 'Tibetan Spaniel', id: 'Tibetan Spaniel'},
      {name: 'Tibetan Terrier', id: 'Tibetan Terrier'},
      {name: 'Tosa Ken', id: 'Tosa Ken'},
      {name: 'Toy Fox Terrier', id: 'Toy Fox Terrier'},
      {name: 'Toy Poodle', id: 'Toy Poodle'},
      {name: 'Treeing Walker Coonhound', id: 'Treeing Walker Coonhound'},
      {name: 'Unknown', id: 'Unknown'},
      {name: 'Vizsla', id: 'Vizsla'},
      {name: 'Volpino Italiano', id: 'Volpino Italiano'},
      {name: 'Weimaraner', id: 'Weimaraner'},
      {name: 'Welsh Springer Spaniel', id: 'Welsh Springer Spaniel'},
      {name: 'Welsh Terrier', id: 'Welsh Terrier'},
      {name: 'West Highland White Terrier', id: 'West Highland White Terrier'},
      {name: 'Whippet', id: 'Whippet'},
      {name: 'Wirehaired Pointing Griffon', id: 'Wirehaired Pointing Griffon'},
      {name: 'Wirehaired Vizsla', id: 'Wirehaired Vizsla'},
      {name: 'Xoloitzcuintli', id: 'Xoloitzcuintli'},
      {name: 'Yorkipoo', id: 'Yorkipoo'},
      {name: 'Yorkshire Terrier', id: 'Yorkshire Terrier'},
    ];
    this.sex_options = [
      {name: 'Female', id: 'Female'},
      {name: 'Male', id: 'Male'},
      {name: 'UNKNOWN', id: 'UNKNOWN'},
    ];
    this.manufacturer_options = [
      {name: '24PetWatch', id: '24PetWatch'},
      {name: 'AKC Reunite', id: 'AKC Reunite'},
      {name: 'AVID', id: 'AVID'},
      {name: 'Banfield TruPaws', id: 'Banfield TruPaws'},
      {name: 'BarkCode Solutions', id: 'BarkCode Solutions'},
      {name: 'CritterID Systems', id: 'CritterID Systems'},
      {name: 'Datamars', id: 'Datamars'},
      {name: 'Destron Fearing', id: 'Destron Fearing'},
      {name: 'FurryTag Systems', id: 'FurryTag Systems'},
      {name: 'FurSecure ID', id: 'FurSecure ID'},
      {name: 'FurTrack Microchips', id: 'FurTrack Microchips'},
      {name: 'HomeAgain', id: 'HomeAgain'},
      {name: 'LifeChip', id: 'LifeChip'},
      {name: 'PawID Technologies', id: 'PawID Technologies'},
      {name: 'PawPrint ID', id: 'PawPrint ID'},
      {name: 'PawTech Microchips', id: 'PawTech Microchips'},
      {name: 'PetGuardian Chips', id: 'PetGuardian Chips'},
      {name: 'PetLink', id: 'PetLink'},
      {name: 'PetSafe Chips', id: 'PetSafe Chips'},
      {name: 'Trovan', id: 'Trovan'}
    ];

    this.userService.user$.subscribe(user => {
      this.user = user
    });

    this.dogDetailsService.getDetails(this.dogID).subscribe(details => {
      this.details = details;
      this.populateDetails();
    });
  }

  breedChange=  () => {
    if(this.addDogForm.controls['breeds'].value.find((e: Item) => e.name === 'Unknown')){
      this.breed_options.forEach(b => {
        if (b.name != "Unknown") {
          b.disabled = true;
        }
      });
    }
    else if(this.addDogForm.controls['breeds'].value.find((e: Item) => e.name === 'Mixed')){
      this.breed_options.forEach(b => {
        if (b.name != "Mixed") {
          b.disabled = true;
        }
      });
    }
    else{
      this.breed_options.forEach(b => {
          b.disabled = false;
      });
    }
  };

  populateDetails() {
  const breedList = this.details.breeds?.split(/[,\/]/).map(b => b.trim()) || [];
  const breedObjects = breedList.map(breed => 
    this.breed_options.find(option => option.name === breed || option.id === breed)
  ).filter(Boolean);
    
    const sexObject = this.sex_options.find(option => option.id === this.details.sex);
    const manufacturerObject = this.manufacturer_options.find(option => option.id === this.details.microchipVendor);

    this.addDogForm.patchValue({
      dog_name: this.details.dogName,
      dog_id: this.details.dogID,
      description: this.details.description,
      age_years: this.details.ageYears,
      age_months: this.details.ageMonths,
      microchip_id: this.details.microchipID,
      surrender_date: new Date(this.details.surrenderDate),
      surrender_phone: this.details.surrenderPhone,
      altered: this.details.altered,
      manufacturers: manufacturerObject,
      surrender_animalctrl: this.details.byAnimalControl,
      breeds: breedObjects,
      sex: sexObject
    });

    this.dogName = this.details.dogName;
    this.addDogForm.controls['description'].disable();
    if(this.details.sex == "Female" || this.details.sex == "Male"){
      this.addDogForm.controls['sex'].disable();
    }
    if(this.details.microchipID != "" && this.details.microchipID != null){
      this.addDogForm.controls['microchip_id'].disable();
      this.addDogForm.controls['manufacturers'].disable();
    }
    if(this.details.altered == true){
      this.addDogForm.controls['altered'].disable();
    }
    this.addDogForm.controls['surrender_phone'].disable();
    if(this.details.byAnimalControl == true && this.isDirector == false){
      this.addDogForm.patchValue({
        surrender_phone: "CONFIDENTIAL: MUST BE DIRECTOR"
      });
    }

    if(!(breedList.indexOf("Mixed") > -1 || breedList.indexOf("Unknown") > -1)){
      this.addDogForm.controls['breeds'].disable();
    }

    if(this.isDirector == true && this.details.adoptability == "Adoptable"){
      this.adopt_visible = true;
    }

    if(this.isDirector == false && this.volAge < 18){
      this.addDogForm.controls['microchip_id'].disable();
      this.addDogForm.controls['manufacturers'].disable();
    }

    if(this.details.adoptability == "Adopted"){
      this.add_expenses = false;
    }

    this.breedChange();
  }

  createEmptyForm() {
    this.addDogForm = new FormGroup({
    dog_name: new FormControl({value:'', disabled: true}),
    dog_id: new FormControl({value: '', disabled: true}),
    breeds: new FormControl<Item[] | null>(null),
    sex: new FormControl<Item | null>(null), 
    altered: new FormControl(false),
    age_years: new FormControl({value:0,disabled:true}),
    age_months: new FormControl({value:0,disabled:true}),
    description: new FormControl(''),
    microchip_id: new FormControl(''),
    manufacturers: new FormControl<Item | null>(null),
    surrender_date: new FormControl<Date | null>({value: null, disabled: true}),
    surrender_phone: new FormControl(''),
    surrender_animalctrl: new FormControl({value: false, disabled: true})
  });
  }


  /* for my reference, deletee later
    btnClick = () => {
          this.loginservice.verifyUser({'emailAddress':this.emailAddress,'password':this.password}).subscribe({
            next: (user: User) => {
              console.log('Response from API:', user);
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

  */

}
