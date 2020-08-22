const mongoose = require('mongoose');

const Site = mongoose.model('site')

let allSites = require('../models/site');


module.exports.addSite = (req,res,next) =>{
    var site = new Site();
    site.site_id = req.body.site_id;
    site.site_name = req.body.site_name;
    site.place = req.body.place;
    site.start_date = req.body.start_date;
    site.end_date = req.body.end_date;
    site.type_of_site = req.body.type_of_site;
    site.est_budget = req.body.est_budget;
    site.no_of_sk = req.body.no_of_sk;
    site.no_of_usk = req.body.no_of_usk;
    site.save((err,doc)=>{
        if(!err)
        console.log(site) && res.send(doc);
        else
        return next(err);
    })
}