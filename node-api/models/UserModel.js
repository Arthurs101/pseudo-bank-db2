const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  names: String,
  lastnames: String,
  birthdate: String,
  nationality: String,
  credit_score: Number,
  user_code: Number,
  hashed_password: String,
  accounts: [{
    account_number: String,
    type: String,
    balance: Number,
    currency: String,
    status: String,
    created_at: String,
    created_in: mongoose.Schema.Types.ObjectId
  }],
  phones: [{
    number: Number,
    postal_code: String,
    brand: String
  }],
  adrresses: [{
    street_name: String,
    zip_code: String,
    city: String
  }],
  loans: [{
    ammount: Number,
    due_date: String,
    currency: String,
    payments: [{
      date: String,
      ammount: Number,
      currency: String
    }],
    status: String,
    interest: Number,
    interest_rate: String
  }],
  type: String
});
// Esquema para la creación de usuarios
const createUserSchema = new mongoose.Schema({
  names: { type: String, required: true },
  lastnames: { type: String, required: true },
  birthdate: { type: String, required: true },
  nationality: { type: String, required: true },
  hashed_password: { type: String, required: true },
  phones: [{
      number: { type: Number },
      postal_code: { type: String },
      brand: { type: String }
  }],
  adrresses: [{
      street_name: { type: String },
      zip_code: { type: String },
      city: { type: String }
  }],
  type: { type: String, enum: ['admin', 'personnel', 'client'], required: true },
  credit_score: { type: Number, default: 0 },
  user_code: { type: Number, unique: true, required: true, default: () => Math.floor(Math.random() * 10000000000000) }
});






const User = mongoose.model('User', userSchema);
const CreateUserModel = mongoose.model('CreateUser', createUserSchema);

module.exports = {User:User, newUserModel: CreateUserModel};
