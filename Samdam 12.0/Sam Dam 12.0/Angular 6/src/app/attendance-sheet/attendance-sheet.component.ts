import { AfterViewInit, Component, OnInit, ViewChild,Input,NgZone } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable,MatTableDataSource } from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { Attendance } from '../shared/attendance.model';
import {AttendanceService} from '../shared/attendance.service';
import { MatDialog,MatDialogConfig} from '@angular/material/dialog';
import {FormControl, FormBuilder, FormGroup ,Validators, NgForm} from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { AttendanceCardComponent } from '../attendance-card/attendance-card.component'
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { from } from 'rxjs';
import { stringify } from 'querystring';
import { startOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addWeeks, subWeeks, addMonths, subMonths} from 'date-fns';

import { CalendarEvent, CalendarEventAction } from 'angular-calendar';

export interface Date{

}

@Component({
  selector: 'app-attendance-sheet',
  templateUrl: './attendance-sheet.component.html',
  styleUrls: ['./attendance-sheet.component.css']
})
export class AttendanceSheetComponent implements OnInit {
  attendanceForm :FormGroup; 
  forSelectMonth:FormGroup;
  AllAttendanceData: any = [];
  dataSource: MatTableDataSource<Attendance>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  selection = new SelectionModel<Attendance>(true, []);
  searchKey: string; 
  
  

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
 displayedColumns: string [] = ['emp_id', 'name','site','days','ots','action'];

 constructor(private attendanceApi:AttendanceService,private router: Router,private ngZone: NgZone,private formBuilder: FormBuilder,private dialog:MatDialog,private actRoute:ActivatedRoute,private _bottomSheet:MatBottomSheet,private _bottomSheetRef:MatBottomSheetRef){
  this.attendanceApi.GetAllAttendance().subscribe(data =>{
    
    this.AllAttendanceData =data;   
    
    console.log(this.AllAttendanceData);
    
    this.dataSource = new MatTableDataSource<Attendance>(this.AllAttendanceData);
   //this is the array we want to filter
  
   
    
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
    }, 0);
       
  })

  
  this.forSelectMonth= this.formBuilder.group({
    select_month:[]
  })

}

//get the total days

getTotalDays(i){
  return this.AllAttendanceData[i].dates.length;
}

//get the total ots
getTotalOT(i){

  var otcol=0;
  for(var j=0;j<this.AllAttendanceData[i].dates.length;j++){
   otcol=otcol+this.AllAttendanceData[i].dates[j].ot_on_day;
} return otcol;
}
 

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Attendance>();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.updateAttendanceForm();
  
  }

//Update Attendance Form
   updateAttendanceForm(){
     this.attendanceForm = this.formBuilder.group({
       emp_id:[''],
       site:[''],
       month:[''],
       days:[''],
       ots:[''],
       1:[''],
       2:[''],
       3:[''],
       4:[''],
       5:[''],
       6:[''],
       7:[''],
       8:[''],
       9:[''],
       10:[''],
       11:[''],
       12:['']
     })
   }




  onSearchClear(){
    this.searchKey ='';
    this.applyFilter();
  }

  openCalendar(index:number,e):void{
   // console.log(e)
    this._bottomSheet.open(AttendanceCardComponent,{data:e});
  }

  applyFilter(){
    return this.dataSource.filter= this.searchKey.trim().toLowerCase();
  }

  onMonthChange(){
    var selectedmonth = this.forSelectMonth.value.select_month;
    this.attendanceApi.GetAllDatesforMonth(selectedmonth).subscribe(data=>{
      this.AllAttendanceData =data;   
    
      console.log(this.AllAttendanceData);
    
       this.dataSource = new MatTableDataSource<Attendance>(this.AllAttendanceData);
    
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
    }, 0);
    })
    console.log(this.dataSource)
    //console.log("change");
  }
}
