const mongoose = require('mongoose');

const Employee = mongoose.model('employees');  
const Attendance = mongoose.model('attendance');

let allStudents =require('../models/employee');


module.exports.addEmployee = (req,res,next) =>{
   var employee = new Employee(); 
   var attendance = new Attendance();
   employee.emp_id= req.body.emp_id;
   employee.name_in= req.body.name_in;
   employee.name_full= req.body.name_full;
   employee.nic= req.body.nic;
   employee.dob= req.body.dob;
   employee.dor= req.body.dor;
   employee.gender = req.body.gender;
   employee.address_1= req.body.address_1;
   employee.address_2= req.body.address_2;
   employee.tp_no= req.body.tp_no;
   employee.epf=req.body.epf;
   employee.etf= req.body.etf;
   employee.site= req.body.site;
   employee.designation= req.body.designation;
   employee.day_pay= req.body.day_pay;
   employee.ot_pay= req.body.ot_pay;
   employee.remarks= req.body.remarks;
   attendance.emp_id = req.body.emp_id;
   attendance.name_in = req.body.name_in;
   attendance.site = req.body.site;
   attendance.designation = req.body.designation;
   attendance.day_pay = req.body.day_pay;
   attendance.ot_pay = req.body.ot_pay;
   attendance.days = 0;
   attendance.ots= 0;
   attendance.advance_req=0;
   attendance.advance_paid=0;
   
   employee.save((err,doc)=>{
       if (!err)
       console.log(employee)&& res.send(doc);
       else
       return next(err);     
   });
   attendance.save((err,doc)=>{
        if (!err)
        console.log(attendance) && res.send(doc);
        else
        return next(err);
   });

}; 
