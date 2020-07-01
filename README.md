# GMDB USAF Checkpoint

## Objectives
   - Create a REST API that uses Express and connects to a database (not an in-memory data store)
   - Test your application using Jest and Supertest 

## Background
As of right now, you have been given a basic setup of an application using Express. In the `app.js` file, you will write the code to generate the REST API that connects to your database. 

You will need to set up your own Postgres database where your data will persist.

Your job is to build out the necessary endpoints (listed below) and create the back-end functionality of the GMDB application that you've previously worked on.

## Instructions

### Back End Service Setup:
- Fork and clone this repo using git
- To install the back end service and dependencies, run `npm install` in the root of the project directory
- To start the server, cd into the `server` folder and run `npm run start`
- The server will be available at `http://localhost:${port}` (in this case, `port` is set to 3001) 

#### Necessary Service Endpoints
- `GET movies` - returns a list of all movies
- `GET movies/:id` - returns details of a specific movie
- `GET movies?search=<query>` - returns a list of movies filtered on titles matching the given query
- `GET reviews/:movieId` - returns all reviews for a given movie
- `POST reviews` - creates a new review, returns success status in JSON response 
- `POST register` - creates a new user, returns success status in JSON response

# Our contribution
### Use setup.sql for server
