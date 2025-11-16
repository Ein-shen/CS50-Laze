SELECT name FROM movies JOIN people ON movies.id = people.id WHERE name = 'Toy Story';
SELECT title, name FROM movies JOIN people ON movies.id = people.id LIKE '%Toy Story%';
