const mongoose = require('mongoose');
const CHTransaction = mongoose.model('chtransactions');

module.exports.addCHTransaction = (req,res,next)=>{
    var chtransaction = new CHTransaction();
    chtransaction.doi = req.body.doi;
    chtransaction.dot = req.body.dot;
    chtransaction.chtr_id = req.body.chtr_id;
    chtransaction.month = req.body.month;
    chtransaction.type = req.body.type;
    chtransaction.bank_credit = req.body.bank_credit;
    chtransaction.bank_debit = req.body.bank_debit;
    chtransaction.description = req.body.description;
    chtransaction.rec_or_pay = req.body.rec_or_pay;
    
    chtransaction.save((err,doc)=>{
        if(!err)
        console.log(chtransaction) && res.send(doc);
        else
        return next(err);
    })
    
}