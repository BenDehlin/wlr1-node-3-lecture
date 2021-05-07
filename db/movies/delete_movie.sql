Here we have our delete_movie query. This query will take in
an id when we call the query in the controller. It will use that value
to identify which movie to delete.
DELETE FROM movies
WHERE movie_id = $1;
-- As with all the other queries in this app we want to send back the updated
-- movies data!
SELECT * FROM movies
ORDER BY movie_id;