INSERT INTO movies
(title, director, image, rating)
VALUES
($1, $2, $3, $4);
SELECT * FROM movies
ORDER BY movie_id;