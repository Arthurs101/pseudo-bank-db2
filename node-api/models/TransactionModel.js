const mongoose = require('mongoose')

const TransactionSchema = new mongoose.Schema({
    ammount: Number,
    date: String,
    currency: String,
    account_from: mongoose.Types.ObjectId,
    account_to: mongoose.Types.ObjectId
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
const Transaction = new mongoose.model('Transaction', TransactionSchema)
const Loans = new mongoose.model('Loans', LoanSchema)
module.exports = {
    TransactionModel: Transaction,
    LoansModel: Loans
}