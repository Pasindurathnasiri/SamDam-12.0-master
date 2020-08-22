
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var vehicleSchema = new mongoose.Schema({
    reg_id:{type:String},
    vh_type:{type:Array},
    brand:{type:String},
    vh_model:{type:String},
    buyer:{type:String},
    dor:{type:Date},
    eng_cap:{type:Number},
    valueVH:{type:Number},
    chassie_no:{type:String},
    eng_no:{type:String},
    site:{type:Array},
    site_id:{type:String},
    fuel_type:{type:Array},
    unit_rate:{type:Number},
    driver:{type:Array}

});

var getAllVehicleSchema = new mongoose.Schema({
    reg_id:{type:String},
    vh_type:{type:Array},
    brand:{type:String},
    vh_model:{type:String},
    buyer:{type:String},
    dor:{type:Date},
    eng_cap:{type:Number},
    valueVH:{type:Number},
    chassie_no:{type:String},
    eng_no:{type:String},
    site:{type:Array},
    site_id:{type:String},
    fuel_type:{type:Array},
    unit_rate:{type:Number},
    driver:{type:Array}
 })

mongoose.model('vehicles', vehicleSchema) 
module.exports = mongoose.model('Vehicles',getAllVehicleSchema);