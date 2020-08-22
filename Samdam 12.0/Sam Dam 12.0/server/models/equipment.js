const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var equipmentSchema = new mongoose.Schema({
    eq_id:{type:String},
    eq_type:{type:Array},
    brand_name:{type:String},
    price_unit:{type:Number},
    buyer:{type:String},
    dom:{type:String},
    amount:{type:Number}
});

var getAllEquipmentSchema = new mongoose.Schema({
    eq_id:{type:String},
    eq_type:{type:Array},
    brand_name:{type:String},
    price_unit:{type:Number},
    buyer:{type:String},
    dom:{type:String},
    amount:{type:Number}
});

mongoose.model('equipments',equipmentSchema)
module.exports = mongoose.model('Equipments',getAllEquipmentSchema);