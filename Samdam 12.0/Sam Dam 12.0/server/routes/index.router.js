const express = require('express');
const router = express.Router();

var url = 'mongodb://localhost:27017/samdam09';

const ctrlUser = require('../controllers/user.controller');

const jwtHelper = require('../config/jwtHelper');

let allEmployees = require('../models/employee');
let GetAllAttendance = require('../models/attendance');
let AllSites = require('../models/site');
let AllDates = require('../models/date');
let AllMaterialTypes = require('../models/material');
let AllMaterialDates = require('../models/materialdate');
let AllEquipments = require('../models/equipment');
let AllVehicles = require('../models/vehicle');
let AllTransactions = require('../models/transaction');
let AllRunningCharts = require('../models/runningchart');
let AllCHTransactions = require('../models/chtransaction');
let AllQSTasks = require('../models/qstask');
let AllDailyWorks = require('../models/dailywork');
let AllBOQRecords = require('../models/boqrecord');
let AllEQRecords = require('../models/eqrecord');



const ctrlEmployee = require ('../controllers/employee.controller');
const ctrlSite = require ('../controllers/site.controller');
const ctrlTransaction = require('../controllers/transaction.controller');
const ctrlDate = require ('../controllers/date.controller');
const ctrlMaterial = require('../controllers/material.controller');
const ctrlMaterialDate = require('../controllers/materialdates.controller');
const ctrlEquipments = require('../controllers/equipment.controller');
const ctrlVehicles = require('../controllers/vehicle.controller');
const ctrlRunningCharts = require('../controllers/runningchart.controller');
const ctrlCHTransactions = require('../controllers/chtransaction.controller');
const ctrlQSTasks = require('../controllers/qstask.controller');
const ctrlDailyWorks = require('../controllers/dailywork.controller');
const ctrlBOQRecords = require('../controllers/boqrecord.controller');
const ctrlEQRecords = require('../controllers/eqrecord.controller');

const { result } = require('lodash');
const date = require('../models/date');

router.post('/register', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);
router.get('/userProfile',jwtHelper.verifyJwtToken, ctrlUser.userProfile); 
router.post('/addEmployee',ctrlEmployee.addEmployee);
router.post('/addSite',ctrlSite.addSite);
router.post('/addAttendance',ctrlDate.addDate);
router.post('/addMaterial',ctrlMaterial.addMaterial);
router.post('/addMaterialDates',ctrlMaterialDate.addMaterialDates);
router.post('/addEquipment',ctrlEquipments.addEquipment);
router.post('/addVehicle',ctrlVehicles.addVehicle);
router.post('/addRunningChart',ctrlRunningCharts.addRunningChart);
router.post('/addTransaction',ctrlTransaction.addTransaction);
router.post('/addChequeTransaction',ctrlCHTransactions.addCHTransaction);
router.post('/addQSTask',ctrlQSTasks.addQSTask);
router.post('/addDailyWork',ctrlDailyWorks.addDailyWork);
router.post('/addBOQRec',ctrlBOQRecords.addBOQRecords);
router.post('/addEQRecord',ctrlEQRecords.addEQRecords);

//router.get('/GetAllEmployees',ctrlEmployee.GetAllEmployees);

router.route('/GetAllEmployees').get((req,res)=>{
    allEmployees.find((error,data)=>{
        if (error){
            return next(error)
        }else {
            JSON.stringify(data);
            res.json(data);
            
        }
    })
})
//Get all Material types
router.route('/GetAllMaterialTypes').get((req,res)=>{
    AllMaterialTypes.find((error,data)=>{
        if (error){
            return next(error)
        }else {
            JSON.stringify(data);
            res.json(data);
            
        }
    })
})

//Get all Material Dates
router.route('/GetAllMaterialDates').get((req,res)=>{
    AllMaterialDates.find((error,data)=>{
        if(error){
            return next(error)
        }else{
            JSON.stringify(data);
            res.json(data);
        }
    })
})

//Get all transactions
router.route('/GetAllTransactions').get((req,res)=>{
    AllTransactions.find((error,data)=>{
        if(error){
            return next(error)
        }else{
            JSON.stringify(data);
            res.json(data);
        }
    })
})

//Get All Equipments
router.route('/GetAllEquipments').get((req,res)=>{
    AllEquipments.find((error,data)=>{
        if(error){
            return next(error)
        }else{
            JSON.stringify(data);
            res.json(data);
        }
    })
})

//Get all equipment records
router.route('/GetAllEQRecords').get((req,res)=>{
    AllEQRecords.find((error,data)=>{
        if(error){
            return next(error)
        }else{
            JSON.stringify(data);
            res.json(data);
        }
    })
})


//Get All Vehicles
router.route('/GetAllVehicles').get((req,res)=>{
    AllVehicles.find((error,data)=>{
        if(error){
            return next(error)
        }else{
            JSON.stringify(data);
            res.json(data);
        }
    })
})

//get all running Charts
router.route('/GetAllRunningCharts').get((req,res)=>{
    AllRunningCharts.find((error,data)=>{
        if(error){
            return next(error)
        }else{
            JSON.stringify(data);
            res.json(data);
        }
    })
})

//get all cheque transactions
router.route('/GetAllChequeTransactions').get((req,res)=>{
    AllCHTransactions.find((error,data)=>{
        if(error){
            return next(error)
        }else{
            JSON.stringify(data);
            res.json(data);
        }
    })
})

//getAllTasks
router.route('/GetAllTasks').get((req,res)=>{
    AllQSTasks.find((error,data)=>{
        if(error){
            return next(error)
        }else{
            JSON.stringify(data);
            res.json(data);
        }
    })
})

//Get all boq record
router.route('/GetAllBOQRecs').get((req,res)=>{
    AllBOQRecords.find((error,data)=>{
        if(error){
            return next(error)
        }else{
            JSON.stringify(data);
            res.json(data);
        }
    })
})

//getAll daily works
router.route('/GetAllDailyworks').get((req,res)=>{
    AllDailyWorks.find((error,data)=>{
        if(error){
            return next(error)
        }else{
            JSON.stringify(data);
            res.json(data);
        }
    })
})

//Get all material dates for month
router.route('/GetAllMaterialDatesmonth/:month').get((req,res)=>{
    AllMaterialDates.find((error,data)=>{
        if(error){
            return next(error)
        }if(data){
           console.log(data);
           var fres = data.filter(function(fil){
              return fil.month == req.params.month;
           }) ;
            console.log(fres);
            JSON.stringify(fres);
            res.json(fres);
        }
    })
})



//Delete EQUIPMENTS
router.route('/delete-equipment/:id').delete((req,res,next)=>{
    AllEquipments.findByIdAndDelete(req.params.id, (error,data)=>{
        if(error){
            return next(error);
        }else{
            res.status(200).json({
                msg: data
            })
         }
    })
})

//delete equipment record
router.route('/delete-eq-record/:id').delete((req,res,next)=>{
    AllEQRecords.findByIdAndDelete(req.params.id, (error,data)=>{
        if(error){
            return next(error);
        }else{
            res.status(200).json({
                msg: data
            })
         }
    })
})

//Delete    emoployee
router.route('/delete-employee/:emp_id').delete((req,res,next)=>{
    allEmployees.findOneAndDelete(req.params.emp_id, (error,data)=>{
        if(error){
            return next(error);

        }else{
            res.status(200).json({
                msg: data
            })
            
        }
    })
})

//Delete material type
router.route('/delete-material-type/:mat_id').delete((req,res,next)=>{
    AllMaterialTypes.findByIdAndDelete(req.params.mat_id, (error,data)=>{
        if(error){
            return next(error);
            
            
        }else{
            res.status(200).json({
                msg: data
            })
            
        }
    })
})

//Delete Running chart record
router.route('/delete-runningchart-rec/:id').delete((req,res,next)=>{
    AllRunningCharts.findByIdAndDelete(req.params.id, (error,data)=>{
        if(error){
            return next(error);
        }else{
            res.status(200).json({
                msg: data
            })
            
        }
    })
})

//delete site
router.route('/delete-site/:id').delete((req,res,next)=>{
    AllSites.findByIdAndDelete(req.params.id, (error,data)=>{
        if(error){
            return next(error);
        }else{
            res.status(200).json({
                msg: data
            })
            
        }
    })
})

//delete daily record
router.route('/delete-daily-record/:id').delete((req,res,next)=>{
    AllDailyWorks.findByIdAndDelete(req.params.id, (error,data)=>{
        if(error){
            return next(error);
        }else{
            res.status(200).json({
                msg: data
            })
            
        }
    })
})

//delete transaction records
router.route('/delete-transaction/:id').delete((req,res,next)=>{
    AllTransactions.findByIdAndDelete(req.params.id, (error,data)=>{
        if(error){
            return next(error);
        }else{
            res.status(200).json({
                msg: data
            })
            
        }
    })
})

//delete boq record
router.route('/delete-boqrecord/:id').delete((req,res,next)=>{
    AllBOQRecords.findByIdAndDelete(req.params.id, (error,data)=>{
        if(error){
            return next(error);
        }else{
            res.status(200).json({
                msg: data
            })
            
        }
    })
})
//delete qs task
router.route('/delete-qs-task/:id').delete((req,res,next)=>{
    AllQSTasks.findByIdAndDelete(req.params.id, (error,data)=>{
        if(error){
            return next(error);
        }else{
            res.status(200).json({
                msg: data
            })
            
        }
    })
})

//delete cheque transactions
router.route('/delete-cheque-transaction/:id').delete((req,res,next)=>{
    AllCHTransactions.findByIdAndDelete(req.params.id, (error,data)=>{
        if(error){
            return next(error);
        }else{
            res.status(200).json({
                msg: data
            })
            
        }
    })
})



//Delete material record
router.route('/delete-material-record/:id').delete((req,res,next)=>{
    AllMaterialDates.findByIdAndDelete(req.params.id, (error,data)=>{
        if(error){
            return next(error);
            
            
        }else{
            res.status(200).json({
                msg: data
            })
            
        }
    })
})

//Delete vehicle
router.route('/delete-vehicle/:reg_id').delete((req,res,next)=>{
    AllVehicles.findByIdAndDelete(req.params.reg_id, (error,data)=>{
        if(error){
            return next(error);
        }else{
            res.status(200).json({
                msg: data
            })
       }
    })
})


//update equipments
router.route('/update-equipment/:id').put((req,res,next)=>{
    AllEquipments.findByIdAndUpdate(req.params.id, {
        $set:req.body
    },(error,data) =>{
        if(error){
            return next(error) && console.log(error)
        }else{
            res.json(data)
            console.log('Equipment Details successfully Updated..!')
        }
    }
    )
})

//update equipment record
router.route('/update-eq-record/:id').put((req,res,next)=>{
    AllEQRecords.findByIdAndUpdate(req.params.id, {
        $set:req.body
    },(error,data) =>{
        if(error){
            return next(error) && console.log(error)
        }else{
            res.json(data)
            console.log('Equipment Details successfully Updated..!')
        }
    }
    )
})


//Update material records

router.route('/update-meterial-record/:id').put((req,res,next)=>{
    AllMaterialDates.findByIdAndUpdate(req.params.id, {
        $set:req.body
    },(error,data) =>{
        if(error){
            return next(error) && console.log(error)
        }else{
            res.json(data)
            console.log('Material Record successfully Updated..!')
        }
    }
    )
})

//update transactions
router.route('/update-transaction/:id').put((req,res,next)=>{
    AllTransactions.findByIdAndUpdate(req.params.id, {
        $set:req.body
    },(error,data) =>{
        if(error){
            return next(error) && console.log(error)
        }else{
            res.json(data)
            console.log('Transaction Record successfully Updated..!')
        }
    }
    )
})

//update cheque transaction
router.route('/update-cheque-transaction/:id').put((req,res,next)=>{
    AllCHTransactions.findByIdAndUpdate(req.params.id, {
        $set:req.body
    },(error,data) =>{
        if(error){
            return next(error) && console.log(error)
        }else{
            res.json(data)
            console.log('Cheque Transaction Record successfully Updated..!')
        }
    }
    )
})

//update site details
router.route('/update-site/:id').put((req,res,next)=>{
    AllSites.findByIdAndUpdate(req.params.id, {
        $set:req.body
    },(error,data) =>{
        if(error){
            return next(error) && console.log(error)
        }else{
            res.json(data)
            console.log('Site Details successfully Updated..!')
        }
    }
    )
})

//update boq record
router.route('/update-boq-record/:id').put((req,res,next)=>{
    AllBOQRecords.findByIdAndUpdate(req.params.id, {
        $set:req.body
    },(error,data) =>{
        if(error){
            return next(error) && console.log(error)
        }else{
            res.json(data)
            console.log('BOQ Record successfully Updated..!')
        }
    }
    )
})

//Get Single Employee
router.route('/read-employee/:id').get((req,res,next)=>{   
    allEmployees.findById(req.params.id, (error,data)=>{
        if(error){
            return next(error) 
        }else{
            res.json(data)
            
        }
    })
})



//Get Single Site details
router.route('/read-site-details/:id').get((req,res,next)=>{   
    AllSites.findById(req.params.id, (error,data)=>{
        if(error){
            return next(error) 
        }else{
            res.json(data)
            
        }
    })
})

//Get Single Vehicle
router.route('/get-vehicle/:id').get((req,res,next)=>{   
    AllVehicles.findById(req.params.id, (error,data)=>{
        if(error){
            return next(error) 
        }else{
            res.json(data)
            
        }
    })
})

//Get all site Employees :-)
router.route('/read-site-employees/:site_id').get((req,res,next)=>{ 
    allEmployees.find( {'site._id':req.params.site_id},(error,data)=>{
       if(error){
           return next(error) 
       }else{
           res.json(data)
           
       }
   })
})


//Update Employee
router.route('/update-employee/:id').put((req,res,next)=>{
    allEmployees.findByIdAndUpdate(req.params.id, {
        $set:req.body
    },(error,data) =>{
        if(error){
            return next(error);
            console.log(error)
        }else{
            res.json(data)
            console.log('Employee successfully Updated..!')
        }
    }
    )
})

//Update vehicle
router.route('/update-vehicle/:id').put((req,res,next)=>{
    AllVehicles.findByIdAndUpdate(req.params.id, {
        $set:req.body
    },(error,data) =>{
        if(error){
            return next(error) && console.log(error)
        }else{
            res.json(data)
            console.log('Vehicle Details successfully Updated..!')
        }
    }
    )
})

//update qs task
router.route('/update-qs-task/:id').put((req,res,next)=>{
    AllQSTasks.findByIdAndUpdate(req.params.id, {
        $set:req.body
    },(error,data) =>{
        if(error){  
            return next(error) && console.log(error)
        }else{
            res.json(data)
            console.log('QS Task Details successfully Updated..!')
        }
    }
    )
})


//Increase Attendance
router.route('/incAttendance/:id').put((req,res,next)=>{
    GetAllAttendance.findByIdAndUpdate(req.params.id,{
    $set:req.body
},(error,data)=>{
    if(error){
        return next(error) && console.log(error);
    }else {
        res.json(data);
        console.log('Attendance Added Successfully');
    }
})
})

//Get All Attendance

router.route('/GetAllAttendance').get((req,res)=>{
    allEmployees.aggregate([
        {$lookup:{from:'dates',localField:'emp_id',
      foreignField:'emp_id',as:'dates'}},
    ]).exec((err,result)=>{
        if(err){
            console.log("error",err)
        }
        if(result){
            
            JSON.stringify(result);
            res.json(result);

        }
    })  
})

//Get All Attendence for month   // Futher Developement
router.route('/GetAllAttendanceforMonth/:month').get((req,res)=>{
    allEmployees.aggregate([
        {$lookup:{from:'dates',localField:'emp_id',
      foreignField:'emp_id',as:'dates'}},
    ]).exec((err,result)=>{
        if(err){
            console.log("error",err)
        }
        if(result){
            
        }
    })  
})

//Get All Date attendance

router.route('/getAllDates').get((req,res)=>{
    AllDates.aggregate([
        {$lookup:{from:'employees',localField:'emp_id',
        foreignField:'emp_id',as:'dates'}},
    ]).exec((err,result)=>{
        if(err){
            console.log("error",err);
        }
        if(result){
            JSON.stringify(result);
            res.json(result);
            var h = result.filter(function(fil){
                return fil.month == 'May';
            });
            console.log(h);
        }
    })
});

//Get All Dates according to month
router.route('/getAllDatesforMonth/:month').get((req,res)=>{
    AllDates.aggregate([
        {$lookup:{from:'employees',localField:'emp_id',
        foreignField:'emp_id',as:'dates'}},
    ]).exec((err,result)=>{
        if(err){
            console.log("error",err);
        }
        if(result){
           
            var hres = result.filter(function(fil){
                return fil.month == req.params.month;
            });
            console.log(hres);
            JSON.stringify(hres);
            res.json(hres);
        }
    })
}); 


//Get all Site Attendance filterd

router.route('/GetAllSiteAttendance').get((req,res)=>{
    allEmployees.aggregate([
        {$lookup:{from:'attendances',localField:'emp_id',
      foreignField:'emp_id',as:'attendance'}},
    ]).exec((err,result)=>{
        if(err){
            console.log("error",err)
        }
        if(result){
            
            JSON.stringify(result);
            res.json(result);
        }
    })  
})

//Get All Salary Details

router.route('/GetAllSalary').get((req,res)=>{
  GetAllAttendance.aggregate([
      {$lookup:{from:'dates',localField:'emp_id',
    foreignField:'emp_id',as:'dates'}},
  ]).exec((err,result)=>{
      if(err){
          console.log("error",err)
      }
      if(result){
          
          JSON.stringify(result);
          res.json(result);
      }
  })  
}   
)

//Get salary for month
router.route('/GetAllSalaryforMonth/:month').get((req,res)=>{
    GetAllAttendance.aggregate([
        {$lookup:{from:'dates',localField:'emp_id',
      foreignField:'emp_id',as:'dates'}},
    ]).exec((err,result)=>{
        if(err){
            console.log("error",err)
        }
        if(result){
            //console.log(result[0].dates);
            var hres = result[0].dates.filter(function(fil){
                return fil.month == req.params.month;
            });
          //  console.log(hres);
            result[0].dates = hres;
            JSON.stringify(result);
            
            res.json(result);
        }
    })  
  }   
  )

//GEt single salary

router.route('/read-salary/:id').get((req,res,next)=>{   
    GetAllAttendance.findById(req.params.id, (error,data)=>{
        console.log(req.params.id)
        if(error){
            return next(error) 
        }else{
            res.json(data)
            
        }
    })
})


//Get all Sites
router.route('/GetAllSites').get((req,res)=>{
    AllSites.find((error,data)=>{
        if (error){
            return next(error)
        }else {
            JSON.stringify(data);
            res.json(data);
            
        }
    })
})
module.exports = router;



 




















































































































