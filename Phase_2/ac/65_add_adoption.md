## 65 - Add Adoption (Application)

[ENTER]: Executive Director enters from "Dog Detail" screen by clicking "Add Adoption" button

- Display "Add Dog" input form
- User is able to input:  
  - First name
  - Last name
  - Street
  - City
  - State
  - Zip code
  - Phone number
  - Email Address
  - Household size
  - Upon submission:
    - Date of application is recorded based on date and time of submission
    - Status of application is recorded as "pending approval"


[EXIT] Upon submission, Executive Director is directed back to "Dog Detail" screen
---
> INSERT INTO Adopter
> VALUES (Email, Street, City, State, Zip)
> INSERT INTO Person 
> VALUES (Email, FirstName, LastName, Phone)
> INSERT INTO Application
> Values (Email, Date, 'Pending', 0, False, NULL)
> 
---

Constraints:
- if applicaiton is within 24 hours of last applicaiton for email: display "Cannot submit as last application was within 24 hours"
- Email address of application is expected to be unique -> 
"The email address of the adopter is expected to be unique; there cannot be two different adopters with
the same email address. If the adopter’s email is already present in the system, their information cannot
be updated."