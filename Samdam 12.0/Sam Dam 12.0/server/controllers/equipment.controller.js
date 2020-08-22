const mongoose = require('mongoose');
const Equipment = mongoose.model('equipments');

module.exports.addEquipment = (req,res,next) =>{
    var equipment =new Equipment();
    equipment.eq_id = req.body.eq_id;
    equipment.eq_type = req.body.eq_type;
    equipment.brand_name = req.body.brand_name;
    equipment.price_unit = req.body.price_unit;
    equipment.buyer = req.body.buyer;
    equipment.dom = req.body.dom;  
    equipment.amount = req.body.amount;
    console.log(equipment);
    equipment.save((err,doc)=>{
        if(!err)
        console.log(equipment) && res.send(doc);
        else
        return next(err);
    });
}