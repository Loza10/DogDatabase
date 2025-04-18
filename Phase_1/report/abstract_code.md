# Abstract code

## Login

- User enters _emailAddress_, _password_ input fields.
- When User clicks **Enter** button
  - validate _emailAddress_ and \_password are not blank
  - If _emailAddress_ is found validate _password_
  - If validation is true then:
    - Navigate to **_Dog Dashboard_** form
  - Else:
    - Display error message on **_Login_** form

## Dog Dashboard

- Calculable available space:
  - **availableSpace** = **maxCapacity** - **currentNumberOfDogs**
- Display the following:
  - **Add Adoption Application** button
  - if **maxCapacity** > **currentNumberOfDogs**
    - Display **Add Dog** button - **_Filter_** dropdown
- If user is a director:
  - Display the following:
    - **Adoption Application Review** button
    - **Animal Control Report** button
    - **Monthly Adoption Report** button
    - **Expense Analysis** button
    - **Volunteer Lookup** button
    - **Volunteer Birthdays** button
- Display Available Space: {**availableSpace**}
- Display all dogs currently in shelter display in table
  - Columns: _dogName_ (clickable link), _breeds_, _sex_, _altered_, _age_, and _adoptability_
  - Order dogs oldest to newest by _surrenderDate_
- If user selects a value from the **_Filter_** dropdown
  - If value is adoptable
    - Display in table dogs that are only adoptable
  - else if value is not adoptable
    - Display in table dogs that are not adoptable
  - else if value is All(default)
    - Display all dogs in table
- Upon:
  - Click **dogName** link- Jump to the **Dog Detail** task
  - Click **Adoption Application Review** button- Jump to the **Adoption Application Review** task
  - Click **Animal Control Report** button- Jump to the **Animal Control Report** task
  - Click **Monthly Adoption Report** button- Jump to the **Monthly Adoption Report** task
  - Click **Expense Analysis** button- Jump to the **Expense Analysis** task
  - Click **Volunteer Lookup** button- Jump to the **Volunteer Lookup** task
  - Click **Volunteer Birthdays** button- Jump to the **Volunteer Birthdays** task
  - Click **Add Adoption Application** button- Jump to the **Add Adoption Application** task
  - Click **Add Dog** button- Jump to the **Add Dog** task

## Add Dog

- Display form with inputs
  - **dogName** text box
  - **breeds** multi select dropdown
    - Multiple selections allowed
      - If "Unknown" OR "Mixed" selected
        - Disable other selections
  - **sex** radio button
    - "Male"
    - "Female"
    - "Unknown"
  - **altered** radio button
    - "Yes"
    - "No"
  - **age** two input boxes
    - **year** which will be converted into months
      - default value of 0
    - **months**
  - **description** text box input
    - optional
  - **microChipVendor** dropdown
    - nullable
  - **microChipID** dropdown
    - disabled until a vendor is chosen
      - default value is null
    - Dropdown values are updated once user selects a Vendor
    - nullable
    - must be unique per dog
  - **surrenderDate** calendar input
  - **surrendersPhoneNumber** number input
    - if **animalControl** is true input is required
    - else optional
  - **animalControl** radio button
    - "Yes"
    - "No"
- Verify if dog is bulldog breed and name Uga
  - If true - display error name not allowed
- Upon:
  - Click **_Submit_** Button display options **_Dog Details_** or **_Return to Dashboard_** links
    - Click **Dog Details** -> Jump to the **Dog Detail** task
    - Click **Return to Dashboard** -> Jump to **Dog Dashboard** task

## Dog Details

- If dog is adopted
  - disable everything
- **dogName**
  - disabled
- **breeds**
  - Displayed as a single value
  - If multiple breeds selected then:
    - Concatenate breeds in alphabetical order with delimiter /
  - If **breeds** is Unknown or **breeds** is Mixed
    - enable edit
  - Else:
    - disabled
- **sex**
  - If **sex** equals Unknown:
    - allow edit
  - Else:
    - disable
- **altered**
  - If **altered** equals Unaltered:
    - allow edit
  - Else:
    - disable
- **age**
  - disabled
- **description** - disabled
- **microChipID**
  - if **microChipID** is null and **user.age** > 18:
    - allow vendor to be selected
    - enable dropdown to select value
  - else
    - disabled
- **microChipVendor**
  - if **microChipVendor** is null and **user.age** > 18
    - enable dropdown to select
    - update **microChipID** dropdown with ids
- **surrenderDate**
  - disabled
- **surrendersPhoneNumber** - disabled
- **animalControl** - disabled
- Display expenses section:
  - **totalExpense** per vendor
  - Add all **totalExpense** and display as **grandTotal**
- if user.**age** > 18:
  - Display link to **_Enter New Expense_**
- If **user** is Director and dog.**microChipID** is not NULL and dog.**altered** is not 'unaltered'
  -Display **_Add Adoption_** button
- Upon:
  - Click **_Enter New Expense_** link -> jump to **Expenses** task
  - Click **_Add Adoption_** button -> jump to **Add Adoption Application** task

## Expenses

- Display following inputs:
  - **expenseDate** - calender input
  - **vendorName** - text box
  - **amount** - double
  - **expenseCategory** - dropdown
- If dog has not been adopted and dog is surrendered
  - allow submit
- If (**expenseCategory** exists and currentDate is true) or user.**age** < 18
  - Do not allow submit

## Add Adoption

- Display search input box
  - Look up via applicants last name
    - case insensitive
  - Display list of applicants
    - **firstName** + **lastName** (clickable link)
    - Address combination of:
      - **street**
      - **city**
      - **state**
      - **zipCode**
    - **phoneNumber**
    - **emailAddress**
    - **householdSize**
- Upon selection via **firstName** + **lastName** in list display:
  - Most recent application
  - Calculate **adoptionFee** and display
    - If dog.**breeds** contains "Terrier" and dog.**name** is "Sideways":
      - **adoptionFee** is 0
  - Upon entering **adoptionDate**
    - Display confirmation screen:
      - Dog name
      - Adopter contact info
      - Adoption fee
      - Adoption date
    - Click **Submit** button
      - disabled if **microchipId** is null and **altered** is no

## Add Adoption Application

- Display a form for inputting values
  - **firstName**
  - **lastName**
  - **street**
  - **city**
  - **state**
    - min 2 length max 2 length
  - **zipCode**
  - - numbers only
  - **phoneNumber**
    - numbers only
  - **emailAddress**
  - **householdSize**
    - numbers only
- **applicationStatus** will be pending
- On submit:
  - If **emailAddress** and **dateOfApplication** exists:
    - Display error message indicating only one application per day is allowed

## Adoption Application Review

- Display pending applications and applicant contact info
- Display table
  - Applications in pending state
  - Applicants contact info
    - **firstName**
    - **lastName**
    - **address**
      - **street**
      - **city**
      - **state**
      - **zipCode**
    - **phoneNumber**
    - **emailAddress**
  - **Approve** button
  - **Reject** button

## Animal Control Report

- Display table with:
  - Rows: One for each month (current month plus previous 6 months)
  - Columns:
    - Month (start/end dates)
    - Count of dogs surrendered by animal control (clickable)
    - Count of dogs adopted after 60+ days in rescue (clickable)
    - Total expenses for adopted dogs
      - If dog.**animalControl** is true:
        - exclude from expense
  - Current month row shows data up to current date
  - Each count/total is clickable and displays corresponding drill-down report
- Upon clicking a cell, display corresponding drill-down report:

  ### Animal Control Surrenders Drill-down

  - Display table with columns:
    - **dogID**
    - **breeds** (multiple breeds combined alphabetically)
    - **sex**
    - **altered**
    - **microChipID**
    - **surrenderDate**
  - Sort by **dogID** ascending

  ### Dogs Adopted (60+ days) Drill-down

  - Display table with columns:
    - **dogID**
    - **breeds** (multiple breeds combined alphabetically)
    - **sex**
    - **microChipID**
    - **surrenderDate**
    - **daysInRescue** (count includes both surrender and adoption dates)
  - Sort by **daysInRescue** descending, then by **dogID** descending

  ### Adopted Dogs Expenses Drill-down

  - Display table with columns:
    - **dogID**
    - **breeds** (multiple breeds combined alphabetically)
    - **sex**
    - **microChipID**
    - **surrenderDate**
    - **animalControlSurrender** indicator
    - **totalExpenses**
      - If dog.**animalControl** is true:
        - exclude from expense
  - Sort by **dogID** ascending

## Monthly Adoption Report

- Display table for previous 12 months (excluding current month):
  - Columns:
    - Month/Year
    - Number of dogs surrendered
    - Number of dogs adopted
    - Total expenses
      - If dog.**animalControl** is true:
        - exclude from expense
    - Total adoption fees
      - Calculate per dog:
        - If dog.**animalControl** is true:
          - **adoptionFee** = **totalExpenses** \* 0.10
        - Else:
          - **adoptionFee** = **totalExpenses** \* 1.25
    - Net profit
      - **totalAdoptionFees** - **totalExpenses**
  - Group rows by breed:
    - Show only breeds adopted/surrendered in 12-month period
    - For multiple breeds, combine names alphabetically with delimiter
  - Sort by:
    - Month ascending (earliest to latest)
    - Breed name alphabetically

## Expense Analysis

- Display table with:
  - **vendorName**
  - **totalExpenses** across all dogs
    - If dog.**animalControl** is true:
      - exclude from expense
- Sort by **totalExpenses** descending

## Volunteer Lookup

- Display table for previous 12 months (excluding current month):
  - Columns:
    - Month/Year
    - Number of dogs surrendered
    - Number of dogs adopted
    - Total expenses
      - If dog.**animalControl** is true:
        - exclude from expense
    - Total adoption fees
      - If dog.**animalControl** is true:
        - **adoptionFee** = **totalExpenses** \* 0.10
        - Else:
          - **adoptionFee** = **totalExpenses** \* 1.25
    - Net profit
      - **totalAdoptionFees** - **totalExpenses**
  - Group rows by breed:
    - Show only breeds adopted/surrendered in 12-month period
    - For multiple breeds, combine names alphabetically with delimiter
  - Sort by:
    - Month ascending (earliest to latest)
    - Breed name alphabetically

## Volunteer Birthdays

- Display month/year selection:
  - Dropdown with all months
  - Year options limited to current and previous year
  - Default to current month/year
- For selected month:
  - If no birthdays: Display message "No volunteer birthdays this month!"
  - If birthdays exist, display table with:
    - **firstName**
    - **lastName**
    - **emailAddress**
    - **milestoneBirthday** (Yes/No for ages divisible by 10)
- Sort by **lastName** ascending, then **firstName** ascending
