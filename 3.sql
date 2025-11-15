SELECT title FROM movies JOIN ratings ON id =  ratings.movie_id WHERE year = '2008' ORDER BY rating DESC, title ASC ;
SELECT title FROM movies WHERE year = '2008' ORDER BY title DESC;

