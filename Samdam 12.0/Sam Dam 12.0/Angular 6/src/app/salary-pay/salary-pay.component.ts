  import { Component, OnInit,ViewChild } from '@angular/core';
  import { EmployeeService } from '../shared/employee.service';
  import { MatPaginator } from '@angular/material/paginator';
  import { MatSort } from '@angular/material/sort';
  import { MatTable,MatTableDataSource } from '@angular/material/table';
  import { Attendance } from '../shared/attendance.model';
  import {FormControl, FormBuilder, FormGroup ,Validators, NgForm} from '@angular/forms';
  import { Salarypay } from '../shared/salarypay.model';
  import { SalarypayService } from '../shared/salarypay.service';
  import { from } from 'rxjs';
  import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
  import { ViewPaysheetComponent} from '../view-paysheet/view-paysheet.component';
  import {AttendanceService} from '../shared/attendance.service';


  @Component({
    selector: 'app-salary-pay',
    templateUrl: './salary-pay.component.html',
    styleUrls: ['./salary-pay.component.css']
  })
  export class SalaryPayComponent implements OnInit {
    AllSalaryData: any = [];
    forSelectMonth:FormGroup;
    dataSource: MatTableDataSource<Salarypay>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    searchKey: string; 
  
    displayedColumns:string[] = ['emp_id','name_in','designation','site','dayrate','otrate','days','ots','daypayments','otpayments','fullpayments','action'];


    constructor(private salaryapi: SalarypayService,private _bottomSheet:MatBottomSheet,private _bottomSheetRef:MatBottomSheetRef,private formBuilder:FormBuilder,private attendanceApi:AttendanceService) {
      this.attendanceApi.GetAllAttendance().subscribe(data=>{
        this.AllSalaryData =data;   
      
        console.log(this.AllSalaryData[0]);
      
        this.dataSource = new MatTableDataSource<Salarypay>(this.AllSalaryData);
      //  this.dataSource2.filter=idFilter.trim().toString();
      setTimeout(() => {
      // this.dataSource.paginator = this.paginator;
      }, 0);
      })

      this.forSelectMonth= this.formBuilder.group({
        select_month:[]
      })
    
    }

      /** Gets the total Days each row. */
      getTotalDaysRow(i) {
          return this.AllSalaryData[i].dates.length;
      }
    
        /** Gets the total ots each row. */
        getTotalOTsRow(i) {
        
          var otcol=0;
          for(var j=0;j<this.AllSalaryData[i].dates.length;j++){
                otcol=otcol+this.AllSalaryData[i].dates[j].ot_on_day;
        } return otcol;
        }
    
      /** Gets the total Days. */
      getTotalDays() {
        return this.AllSalaryData.map(t => t.dates.length).reduce((acc, value) => acc + value, 0);
        
      }
    
          /** Gets the total OTs */
      getTotalOTs() {
        //return this.AllSalaryData.map(t => t.attendance[0].ots).reduce((acc, value) => acc + value, 0);
        var TotOT=0;
        for(var i=0;i<this.AllSalaryData.dates.length;i++){
          TotOT = TotOT+this.AllSalaryData.map(t=> t.dates[i].ot_on_day).reduce((acc,values)=>acc + values,0)
        }
        return TotOT;
      } 

      //Calculate Day payment
      getDaypayments(index:number, e){
        // return this.AllSalaryData.map(e.attendance[0].days*e.day_pay).reduce((acc,value)=> acc+value,0);
        const data = this.dataSource.data;
        
        return e.day_pay*e.dates.length;
      }

      //Calculate Total payment
      getTotalDayPayments(){
      //  return this.AllSalaryData.map(t=>t.attendance[0].days*t.day_pay).reduce((acc,value)=> acc+value,0);
        
      }

      //calculate total ots payment
      getOTPayments(index:number,e){
        const data = this.dataSource.data;
        var otcol=0;
        for(var j=0;j<this.AllSalaryData[index].dates.length;j++){
    otcol=otcol+this.AllSalaryData[index].dates[j].ot_on_day;
  } 
        return e.ot_pay*otcol;
      }

      //calculate Total OTS payments
      getTotalOTPayments(){
      // return this.AllSalaryData.map(t=>t.attendance[0].ots*t.ot_pay).reduce((acc,value)=> acc+value,0);

      }

      //Calculate Full Payments
      getFullPayment(index:number,e){
        var otrow =0;
        for(var j=0;j<this.AllSalaryData[index].dates.length;j++){
          otrow=otrow+this.AllSalaryData[index].dates[j].ot_on_day;
      }
      var dayrow=this.AllSalaryData[index].dates.length;;
      
        
        return (e.ot_pay*otrow)+(e.day_pay*dayrow);
      }

      //get total full payments
      getTotalFullPayments(){
        return this.AllSalaryData.map(t=>(t.ot_pay*t.attendance[0].ots)+(t.day_pay*t.attendance[0].days)).reduce((acc,value)=> acc+value,0)
      }

      onSearchClear(){
        this.searchKey ='';
        this.applyFilter();
      }

      applyFilter(){
        return this.dataSource.filter= this.searchKey.trim().toLowerCase();
      }

      viewPaySheet(index:number,e) : void{
      console.log(e)
      this._bottomSheet.open(ViewPaysheetComponent,{data:e})
      }

    ngOnInit() {
      
    this.dataSource = new MatTableDataSource<Salarypay>();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    }

    onMonthChange(){
      var selectedmonth = this.forSelectMonth.value.select_month;
      this.attendanceApi.GetAllSalaryforMonth(selectedmonth).subscribe(data=>{
        this.AllSalaryData =data;   
      
        console.log(this.AllSalaryData);
      
        this.dataSource = new MatTableDataSource<Salarypay>(this.AllSalaryData);
      
      setTimeout(() => {
      
      }, 0);
      })

  }
  }
