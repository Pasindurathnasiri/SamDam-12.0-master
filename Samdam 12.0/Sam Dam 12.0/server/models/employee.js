const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var employeeSchema = new mongoose.Schema({
   emp_id : {type: String },
   name_in : {type: String},
   name_full : {type:String},
   nic: {type:String},
   dob:{type:Date},
   dor:{type:Date},
   gender: {type:String},
   address_1 : {type:String},
   address_2 : {type: String},
   tp_no : {type:Number},
   epf : {type:String},
   etf : {type:String},
   site: {type:Array},
   designation: {type:Array},
   day_pay:{type:Number},
   ot_pay:{type:Number},
   remarks : {type:String}
});

var getAllEmployeeSchema = new mongoose.Schema({
   emp_id : {type: String },
   name_in : {type: String},
   name_full : {type:String},
   nic: {type:String},
   dob:{type:Date},
   dor:{type:Date},
   gender: {type:String},
   address_1 : {type:String},
   address_2 : {type: String},
   tp_no : {type:Number},
   epf : {type:String},
   etf : {type:String},
   site: {type:Array},
   designation: {type:Array},
   day_pay:{type:Number},
   ot_pay:{type:Number},
   remarks : {type:String}
})
mongoose.model('employees', employeeSchema) 
module.exports = mongoose.model('Employees',getAllEmployeeSchema);