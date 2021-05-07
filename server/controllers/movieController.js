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
        res.status(200).send(movies)
      })
      .catch((err) => {
        console.log(err)
        res.status(500).send(err)
      })
  },
  addMovie: (req, res) => {
    const db = req.app.get("db")
    const { title, director, image, rating } = req.body
    db.movies
      .add_movie(title, director, image, rating)
      .then((movies) => {
        res.status(200).send(movies)
      })
      .catch((err) => {
        console.log(err)
        res.status(500).send(err)
      })
  },
  editMovie: (req, res) => {
    const db = req.app.get("db")
    const { id } = req.params
    const { title, director, image, rating } = req.body
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
