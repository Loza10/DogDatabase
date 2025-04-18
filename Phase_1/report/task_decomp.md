**Login:**

* Lock Types: Read only from USER table.  
* Enabling Conditions: None.  
* Frequency: Number of volunteers logging in per day.  
* Schemas: Single.  
* Consistency: Not critical, order is not critical.  
* Subtasks: No mother task, no decomposition.

**Add Dog:**

* Lock Types: Inserts in name, breed, sex, alteration status, surrender date, surrendered by animal shelter. Potentially inserts, description, microchip ID, and surrenders phone number.  
* Enabling Conditions: User must be logged in and shelter can't be full.  
* Frequency: Dogs surrendered per day if shelter is not full.  
* Schemas: Several different schemas required. 
* Consistency: Not critical.  
* Subtasks: No mother task, no decomposition.

**View Dog:**

* Lock Types: Read in DOG information and expenses. Potential updates or inserts of breed, sex, alteration status, microchip id, and adoption.  
* Enabling Conditions: User must be logged in. Dog information must be entered. Executive Director can add adoption.  
* Frequency: Often.  
* Schemas: Several different schema structures needed.  
* Consistency: Not critical, this is where edits are made.  
* Subtasks: Mother task is required (DOG information and EXPENSE information)

**Add Expenses:**

* Lock Types: Inserts all expense information that's required.   
* Enabling Conditions: User must be logged in and at least 18.  
* Frequency: Often.  
* Schemas: Single.  
* Consistency: Not critical. 
* Subtasks: No mother task, no decomposition.

**Add Adoption:**

* Lock Types: Read adoption applications, expenses (fee), and dog details. Inserts adoption date and updates adoption details.    
* Enabling Conditions: User must be logged in and must be executive director.  
* Frequency: Amount of adoption applications approved.  
* Schemas: Several different schemas required.  
* Consistency: Critical, need to be sure we don't approve two adoption applications.  
* Subtasks: Mother task is required (Dog Details and Adoption information).

**Update Dog Information:**

* NOTE: The point of the 'View Dog' task is to update the dog information, according to our requirements. Hard to say if this needs to be a task.
* Lock Types: TBD
* Enabling Conditions: TBD 
* Frequency: TBD
* Schemas: TBD
* Consistency: TBD
* Subtasks: TBD

**Adoption Review:**

* Lock Types: Reads all applications pending approval, along with applicant information. Updates application status.  
* Enabling Conditions: User must be executive director.
* Frequency: Number of adoption applications submitted.  
* Schemas: Several different schemas required.  
* Consistency: Not critical.  
* Subtasks: Mother task is required (Adopter information & Application)

**View Dog Dashboard:**

* Lock Types: Read in all dogs’ name, breed, sex, alteration status, age, adoptability status, and number of available spaces.  
* Enabling Conditions: User must be logged in.  
* Frequency: Number of dogs and applications being added per day.  
* Schemas: Several different schema structures needed.  
* Consistency: Critical, need to know if dog has been adopted.  
* Subtasks: Mother task is required (Dogs)

**View Animal Control Report:**

* Lock Types: Reads in number of dogs surrendered per month, dogs adopoted in that month that were there for over 60 days. Expenses for all dogs.   
* Enabling Conditions: User must be logged in and be executive director.  
* Frequency: Monthly.  
* Schemas: Several different schema structures needed.  
* Consistency: Critical to the day.  
* Subtasks: Mother task is required (ADOPTION INFO).

**View Adoption Report:**

* Lock Types: Reads in tracking the number of dogs surrendered and adopted each month, the total expenses, total adoption fees, and net “profit”.  
* Enabling Conditions: User must be logged in and be executive director.  
* Frequency: At least yearly.   
* Schemas: Several different schema structures needed.    
* Consistency: Not critical.  
* Subtasks: Mother task is required (ADOPTION INFO).

**View Expense Analysis Report:**

* Lock Types: Reads all vendors by name and total amount spent on them.  
* Enabling Conditions: User must be logged in and be executive director.  
* Frequency: Often.  
* Schemas: Several schemas required.  
* Consistency: Not critical.  
* Subtasks: Mother task is required (EXPENSES & VENDORS).

**View Volunteer Lookup Report:**

* Lock Types: Read in volunteer information.  
* Enabling Conditions: User must be logged in and be executive director.  
* Frequency: Often.  
* Schemas: Single.  
* Consistency: Not critical.  
* Subtasks: Mother task is required (VOLUNTEER INFO).

**View Volunteer Birthdays Report:**

* Lock Types: Reads in volunteer info (birthday).  
* Enabling Conditions: User must be logged in and be executive director.  
* Frequency: Daily.  
* Schemas: Single.  
* Consistency: Semi-Critical?  
* Subtasks: I believe no mother task is required since nothing will happen if no birthdays are in?
