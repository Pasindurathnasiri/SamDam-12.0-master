const mongoose = require('mongoose');
const Vehicle = mongoose.model('vehicles');

module.exports.addVehicle = (req,res,next) =>{
    var vehicle =new Vehicle();
    vehicle.reg_id = req.body.reg_id;
    vehicle.vh_type = req.body.vh_type;
    vehicle.brand = req.body.brand;
    vehicle.vh_model = req.body.vh_model;
    vehicle.buyer = req.body.buyer;
    vehicle.dor = req.body.dor;  
    vehicle.eng_cap = req.body.eng_cap;
    vehicle.valueVH = req.body.valueVH;
    vehicle.chassie_no = req.body.chassie_no;
    vehicle.eng_no = req.body.eng_no;
    vehicle.site = req.body.site;
    vehicle.site_id = req.body.site_id;
    vehicle.fuel_type = req.body.fuel_type;
    vehicle.unit_rate = req.body.unit_rate;
    vehicle.driver = req.body.driver;
    console.log(vehicle);
    vehicle.save((err,doc)=>{
        if(!err)
        console.log(vehicle) && res.send(doc);
        else
        return next(err);
    });
}