var express = require('express') //llamamos a Express
var jwt = require('jsonwebtoken')
var bodyParser = require('body-parser');
var app = express()               

var port = process.env.PORT || 8080  // establecemos nuestro puerto

// const secret = process.env.SECRET
const mongo = require('./db')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

// POST /login gets urlencoded bodies
app.post('/login', function (req, res) {
  console.log('receiving data...');
  console.log('body is ',req.body);
  res.send(req.body);
})

// iniciamos nuestro servidor
app.listen(port)
console.log('API escuchando en el puerto ' + port)

