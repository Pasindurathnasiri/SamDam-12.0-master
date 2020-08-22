const mongoose = require('mongoose');
const DailyWork = mongoose.model('dailyworks');

module.exports.addDailyWork = (req,res,next)=>{
    var dailywork = new DailyWork();
    dailywork.task_id = req.body.task_id;
    dailywork.site_id = req.body.site_id;
    dailywork.date = req.body.date;
    dailywork.month = req.body.month;
    dailywork.length = req.body.length;
    dailywork.width = req.body.width;
    dailywork.height = req.body.height;
    dailywork.weight = req.body.weight;
    
    dailywork.save((err,doc)=>{
        if(!err)
        console.log(dailywork) && res.send(doc);
        else
        return next(err);
    })
    
}