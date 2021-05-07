## What I did to set up:
1. ran `npx create-react-app wlr1-node-3-lecture` and cd'd into it
2. created a `.env` file with my `CONNECTION_STRING` and `SERVER_PORT` inside of it.
3. ADDED MY `.env` TO MY `.gitignore` THIS IS THE MOST IMPORTANT STEP IN MY SETUP
4. created a `server` folder in the root folder with an `index.js` inside of it
5. created a `controllers` folder inside of the server folder with `movieController.js` inside
6. created a `db` folder with a `seed.sql` file inside of it
7. created a `movies` folder inside the db folder to contain all of our movie queries
8. at the root ran `npm install express massive dotenv` to install my server dependencies
9. Added `"main": "server/index.js",` to my `package.json`


## What you will need to do if you want to fork and clone this project
1. run `npm install` to install the dependencies I have added. You do not need to specify express massive and dotenv because the `package.json` knows that those are dependencies for this project from when I ran it already.
2. create your own .env file with `CONNECTION_STRING` and `SERVER_PORT` inside. You don't need to add `.env` to your `.gitignore` because I already have done that for you but if this was your own project you would NEED TO DO THIS.
3. run `nodemon` to start your server. Right now we have not added a frontend yet so this should be all you need to get started.

## What files are important for this project?
1. Our starting point as always will be `./server/index.js`
2. Our controller file will be in `./server/controllers/movieController.js`
3. Our database blueprint can be found in `./db/seed.sql`
4. Each query we execute can be found in `./db/movies/`. Currently there are 4 queries total, one each for get, add, edit, delete.


### To get started with the detailed notes start following the instructions inside of ./server/index.js