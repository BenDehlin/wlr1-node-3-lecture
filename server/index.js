// PACKAGES
// Here we require all the packages we plan on using. For our
// server will will need to npm install and require dotenv, express,
// and massive from this point forward for our server to work.
require('dotenv').config()
const express = require('express')
const massive = require('massive')

// CONTROLLERS
// Here I require my controllers, in this case I only have 1 controller
// but as you might imagine websites will often deal with more than
// one kind of data and in those cases I want to make sure that I bring
// in a controller for each datatype.
const movieCtrl = require('./controllers/movieController.js')


// I have 2 environment variables saved in my .env, one for the port my server
// will run on and one for my connection string to the database. Storing them in
// my database means I can safely push this project to github without people
// getting access to sensitive information like passwords, api keys, or in this
// case connection strings.
const {SERVER_PORT, CONNECTION_STRING} = process.env


// Here I create my app instance by invoking express
const app = express()


// MIDDLEWARE
// here I define all my top level middleware. In this case the only top level
// middleware I am using is express.json() so that my server can translate incoming
// requests that are in json.
app.use(express.json())


//DATABASE CONNECTION
// here I will define my database connection. I do this by invoking massive and passing
// it an object with some configurations on it. In this case the object will just have
// my connection string and my Secure Socket Layer settings but there are many other
// potential settings I could change here.
massive({
  connectionString: CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false
  }
}).then((db) => {
  // my massive connection is a promise so we need to use .then to await the response of
  // the promise. This particular promise will return our database instance as you can
  // see in the parameter for the .then(). We immediately take that database instance
  // and we save it to our "app" using app.set. This will allow us to later on access our
  // database instance from any function in our controllers using req.app.get('db')
  app.set('db', db)
  console.log('Database connected')
  // notice how I moved my server "listening" from the bottom of my file to be inside the
  // .then() of our database connection. This means our server will not be listening on any
  // endpoints until our database connection is successfully established.
  app.listen(SERVER_PORT, () => console.log(`Server is running ${SERVER_PORT}`))
}).catch((err) => console.log(err))

// ENDPOINTS
// Here we define all of our endpoints. In this case we just have movie endpoints. Those endpoint
// handler functions can be found in the ./controllers/movieController.js file.
app.get('/api/movies', movieCtrl.getMovies)
app.post('/api/movies', movieCtrl.addMovie)
app.put('/api/movies/:id', movieCtrl.editMovie)
app.delete('/api/movies/:id', movieCtrl.deleteMovie)

// Go look in ./controllers/movieController.js to see what our endpoints will all do!