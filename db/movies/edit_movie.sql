UPDATE movies
SET (title, director, image, rating) =
($2, $3, $4, $5)
WHERE movie_id = $1;
SELECT * FROM movies
ORDER BY movie_id;