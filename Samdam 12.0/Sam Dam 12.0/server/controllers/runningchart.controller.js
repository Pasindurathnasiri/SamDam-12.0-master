const mongoose = require('mongoose');
const RunningChart = mongoose.model('runningcharts');

module.exports.addRunningChart = (req,res,next)=>{
    var runningChart = new RunningChart();
    runningChart.date = req.body.date;
    runningChart.reg_id = req.body.reg_id;
    runningChart.site = req.body.site;
    runningChart.site_id = req.body.site_id;
    runningChart.driver = req.body.driver;
    runningChart.month = req.body.month;
    runningChart.km_or_hr = req.body.km_or_hr;
    runningChart.description = req.body.description;
    runningChart.fuel_input = req.body.fuel_input;
    runningChart.save((err,doc)=>{
        if(!err)
        console.log(runningChart) && res.send(doc);
        else
        return next(err);
    })
    
}