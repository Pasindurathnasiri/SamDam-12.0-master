const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var materialSchema = new mongoose.Schema({
   mat_id: {type:String},
   type_material:{type:Array},
   mat_name:{type:String},
   buyer:{type:String},
   dom:{type:Date},
   unit_material:{type:Array},
   price_unit:{type:Number}

});

var getAllMaterialSchema = new mongoose.Schema({
   mat_id: {type:String},
   type_material:{type:Array},
   mat_name:{type:String},
   buyer:{type:String},
   dom:{type:Date},
   unit_material:{type:Array},
   price_unit:{type:Number}
 })

mongoose.model('materials', materialSchema) 
module.exports = mongoose.model('Materials',getAllMaterialSchema);