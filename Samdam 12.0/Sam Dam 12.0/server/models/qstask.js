const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var qsTaskSchema = new mongoose.Schema({
   allocation_date: {type:Date},
   type:{type:Array},
   task_id:{type:String},
   name:{type:String},
   site:{type:Array},
   site_id:{type:String},
   length:{type:Number},
   width:{type:Number},
   height:{type:Number},
   weight:{type:Number},
   progress:{type:Number},
   month:{type:String}
   
   
});

var getAllQsTaskSchema = new mongoose.Schema({
   allocation_date: {type:Date},
   type:{type:Array},
   task_id:{type:String},
   name:{type:String},
   site:{type:Array},
   site_id:{type:String},
   length:{type:Number},
   width:{type:Number},
   height:{type:Number},
   weight:{type:Number},
   progress:{type:Number},
   month:{type:String}
 })

mongoose.model('qstasks', qsTaskSchema) 
module.exports = mongoose.model('Qstasks',getAllQsTaskSchema);