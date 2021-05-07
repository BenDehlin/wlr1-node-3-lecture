CREATE TABLE movies (
  movie_id SERIAL PRIMARY KEY,
  title VARCHAR(50),
  director VARCHAR(50),
  image VARCHAR(1000),
  rating INT
);