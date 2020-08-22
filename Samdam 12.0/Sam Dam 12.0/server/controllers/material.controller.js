const mongoose = require('mongoose');
const Material = mongoose.model('materials');

module.exports.addMaterial = (req,res,next) =>{
    var material =new Material();
    material.mat_id = req.body.mat_id;
    material.type_material = req.body.type_material;
    material.mat_name = req.body.mat_name;
    material.buyer = req.body.buyer;
    material.dom = req.body.dom;
    material.unit_material = req.body.unit_material;  
    material.price_unit = req.body.price_unit;
    console.log(material);
    material.save((err,doc)=>{
        if(!err)
        console.log(material) && res.send(doc);
        else
        return next(err);
    });
}