const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var EQRecord = new mongoose.Schema({
    dot:{type:Date},
    site:{type:Array},
    site_id:{type:String},
    Hoe:{type:Number},
    Mason_Handtool:{type:Number},
    Pan:{type:Number},
    Hammer:{type:Number},
    Ball_Hammer:{type:Number},
    Shovel:{type:Number},
    Handsaw:{type:Number},
    Hacksaw_Metal:{type:Number},
    Wrench:{type:Number},
    Axe:{type:Number},
    Safty_Gloves:{type:Number},
    Safty_Helmet:{type:Number},
    Safty_Glass:{type:Number},
    Drill:{type:Number},
    Grinders:{type:Number},
    Plier:{type:Number},
    Screwdrivers:{type:Number},
    Tape_Measures:{type:Number},
    Spirit_Level:{type:Number},
    Chisel:{type:Number}

});

var getAllEQRecord = new mongoose.Schema({
    dot:{type:Date},
    site:{type:Array},
    site_id:{type:String},
    Hoe:{type:Number},
    Mason_Handtool:{type:Number},
    Pan:{type:Number},
    Hammer:{type:Number},
    Ball_Hammer:{type:Number},
    Shovel:{type:Number},
    Handsaw:{type:Number},
    Hacksaw_Metal:{type:Number},
    Wrench:{type:Number},
    Axe:{type:Number},
    Safty_Gloves:{type:Number},
    Safty_Helmet:{type:Number},
    Safty_Glass:{type:Number},
    Drill:{type:Number},
    Grinders:{type:Number},
    Plier:{type:Number},
    Screwdrivers:{type:Number},
    Tape_Measures:{type:Number},
    Spirit_Level:{type:Number},
    Chisel:{type:Number} 
 })

mongoose.model('eqrecords', EQRecord) 
module.exports = mongoose.model('EQRecords',getAllEQRecord);