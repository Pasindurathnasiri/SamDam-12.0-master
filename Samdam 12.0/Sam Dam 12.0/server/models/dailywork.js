const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var dailyWorkSchema = new mongoose.Schema({
    task_id:{type:String},
    site_id:{type:String},
    month:{type:String},
    date:{type:String},
    length:{type:Number},
    width:{type:Number},
    height:{type:Number},
    weight:{type:Number}

});

var getAllDailyWorks = new mongoose.Schema({
    task_id:{type:String},
    site_id:{type:String},
    month:{type:String},
    date:{type:String},
    length:{type:Number},
    width:{type:Number},
    height:{type:Number},
    weight:{type:Number}
     
 })

mongoose.model('dailyworks', dailyWorkSchema) 
module.exports = mongoose.model('DailyWorks',getAllDailyWorks);