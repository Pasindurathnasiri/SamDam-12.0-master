const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var dateSchema = new mongoose.Schema({
    date: {type:Date},
    emp_id:{type:String},
    month:{type:String},
    site:{type:Array},
    ot_on_day:{type:Number}
});

var getAllDateSchema = new mongoose.Schema({
    date:{type:Date},
    emp_id:{type:Date},
    month:{type:Number},
    site:{type:Array},
    ot_on_day:{type:Number}
})
mongoose.model('dates',dateSchema)
module.exports = mongoose.model('Dates',getAllDateSchema);