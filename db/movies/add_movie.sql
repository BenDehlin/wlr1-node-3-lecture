-- Our add_movie query will add a title, director, image, and rating. It will
-- automatically also receive a movie_id since that is our SERIAL PRIMARY KEY.
-- Remember that the order we pass information in here matters! For things to
-- match up properly when we call this query in the controller we need to pass it
-- in in this order: title, director, image, rating. Why is that? Because we define it
-- that way down below. The value we are giving title is $1 or the first thing we passed
-- in. The value we give director is $2 is the second thing we pass in. image is $3, and rating
-- will be $4.
INSERT INTO movies
(title, director, image, rating)
VALUES
($1, $2, $3, $4);

-- Notice how after I do my insert I am doing the same SELECT statement I did in get_movies.
-- This means after I add my movie I would like to get the updated movie information from the
-- table. You don't have to do this but if you're expecting the query to return something a
-- SELECT statement is required!
SELECT * FROM movies
ORDER BY movie_id;