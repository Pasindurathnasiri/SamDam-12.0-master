const mongoose = require('mongoose');

const Date = mongoose.model('dates');

let allDates = require('../models/date');

module.exports.addDate = (req,res,next) =>{
    var date = new Date();
    date.date = req.body.datepicker;
    date.emp_id= req.body.emp_id;
    date.month= req.body.month;
    date.site=req.body.site;
    date.ot_on_day=req.body.ot_on_day;

    date.save((err,doc)=>{
        if(!err)
        console.log(date)&& res.send(doc)
        else
        return next(err)
    });
}