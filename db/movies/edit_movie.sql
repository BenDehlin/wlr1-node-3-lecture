-- Our update query will update an existing movie with new information!
-- Note how in this case we are setting title to be $2 or the second thing
-- that got passed in, director = $2, image = $3, and rating is $4. We do
-- this so that the first thing we pass in (or in other words $1) can be
-- the movie id that we want to edit!

UPDATE movies
SET (title, director, image, rating) =
($2, $3, $4, $5)
WHERE movie_id = $1;
-- Once again after we update the movie we want to get all the movies to send
-- back to the user.
SELECT * FROM movies
ORDER BY movie_id;