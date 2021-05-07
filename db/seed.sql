-- Here is our seed file! This file is not being run by our project
-- but will stores essentially a "blueprint" for our database. In our
-- case we have a very simple database that only has 1 table the "movies"
-- table. Here we define all the values we would like that table to have.
-- Our table has an id just like every other table we create, and in addition
-- to that it has a title, a director, an image, and a rating.

CREATE TABLE movies (
  movie_id SERIAL PRIMARY KEY,
  title VARCHAR(50),
  director VARCHAR(50),
  image VARCHAR(1000),
  rating INT
);