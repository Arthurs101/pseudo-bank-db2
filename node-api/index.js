var express = require('express') //llamamos a Express
var jwt = require('jsonwebtoken')
var bodyParser = require('body-parser');
const User = require('./models/UserModel');
var app = express()               

var port = process.env.PORT || 8080  // establecemos nuestro puerto

// const secret = process.env.SECRET
const mongoose = require('mongoose');
// Replace the placeholder with your Atlas connection string
const uri = process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/bank_database";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
mongoose.connect(uri)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

// POST /login gets urlencoded bodies
app.post('/login', async function (req, res) {
    try {
      // Obtener el user_id y la contraseña del cuerpo de la solicitud
      const { user_code, password } = req.body;
      console.log(user_code)
      // Buscar el usuario por user_id
      const user = await User.findOne({ user_code: Number(user_code) });
      // Verificar si el usuario existe y la contraseña coincide
      if (!user || user.hashed_password !== password) {
        // Devolver un mensaje de error si el usuario no se encuentra o la contraseña no coincide
        return res.status(404).json({ message: 'Usuario no encontrado o contraseña incorrecta' });
      }
  
      // Si el usuario y la contraseña son correctos, devolver los detalles del usuario
      res.json(user);
    } catch (error) {
      // Manejar cualquier error
      console.error('Error al iniciar sesión:', error);
      res.status(500).json({ message: 'Error al iniciar sesión' });
    }
  });

// iniciamos nuestro servidor
app.listen(port)
console.log('API escuchando en el puerto ' + port)

