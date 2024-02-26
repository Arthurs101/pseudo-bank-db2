const mongoose = require('mongoose');

const branchSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true
  },
  street: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  zip_code: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['small', 'medium', 'large'],
    default: 'small'
  }
});

const Branch = mongoose.model('Branch', branchSchema);

module.exports = Branch;
