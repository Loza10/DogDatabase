# Business Logic Constraints

User Access:
1. Expenses for a dog can only be entered by a volunteer over the age of 18.
2. One and only one user can be the Executive Director.
3. Only the Executive Director can approve or reject adoption applications, enter adoption information and view reports.
4. Only one volunteer can be logged in at a time except for the Executive Director who can always be logged in.

Dogs:
1. Dog facility has a max capacity of 15 dogs.
2. The following fields must be input when a dog enters the shelter:
   - Name
   - Breed
   - Sex
   - Alteration status
   - Age
   - Microchip ID
   - Expenses
   - Surrender date
   - Dog ID
   - If the surrenderer is from animal control, their phone number is required
3. These fields are optional to track for each dog:
   - Description
   - If the surrenderer is not from animal control, their phone number is optional.
4. If the dog's breed is "Unknown" or "Mixed" then the dog's breed can be updated to another breed. Otherwise, its breed cannot be updated.
5. If sex of dog is "Unknown" then the dog's sex can be updated. Otherwise, its sex cannot be updated.
6. If dog's alteration status is False, it can be updated to True. Otherwise, its alteration status cannot be updated.
7. Dogs can only be assocated with an expense for a specific vendor once a day. 
8. If a dog is not microchipped, a microchip must be implanted before the dog can be adopted.
9. Only volunteers over the age of 18 can perform the microchip procedure.
10. A dog cannot be adopted until it has been altered.
11. A dog may only have one microchip.


Surrenders:
1. If a dog has a Microchip ID, it must be provided at the time of the surrender.
2. If the surrenderer is from animal control, their phone number is visible to all users. Otherwise, the surrenderer's phone number will only be visible to the Executive Director.


Adopters & Adoption Applications
1. There cannot be two adopters with the same email address. 
2. If the adopter's email is already present in the system, their information cannot be updated.
3. Each adopter can submit multiple adoption applications but only one application per day.
4. Adopters must fill out a complete new application for each dog they want to adopt.
5. A dog can only be surrendered once.
6. If a dog was brought in by animal control, the adoption fee is 10% of expenses. Otherwise, the adoption fee is the sum of all expenses plus 25%. 
7. If the dog adopted belongs to a "Terrier" breed and named "Sideways", their adoption fee is waived.

# User Interface

Dog Dashboard:
1. If there are less than 15 dogs in the shelter, users can add a dog to the shelter.

Add dog:
1. Bulldogs named "Uga" cannot be registered.

Adoption:
1. If all details of the adoption application are correct, user can submit adoption details to database.

Adoption Application Review:
1. Only the Executive Director can review pending adoption applications.

# Reports
1. Only the Executive Director has access to the reports from the dog dashboard.

Animal Control Report:
1. Data is only available for the current month and the previous 6 months.

Monthly Adoption Report:
1. Data is only available for breeds adopted or surrendered during the last 12 months.
2. If dog is surrendered by animal control, the dogs' expenses should not be considered when computing net "profit".


Volunteer Birthdays:
1. If a month has no birthdays then a message with “No volunteer birthdays this month!” should appear.
2. If a volunteer has a 10-year anniversary (ie 10, 20, 30, etc), this should be highlighted.
3. Report should appear month by month, defaulting to the current month. 