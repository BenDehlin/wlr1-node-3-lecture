-- Our get_movies query will send back to our controller all
-- of the movies in the movies array. I do not need to include the
-- ORDER BY if I don't want to, the reason I have added that is
-- so that this movie array is always in the same order
SELECT * FROM movies
ORDER BY movie_id;