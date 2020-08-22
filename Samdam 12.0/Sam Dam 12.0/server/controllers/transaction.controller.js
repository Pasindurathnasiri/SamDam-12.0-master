const mongoose = require('mongoose');
const Transaction = mongoose.model('transactions');

module.exports.addTransaction = (req,res,next)=>{
    var transaction = new Transaction();
    transaction.dor = req.body.dor;
    transaction.tr_id = req.body.tr_id;
    transaction.site = req.body.site;
    transaction.site_id= req.body.site_id;
    transaction.month = req.body.month;
    transaction.bank_credit = req.body.bank_credit;
    transaction.bank_debit = req.body.bank_debit;
    transaction.cash_debit = req.body.cash_debit;
    transaction.cash_credit = req.body.cash_credit;
    transaction.description = req.body.description;
    transaction.save((err,doc)=>{
        if(!err)
        console.log(transaction) && res.send(doc);
        else
        return next(err);
    })
    
}