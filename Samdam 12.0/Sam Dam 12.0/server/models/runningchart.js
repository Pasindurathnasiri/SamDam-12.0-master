const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var runningChartSchema = new mongoose.Schema({
   date: {type:String},
   reg_id:{type:String},
    site:{type:Array},
    site_id:{type:String},
    driver:{type:Array},
    month:{type:String},
    km_or_hr:{type:Number},
    description:{type:String},
    fuel_input:{type:Number},

});

var getAllRunningChartSchema = new mongoose.Schema({
    date: {type:String},
    reg_id:{type:String},
     site:{type:Array},
     site_id:{type:String},
     driver:{type:Array},
     month:{type:String},
     km_or_hr:{type:Number},
     description:{type:String},
     fuel_input:{type:Number},
 })

mongoose.model('runningcharts', runningChartSchema) 
module.exports = mongoose.model('RunningCharts',getAllRunningChartSchema);