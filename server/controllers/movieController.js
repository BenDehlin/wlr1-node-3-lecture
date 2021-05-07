// First thing to notice here is we no longer keep track of
// a "movies" array at the top of this page. Instead what we will
// do is use our database connection to get our movie information
// that is stored inside of our heroku postgreSQL database.
module.exports = {
  getMovies: (req, res) => {
    // Here we retrieve our database connection that we stored on
    // app. Notice that we do this first thing for every single endpoint.
    const db = req.app.get("db")
    // Our get endpoint is very simple. All we do is access the query to
    // "get movies" that is in our database folder. Please notice that in order
    // to access the query we say db.movies.get_movies(). What this is literally doing
    // is looking in our db folder for a folder called movies and looking inside of that
    // folder for a sql file called get_movies. Before continuing through our controller
    // file go check out our get_movies query to see what it does.
    db.movies
      .get_movies()
      .then((movies) => {
        // When we execute a query using massive it is a promise so to handle the promise we
        // need a .then(). In this case we get the response from the query and send it back to
        // our users. This does not happen automatically, in order for one of our queries to
        // return something we will need to make sure the query contains a SELECT statement.
        // If it does not then the response we get back from the sql query will be null.
        // Since our get ONLY does a SELECT statement this won't mean anything to use yet
        // but once we get to the other queries down below you'll see why this is important.
        // Please note that massive takes this data from being rows in a database and packages it
        // up nicely into javascript for us as an array of objects.
        res.status(200).send(movies)
      })
      .catch((err) => {
        // Just like any promise we want to add a .catch() onto the end of the .then() in order
        // to handle any errors. In my case what I am doing if there is an error is console logging
        // the error in nodemon and then sending a 500 response (server error) back to the user so
        // they are not waiting forever for their request to finish.
        console.log(err)
        res.status(500).send(err)
      })
  },
  addMovie: (req, res) => {
    // Once again we get our database instance first before anything else
    const db = req.app.get("db")
    // When we add a movie we will want the body to contain the information we would like to
    // save in a movie. In my case if you want to add a movie it requires you to send a title,
    // director, image, and rating back on the body.
    const { title, director, image, rating } = req.body
    // After we get our info off the body I am accessing my query in the db folder called add_movie.
    // Note once again I've said db.movies.add_movie(). This is because my add_movie query is inside of
    // the "movies" folder within my db folder. go look in ../../db/movies/add_movie to see what this query
    // will do before continuing.
    db.movies
      .add_movie(title, director, image, rating)
      .then((movies) => {
        // Because after the insert statement I added a SELECT statement that returns all of the movie
        // information I can take that information and immediately send it back to the frontend.
        res.status(200).send(movies)
      })
      .catch((err) => {
        console.log(err)
        res.status(500).send(err)
      })
  },
  editMovie: (req, res) => {
    const db = req.app.get("db")
    // Just like in our noDB projects the edit will need to take in 2 values that we care about.
    // The first is the id of the movie I would like to edit. This information we have made accessible
    // in req.params. We know that we expect a param on the end of the url because in index.js the put and
    // delete endpoints both have :id on the end. The second set of information we need is the values
    // we would like to change this movie to have. Just like in our post endpoint we have included this
    // information on req.body. Any frontend trying to hit the edit endpoint will need to include
    // both of these sets of information for the edit to work properly.
    const { id } = req.params
    const { title, director, image, rating } = req.body
    // note for this query we pass in id, title, director, image, and then rating. THIS ORDER MATTERS.
    // Go take a look at the ../../db/movies/edit_movie.sql file to see what the query will do and why
    // the order matters.
    db.movies
      .edit_movie(id, title, director, image, rating)
      .then((movies) => {
        res.status(200).send(movies)
      })
      .catch((err) => {
        console.log(err)
        res.status(500).send(err)
      })
  },
  deleteMovie: (req, res) => {
    const db = req.app.get("db")
    // Our delete enpoint only needs an id so we can identify what movie the user
    // is trying to delete. Just like in the put endpoint we will define this on
    // the end of the url as a param.
    const { id } = req.params
    db.movies
      .delete_movie(id)
      .then((movies) => {
        res.status(200).send(movies)
      })
      .catch((err) => {
        console.log(err)
        res.status(500).send(err)
      })
  },
}

// Now that we've reviewed the controller go check out each of the database queries
// again to make sure you feel comfortable with all of them. Once a frontend is added
// to this application you can continue this review by visiting ../../src/App.js to see
// what we're doing on the frontend.