DELETE FROM movies
WHERE movie_id = $1;
SELECT * FROM movies
ORDER BY movie_id;