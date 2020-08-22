const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var chtransactionSchema = new mongoose.Schema({
    doi:{type:String},
    dot:{type:String},
    type:{type:Array},
    month:{type:String},
    chtr_id:{type:String},
    description:{type:String},
    bank_credit:{type:Number},
    bank_debit:{type:Number},
    rec_or_pay:{type:String}

});

var getAllCHTransactionSchema = new mongoose.Schema({
    doi:{type:String},
    dot:{type:String},
    type:{type:Array},
    month:{type:String},
    chtr_id:{type:String},
    description:{type:String},
    bank_credit:{type:Number},
    bank_debit:{type:Number},
    rec_or_pay:{type:String}
     
 })

mongoose.model('chtransactions', chtransactionSchema) 
module.exports = mongoose.model('CHTransactions',getAllCHTransactionSchema);