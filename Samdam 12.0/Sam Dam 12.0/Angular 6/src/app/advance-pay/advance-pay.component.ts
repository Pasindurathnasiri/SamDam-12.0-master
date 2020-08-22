import { Component, OnInit,ViewChild, NgZone } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable,MatTableDataSource } from '@angular/material/table';
import { Salarypay } from '../shared/salarypay.model';
import {DateModel} from '../shared/date.model';
import {AttendanceService} from '../shared/attendance.service';
import {FormControl, FormBuilder, FormGroup ,Validators, NgForm} from '@angular/forms';
import { SalarypayService } from '../shared/salarypay.service';
import { matDialogAnimations, MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { AddAdvanceSingleComponent } from '../advance-pay/add-advance-single/add-advance-single.component';
import { ConfirmAdvanceSingleComponent } from '../advance-pay/confirm-advance-single/confirm-advance-single.component'
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';

var idFilter;


@Component({
  selector: 'app-advance-pay',
  templateUrl: './advance-pay.component.html',
  styleUrls: ['./advance-pay.component.css']
})
export class AdvancePayComponent implements OnInit {
  selected: 'June';
  AllAdvanceData: any =[];
  forSelectMonth:FormGroup;
  AllDatesData: any = [];
  dataSource: MatTableDataSource<Salarypay>;
  dataSource2: MatTableDataSource<Salarypay>;
 
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  searchKey: string;  
 
  displayedColumns: string[] = ['emp_id','name','designation','site','action_req','advance_req','advance_paid'];
 
  constructor(private advanceApi: SalarypayService,private attendanceApi: AttendanceService,private dialog:MatDialog,private formBuilder: FormBuilder,private _bottomSheet:MatBottomSheet,private _bottomSheetRef:MatBottomSheetRef) {
    this.advanceApi.GetAllSalary().subscribe(data =>{
      //var filterID = data.emp_id;
      //idFilter=filterID;
      this.AllAdvanceData =data;    
      this.dataSource = new MatTableDataSource<Salarypay>(this.AllAdvanceData);
      console.log(this.dataSource);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
      var selectedmonth = this.forSelectMonth.value.select_month;
      
      this.attendanceApi.GetAllSalaryforMonth(selectedmonth).subscribe(data=>{
        this.AllDatesData = data;
        console.log(this.AllDatesData);

        //this.dataSource2 = new MatTableDataSource<DateModel>
      })
    })
    
    this.forSelectMonth= this.formBuilder.group({
      
      select_month:[]
    })
   
  }

  openBottomSheet(index:number,e): void {
    this._bottomSheet.open(AddAdvanceSingleComponent,{panelClass:'custom-width',data:e});
        
  }

  onSearchClear(){
    this.searchKey ='';
    this.applyFilter();
  }

  applyFilter(){
    return this.dataSource.filter= this.searchKey.trim().toLowerCase();
    return this.dataSource2.filter = this.searchKey.trim().toLowerCase();
  }

  payAdvance(index:number,e): void{
    this._bottomSheet.open(ConfirmAdvanceSingleComponent,{data:e})
  }

  ngOnInit(){
   this.dataSource = new MatTableDataSource<Salarypay>();
   this.dataSource.sort = this.sort;
   this.dataSource.paginator = this.paginator;

  }

  onMonthChange(){
    var selectedmonth = this.forSelectMonth.value.select_month;
    this.attendanceApi.GetAllSalaryforMonth(selectedmonth).subscribe(data=>{
      this.AllDatesData =data;   
    
      console.log(this.AllDatesData);
    
       this.dataSource2 = new MatTableDataSource<Salarypay>(this.AllDatesData);
     //  this.dataSource2.filter=idFilter.trim().toString();
    setTimeout(() => {
     // this.dataSource.paginator = this.paginator;
    }, 0);
    })
   // console.log(this.dataSource2)
    //console.log("change");
  }

  
}
