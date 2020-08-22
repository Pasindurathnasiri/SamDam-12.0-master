import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup ,Validators, NgForm } from '@angular/forms';
import { MaterialService } from '../shared/material.service';
import { MatTableDataSource } from '@angular/material/table';
import { SiteService } from '../shared/site.service';
import { Eqipment } from '../shared/equipment.model';
import { AttendanceService } from '../shared/attendance.service';
import {AccountingService } from '../shared/accounting.service';

interface Site{
  _id:string;
  site_id:string;
  name: string;
  site: Array<Site>;
}

 
@Component({
  selector: 'app-eb-monthly-reports',
  templateUrl: './eb-monthly-reports.component.html',
  styleUrls: ['./eb-monthly-reports.component.css']
})
export class EbMonthlyReportsComponent implements OnInit {
  siteControl = new FormControl('',Validators.required);
  siteFormControl = new FormControl('', Validators.required);
  sites: Site [] = [];
  AllSiteDate:any=[];
  AllAttendanceData:any=[];
  AllEquipmentData: any =[];
  AllTransactionData: any =[];
  chartdata: any=[];
  chartdata_attendance: any=[];
  chartdata_accounting: any=[];
  public dataSourceEQ: MatTableDataSource<Eqipment>;
 
  title = 'Available Stocks in Warehouse,2020';
  title2='Attendance Comparisons among Sites';
  title3= 'Expences Comparisons Among Sites,2020'
  type = 'BarChart';
  type2='PieChart';
  type3= 'BarChart';
  columnNames2 = ['Site', 'Attendance'];
  columnNames3 = ['Site', 'Expenses'];
 
 columnNames = ['Equipment', 'Amount'];
 options2 = {
  colors: ['#e0440e', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6'], is3D: true
};
 options = {
  colors: ['#e0440e', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6'], is3D: true
};

   width2 = 850;
   width = 850;
   height = 700;
   height2 = 700;
  constructor(private materialService:MaterialService,private siteService:SiteService,private attendanceService:AttendanceService,private accountingService:AccountingService) {
    this.materialService.getAllEquipment().subscribe(dataEQ=>{
     this.AllEquipmentData=dataEQ;
     
     
    })

    //get sites
    this.siteService.GetAllSites().subscribe(data =>{
      this.AllSiteDate = data;
            //in here pass sites to mat-select
       setTimeout(()=>{
  
       },0)
       this.sites = this.AllSiteDate;
    })

    //get all attendance data
    this.attendanceService.GetAllDates().subscribe(data=>{
      this.AllAttendanceData=data;
      setTimeout(()=>{

      },0)

    })

    //get all expences data
    this.accountingService.getAllTransactions().subscribe(data=>{
      this.AllTransactionData=data;
      console.log(this.AllTransactionData);
      setTimeout(()=>{

      },0)
    })
    
    
   }

  ngOnInit(): void {
    
  }

  getData(){
    var f_index;
    var s_index;
    for(var i=0;i<this.AllEquipmentData.length;i++){
      f_index=this.AllEquipmentData[i].eq_type[0].eq_type;
      s_index=this.AllEquipmentData[i].amount;
      
      this.chartdata[i] =[`${f_index}`,s_index];
    }
    return this.chartdata;
  }

  getData2(){
    var site_index;
    var s_index=0;
    for(var i=0;i<this.AllSiteDate.length;i++){
      site_index=this.AllSiteDate[i].site_name;
      
      for(var j=0;j<this.AllAttendanceData.length;j++){
        if(this.AllAttendanceData[j].site[0].site_id=this.AllSiteDate[i].site_id){
          s_index=s_index+1
        }
      }
      this.chartdata_attendance[i] =[`${site_index}`,s_index];
    }
    //console.log(this.chartdata_attendance);
    return this.chartdata_attendance;
  }

  getData3(){
    var site_index;
    var acc_index=0;
    for(var i=0;i<this.AllSiteDate.length;i++){
      site_index=this.AllSiteDate[i].site_name;
      
      for(var j=0;j<this.AllTransactionData.length;j++){
        if(this.AllTransactionData[j].site_id=this.AllSiteDate[i].site_id){
          acc_index=acc_index+(this.AllTransactionData[j].bank_credit+this.AllTransactionData[j].cash_debit);
        }
      }
      this.chartdata_accounting[i] =[`${site_index}`,acc_index];
    }
    //console.log(this.chartdata_attendance);
    return this.chartdata_accounting;
  }

}
