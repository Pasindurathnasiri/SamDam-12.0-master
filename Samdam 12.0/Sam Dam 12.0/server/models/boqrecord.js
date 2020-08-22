const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var bqqRecordSchema = new mongoose.Schema({
    site_id:{type:String},
    rec_no:{type:String},
    description:{type:String},
    unit:{type:Array},
    rate:{type:Number},
    quantity:{type:Number}

});

var getAllBOQRecord = new mongoose.Schema({
    site_id:{type:String},
    rec_no:{type:String},
    description:{type:String},
    unit:{type:Array},
    rate:{type:Number},
    quantity:{type:Number} 
 })

mongoose.model('boqrecords', bqqRecordSchema) 
module.exports = mongoose.model('BOQRecords',getAllBOQRecord);