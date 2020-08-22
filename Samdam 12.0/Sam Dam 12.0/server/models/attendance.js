const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var attendanceSchema = new mongoose.Schema({
    emp_id:{type:String},
    name_in:{type:String},
    site:{type:Array},
    days:{type:Number},
    ots:{type:Number},
    day_pay:{type:Number},
    ot_pay:{type:Number},
    designation: {type:Array},
    advance_req:{type:Number},
    advance_paid:{type:Number},
    date_details:{type:Array}
});

var getAllAttendanceSchema = new mongoose.Schema({
    emp_id:{type:String},
    name_in:{type:String},
    site:{type:Array},
    days:{type:Number},
    ots:{type:Number},
    day_pay:{type:Number},
    ot_pay:{type:Number},
    designation: {type:Array},
    advance_req:{type:Number},
    advance_paid:{type:Number},
    date_details:{type:Array}
})
mongoose.model('attendance',attendanceSchema)
module.exports = mongoose.model('Attendances',getAllAttendanceSchema);