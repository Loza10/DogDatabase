-- note: MySQL does not have full outer join, using UNION ALL with 0s AS placeholders to keep unASsociated cols separate
-- QUERY 1: FULL DASHBOARD
WITH RECURSIVE calendar(date) AS (
SELECT makedate(2023,1) UNION ALL 
SELECT DATE_ADD(date,INTERVAL 1 Month) FROM calendar WHERE  date < CURRENT_DATE
)

SELECT DATE_FORMAT(calendar.date, '%m-%Y') AS Month, COALESCE(SUM(combined.CountSurrendered),0) AS 'Dogs Surrendered by Animal Control', COALESCE(SUM(combined.CountAdopted),0) AS 'Adopted Dogs in Shelter >60 Days', COALESCE(SUM(combined.TotalExpenses),0) AS 'Total Expenses From All Adopted Dogs' FROM calendar LEFT JOIN (
-- surrendered by animal control
(SELECT DATE_FORMAT(d.surrender_date, '%m-%Y') AS `Month`, count(d.dogID) AS CountSurrendered, 0 AS CountAdopted, 0 AS TotalExpenses
 FROM Dog d
 WHERE d.by_animal_control = 1
 AND PERIOD_DIFF(EXTRACT(YEAR_Month FROM NOW()), EXTRACT(YEAR_Month FROM d.surrender_date)) <= 6
 GROUP BY d.surrender_date)
 UNION ALL
 -- Adoption after 60 days in shelter
(SELECT DATE_FORMAT(ad.decision_date, '%m-%Y') AS `Month`, 0 AS CountSurrendered, count(ad.dogID) AS CountAdopted, 0 AS TotalExpenses
 FROM Adoption ad JOIN Dog d ON ad.dogID = d.dogID
 WHERE DATEDIFF(ad.decision_date, d.surrender_date) >= 60
 AND PERIOD_DIFF(EXTRACT(YEAR_Month FROM NOW()), EXTRACT(YEAR_Month FROM ad.decision_date)) <= 6
 GROUP BY ad.decision_date)
 UNION ALL
 -- expenses for adopted dogs
 (SELECT DATE_FORMAT(ad.decision_date, '%m-%Y') AS `Month`, 0 AS CountSurrendered, 0 AS CountAdopted, SUM(e.amount) AS TotalExpenses
 FROM Adoption ad LEFT JOIN Expense e ON ad.dogID = e.dogID
 WHERE PERIOD_DIFF(EXTRACT(YEAR_Month FROM NOW()), EXTRACT(YEAR_Month FROM ad.decision_date)) <= 6
 GROUP BY ad.decision_date)) AS combined ON DATE_FORMAT(calendar.date, '%m-%Y') = combined.Month
 WHERE PERIOD_DIFF(EXTRACT(YEAR_Month FROM NOW()), EXTRACT(YEAR_Month FROM calendar.date)) <= 6 AND PERIOD_DIFF(EXTRACT(YEAR_Month FROM NOW()), EXTRACT(YEAR_Month FROM calendar.date)) >=0
 GROUP BY DATE_FORMAT(calendar.date, '%m-%Y'), combined.Month, calendar.date
 ORDER BY calendar.date;
 -- Footnote: calendar is a recursive object to create the month-year dates in scope
 -- calendar = ('2025-03-01','2025-02-01', ...) for past 6 months
 -- If a month-year in scope does not exist in the database, the calendar object inserts it with 0s for all fields
 
 
 -- QUERY 2: Animal control surrenders drilldown
set @Month = '09-2024';
 SELECT d.dogID AS 'Dog ID', COALESCE(GROUP_CONCAT(DISTINCT db.name ORDER BY db.name SEPARATOR '/'), 'Unknown') AS Breed, d.sex AS Sex, d.altered AS Altered, dm.microchipID AS 'Microchip ID', d.surrender_date AS 'Surrender Date'
 FROM Dog d LEFT JOIN DogBreed db ON db.dogID = d.dogID LEFT JOIN DogMicrochip dm ON dm.dogID = d.dogID
 WHERE d.by_animal_control = 1
 AND PERIOD_DIFF(EXTRACT(YEAR_Month FROM NOW()), EXTRACT(YEAR_Month FROM d.surrender_date)) <= 6
 AND DATE_FORMAT(d.surrender_date, '%m-%Y') = @Month
 GROUP BY d.dogID
ORDER BY d.dogID;
 
 -- QUERY 3: Dogs adopted in the rescue 60 days or more drilldown
 set @Month = '03-2025';
 SELECT d.dogID AS 'Dog ID', COALESCE(GROUP_CONCAT(DISTINCT db.name ORDER BY db.name SEPARATOR '/'), 'Unknown') AS Breed, d.sex AS Sex, dm.microchipID AS 'Microchip ID', d.surrender_date AS 'Surrender Date', DATEDIFF(ad.decision_date, d.surrender_date) AS 'Days in Rescue'
 FROM Adoption ad JOIN Dog d ON ad.dogID = d.dogID LEFT JOIN DogBreed db ON db.dogID = d.dogID LEFT JOIN DogMicrochip dm ON dm.dogID = d.dogID
 WHERE DATEDIFF(ad.decision_date, d.surrender_date) >= 60
 AND PERIOD_DIFF(EXTRACT(YEAR_Month FROM NOW()), EXTRACT(YEAR_Month FROM ad.decision_date)) <= 6
 AND DATE_FORMAT(ad.decision_date, '%m-%Y') = @Month
GROUP BY d.dogID, ad.decision_date
ORDER BY  DATEDIFF(ad.decision_date, d.surrender_date) DESC, d.dogID DESC;

-- QUERY 4: Total expenses for dogs adopted drilldown
 set @Month = '09-2024';
 SELECT combined.dogID AS 'Dog ID', combined.breeds AS Breed, combined.sex AS Sex, combined.microchipID AS 'Microchip ID', combined.surrender_date AS 'Surrender Date', combined.by_animal_control AS 'Surrendered by Animal Control', SUM(combined.amount) AS 'Total Expenses' FROM (
SELECT d.dogID, COALESCE(GROUP_CONCAT(DISTINCT db.name ORDER BY db.name SEPARATOR '/'), 'Unknown') AS breeds, d.sex, dm.microchipID, d.surrender_date, d.by_animal_control, e.amount
 FROM Adoption ad JOIN Dog d ON ad.dogID = d.dogID LEFT JOIN DogBreed db ON db.dogID = d.dogID LEFT JOIN DogMicrochip dm ON dm.dogID = d.dogID JOIN Expense e ON d.dogID = e.dogID
 WHERE PERIOD_DIFF(EXTRACT(YEAR_Month FROM NOW()), EXTRACT(YEAR_Month FROM ad.decision_date)) <= 6
AND DATE_FORMAT(ad.decision_date, '%m-%Y') = @Month
GROUP BY d.dogID, e.amount
) AS combined
GROUP BY combined.dogID, combined.breeds, combined.sex, combined.microchipID, combined.surrender_date, combined.by_animal_control
ORDER BY combined.dogID;