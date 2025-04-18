WITH breeds AS
(
	SELECT
		b.dogID,
		GROUP_CONCAT(b.name ORDER BY b.name SEPARATOR '/') AS names
	FROM DogBreed b
	GROUP BY b.dogID
),
dogs AS 
(
	SELECT
		d.*,
		b.names AS breed
	FROM Dog d
	JOIN breeds b ON b.dogID = d.dogID
),
surrendered_dogs AS
(
	SELECT 
		DATE_FORMAT(d.surrender_date, '%Y%m') AS period,
    	d.breed,
    	COUNT(*) AS surrendered
 	FROM dogs d
	GROUP BY
		DATE_FORMAT(d.surrender_date, '%Y%m'),
		d.breed 
),
adopted_dogs AS 
(
	SELECT
    	DATE_FORMAT(a.decision_date, '%Y%m') AS period,
		d.breed,
		COUNT(*) AS adopted
	FROM dogs d
	LEFT JOIN Adoption a ON a.dogID = d.dogID
	WHERE a.dogID IS NOT NULL
	GROUP BY
		DATE_FORMAT(a.decision_date, '%Y%m'),
		d.breed 
),
expenses AS
(
	SELECT
    	DATE_FORMAT(e.date, '%Y%m') AS period,
    	d.breed,
		SUM(COALESCE(e.amount, 0.0)) AS spent,
		SUM(
			(CASE WHEN a.decision_date IS NULL THEN 0.00 ELSE 1.00 END) *
			(CASE WHEN d.by_animal_control = 1 THEN 0.10 ELSE 1.25 END) *
			COALESCE(e.amount, 0.0)
		) AS fees,
		SUM(
			(CASE WHEN a.decision_date IS NULL THEN 0.00 ELSE 1.00 END) *
			(CASE WHEN d.by_animal_control = 1 THEN 0.00 ELSE 0.25 END) *
			COALESCE(e.amount, 0.0)
		) AS profit
	FROM dogs d
	LEFT JOIN Expense e ON e.dogID = d.dogID
	LEFT JOIN Adoption a ON a.dogID = e.dogID
		AND DATE_FORMAT(a.decision_date, '%Y%m') = DATE_FORMAT(e.date, '%Y%m')
	WHERE
		e.dogID IS NOT NULL
	GROUP BY
		DATE_FORMAT(e.date, '%Y%m'),
		d.breed 
),
combined AS 
(
	SELECT
		s.period,
		s.breed,
		s.surrendered,
		0 AS adopted,
		0 AS spent,
		0 AS fees,
		0 AS profit
	FROM surrendered_dogs s
	
	UNION
	
	SELECT 
		a.period,
		a.breed,
		0 AS surrendered,
		a.adopted,
		0 AS spent,
		0 AS fees,
		0 AS profit
	FROM adopted_dogs a
	
	UNION
	
	SELECT
		e.period,
		e.breed,
		0 AS surrendered,
		0 AS adopted,
		e.spent,
		e.fees,
		e.profit
	FROM expenses e
)
SELECT
	LEFT(DATE_FORMAT(CONCAT(c.period, '01'), '%Y-%M'), 8) AS period,
	c.breed,
	SUM(c.surrendered) AS surrendered,
	SUM(c.adopted) AS adopted,
	SUM(c.spent) AS expenses,
	SUM(c.fees) AS fees,
	SUM(c.profit) AS profit
FROM combined c
WHERE c.period BETWEEN DATE_FORMAT(DATE_ADD(CURDATE(), INTERVAL -13 MONTH), '%Y%m') AND DATE_FORMAT(DATE_ADD(CURDATE(), INTERVAL -1 MONTH), '%Y%m')
GROUP BY
	c.period,
	c.breed
ORDER BY
	c.period,
	c.breed;
