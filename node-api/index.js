var express = require('express') //llamamos a Express
var jwt = require('jsonwebtoken')
var bodyParser = require('body-parser');

var app = express()               

var port = process.env.PORT || 8080  // establecemos nuestro puerto


const userRouter = require('./routes/UserRoutes') 

// const secret = process.env.SECRET
const mongoose = require('mongoose');
// Replace the placeholder with your Atlas connection string
const uri = process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/bank_database";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
mongoose.connect(uri)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

// POST /login gets urlencoded bodies
app.use('/user', userRouter);

// iniciamos nuestro servidor
app.listen(port)
console.log('API escuchando en el puerto ' + port)

