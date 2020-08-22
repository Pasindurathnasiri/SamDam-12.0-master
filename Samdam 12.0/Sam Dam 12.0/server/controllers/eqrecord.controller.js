const mongoose = require('mongoose');
const EQRecord = mongoose.model('eqrecords');

module.exports.addEQRecords = (req,res,next)=>{
    var eqrecord = new EQRecord();
    eqrecord.dot = req.body.dot;
    eqrecord.site = req.body.site;
    eqrecord.site_id = req.body.site_id;
    eqrecord.Hoe = req.body.Hoe;
    eqrecord.Mason_Handtool = req.body.Mason_Handtool;
    eqrecord.Pan = req.body.Pan;
    eqrecord.Hammer = req.body.Hammer;
    eqrecord.Ball_Hammer=req.body.Ball_Hammer;
    eqrecord.Shovel=req.body.Shovel;
    eqrecord.Handsaw=req.body.Handsaw;
    eqrecord.Hacksaw_Metal=req.body.Hacksaw_Metal;
    eqrecord.Wrench=req.body.Wrench;
    eqrecord.Axe=req.body.Axe;
    eqrecord.Safty_Gloves=req.body.Safty_Gloves;
    eqrecord.Safty_Helmet=req.body.Safty_Helmet;
    eqrecord.Safty_Glass=req.body.Safty_Glass;
    eqrecord.Drill=req.body.Drill;
    eqrecord.Grinders=req.body.Grinders;
    eqrecord.Plier=req.body.Plier;
    eqrecord.Screwdrivers=req.body.Screwdrivers;
    eqrecord.Tape_Measures=req.body.Tape_Measures;
    eqrecord.Spirit_Level=req.body.Spirit_Level;
    eqrecord.Chisel=req.body.Chisel;
    eqrecord.save((err,doc)=>{
        if(!err)
        console.log(eqrecord) && res.send(doc);
        else
        return next(err);
    })
    
}