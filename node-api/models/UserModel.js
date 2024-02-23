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
  addresses: [{
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

const User = mongoose.model('User', userSchema);

module.exports = User;
