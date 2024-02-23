const mongoose = require('mongoose')

const TransactionSchema = new mongoose.Schema({
    ammount: Number,
    date: String,
    currency: String,
    account_from: Number,
    account_to: Number
})

const LoanSchema = new mongoose.Schema({
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
})

module.exports = {
    TransactionSchema: TransactionSchema,
    LoanSchema: LoanSchema
}