const fs = require("fs")
const bodyParser = require("body-parser")
const db = require('./db/index')
const movieRoute = require('./routes/movies')
const reviewRoute = require('./routes/reviews')
const registerRoute = require('./routes/register')

const express = require('express')
const app = express()
const port = 3001


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/',(req,res) => {
   res.send("hello world")
});

app.use('/movies', movieRoute)
app.use('/reviews', reviewRoute)
app.use('/register', registerRoute)


let server = app.listen(3001);

module.exports = {
   app,
   server
}
