const mongoose = require('mongoose');
const QSTask = mongoose.model('qstasks');

module.exports.addQSTask = (req,res,next)=>{
    var qstasks = new QSTask();
    qstasks.allocation_date = req.body.allocation_date;
    qstasks.type = req.body.type;
    qstasks.task_id = req.body.task_id;
    qstasks.name = req.body.name;
    qstasks.site = req.body.site;
    qstasks.month = req.body.month;
    qstasks.site_id = req.body.site_id;
    qstasks.length = req.body.length;
    qstasks.width = req.body.width;
    qstasks.height = req.body.height;
    qstasks.weight = req.body.weight;
    qstasks.progress= req.body.progress;
    qstasks.save((err,doc)=>{
        if(!err)
        console.log(qstasks) && res.send(doc);
        else
        return next(err);
    })
    
}