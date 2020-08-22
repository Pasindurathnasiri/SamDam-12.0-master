const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var transactionSchema = new mongoose.Schema({
   dor: {type:String},
   tr_id:{type:String},
    site:{type:Array},
    site_id:{type:String},
    month:{type:String},
    description:{type:String},
    bank_credit:{type:Number},
    bank_debit:{type:Number},
    cash_debit:{type:Number},
    cash_credit:{type:Number}
    

});

var getAllTransactionSchema = new mongoose.Schema({
    dor: {type:String},
    tr_id:{type:String},
     site:{type:Array},
     site_id:{type:String},
     month:{type:String},
     description:{type:String},
     bank_credit:{type:Number},
     bank_debit:{type:Number},
     cash_debit:{type:Number},
     cash_credit:{type:Number}
     
 })

mongoose.model('transactions', transactionSchema) 
module.exports = mongoose.model('Transactions',getAllTransactionSchema);