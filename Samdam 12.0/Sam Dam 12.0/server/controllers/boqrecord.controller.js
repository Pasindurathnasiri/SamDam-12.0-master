const mongoose = require('mongoose');
const BOQRecord = mongoose.model('boqrecords');

module.exports.addBOQRecords = (req,res,next)=>{
    var boqrecord = new BOQRecord();
    boqrecord.site_id = req.body.site_id;
    boqrecord.rec_no = req.body.rec_no;
    boqrecord.description = req.body.description;
    boqrecord.unit = req.body.unit;
    boqrecord.rate = req.body.rate;
    boqrecord.quantity = req.body.quantity;
    boqrecord.save((err,doc)=>{
        if(!err)
        console.log(boqrecord) && res.send(doc);
        else
        return next(err);
    })
    
}