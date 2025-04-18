## Volunteer Lookup

- Search by first/last name contains (case insensitive)
  - Store input into variable searchText
- Display:
  - First name
  - Last name
  - Email address
  - Phone number
- Sort by last name ascending, first name ascending

---

> SELECT Person.first_name, Person.last_name, Volunteer.email, Person.phone
> FROM Volunteer JOIN Person ON Person.email = Volunteer.email WHERE LOWER(Person.first_name) LIKE LOWER(CONCAT('%',@searchText, '%')) OR LOWER(Person.last_name) LIKE LOWER(CONCAT('%',@searchText, '%')) ORDER BY Person.last_name ASC, Person.first_name ASC;

---

## Volunteer Birthdays

- Display month/year selection:
  - Dropdown with all months
  - Year options limited to current and previous year
  - Default to current month/year
- For selected month and selected year:
  - store user selected month into variable selectedMonth and store user selected year into variable selected year
- If no birthdays: Display message "No volunteer birthdays this month!"
- If birthdays exist, display table with:
  - **firstName**
  - **lastName**
  - **emailAddress**
  - **milestoneBirthday** (Yes/No for ages divisible by 10)
  - Sort by **lastName** ascending, then **firstName** ascending
---

SELECT 
    Person.first_name, 
    Person.last_name, 
    Volunteer.email,
    CASE 
        WHEN (
            YEAR(@selectedYear) - YEAR(Volunteer.birth_date) - 
            CASE 
                WHEN MONTH(Volunteer.birth_date) > @selectedMonth OR 
                     (MONTH(Volunteer.birth_date) = @selectedMonth AND DAY(Volunteer.birth_date) > DAY(CURRENT_DATE)) 
                THEN 1 
                ELSE 0 
            END
        ) % 10 = 0 
        THEN 'Yes' 
        ELSE 'No' 
    END AS milestoneBirthday
FROM 
    Volunteer 
    JOIN Person ON Person.email = Volunteer.email 
WHERE 
    MONTH(Volunteer.birth_date) = @selectedMonth
ORDER BY 
    Person.last_name ASC, 
    Person.first_name ASC;

---
