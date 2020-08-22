const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var MaterialDateSchema = new mongoose.Schema({
    Date:{type:String},
    site:{type:Array},
    site_id:{type:String},
    month:{type:String},
    T_10:{type:Number},
    T_32:{type:Number},
    sand:{type:Number},
    cement:{type:Number},
    ABC:{type:Number},
    binding:{type:Number},
    metal_1:{type:Number},
    metal_1h:{type:Number},
    metal_3q:{type:Number},
    T_16:{type:Number},
    HBlock_4:{type:Number},
    HBlock_6:{type:Number},
    T_10_R:{type:Number},
    T_32_R:{type:Number},
    sand_R:{type:Number},
    cement_R:{type:Number},
    ABC_R:{type:Number},
    binding_R:{type:Number},
    metal_1_R:{type:Number},
    metal_1h_R:{type:Number},
    metal_3q_R:{type:Number},
    T_16_R:{type:Number},
    HBlock_4_R:{type:Number},
    HBlock_6_R:{type:Number}

})

var getAllMaterialDatesSchema = new mongoose.Schema({
    Date:{type:String},
    T_10:{type:Number},
    T_32:{type:Number},
    sand:{type:Number},
    cement:{type:Number},
    ABC:{type:Number},
    binding:{type:Number},
    metal_1:{type:Number},
    metal_1h:{type:Number},
    metal_3q:{type:Number},
    T_16:{type:Number},
    HBlock_4:{type:Number},
    HBlock_6:{type:Number},
    T_10_R:{type:Number},
    T_32_R:{type:Number},
    sand_R:{type:Number},
    cement_R:{type:Number},
    ABC_R:{type:Number},
    binding_R:{type:Number},
    metal_1_R:{type:Number},
    metal_1h_R:{type:Number},
    metal_3q_R:{type:Number},
    T_16_R:{type:Number},
    HBlock_4_R:{type:Number},
    HBlock_6_R:{type:Number}


})

mongoose.model('materialdates',MaterialDateSchema)
module.exports = mongoose.model('Materialdates',getAllMaterialDatesSchema);
