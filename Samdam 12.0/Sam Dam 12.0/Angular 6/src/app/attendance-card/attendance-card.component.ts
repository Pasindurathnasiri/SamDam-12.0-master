  import {Component, ViewEncapsulation,OnInit,Inject,Optional,ViewChild} from '@angular/core';
  import {MatCalendarCellCssClasses} from '@angular/material/datepicker';
  import { MatPaginator } from '@angular/material/paginator';
  import { MatSort } from '@angular/material/sort';
  import { MatTable,MatTableDataSource } from '@angular/material/table';
  import {SelectionModel} from '@angular/cdk/collections';
  import { Attendance } from '../shared/attendance.model';
  import {AttendanceService} from '../shared/attendance.service';
  import {DateModel} from '../shared/date.model';
  import {FormControl, FormBuilder, FormGroup ,Validators, NgForm} from '@angular/forms';
  import { Router,ActivatedRoute } from '@angular/router';
  import { MatDialog,MatDialogConfig} from '@angular/material/dialog';
  import {MatBottomSheet, MatBottomSheetRef,MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';

  import { from } from 'rxjs';
  import { Site } from '../shared/site.model';
  import { getMonth } from 'date-fns';
  import { da } from 'date-fns/locale';

  export interface AttendanceData{
    // _id:string;
    // name_in:string;
    // attendance:Array<Date>
    // date: Date;
    // site_name : string;
    // state : string;
    // ot_on_day:number;
    // reason:string; //in case of emergency
    _id:string;
    emp_id: string;
    name_in : string;
    month : string;
    site_name: string;
    days:number;
    advance_req:number;
    advance_paid:number;
    ots:number;
    day_pay:number;
    ot_pay:number; 
    site:Array<Site> 
    attendance:Array<Attendance>
    date:Array<Date>
  }

  var idFilter;

  @Component({
    selector: 'app-attendance-card',
    templateUrl: './attendance-card.component.html',
    styleUrls: ['./attendance-card.component.css'],
    encapsulation: ViewEncapsulation.None,
  })
  export class AttendanceCardComponent implements OnInit {

    public readonly dateForm :FormGroup; 
    attendanceForm :FormGroup;
    forSelectMonth:FormGroup;
    AllDatesData: any = [];
    dataSource: MatTableDataSource<DateModel>;
    dataSourcenew:MatTableDataSource<DateModel>
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    selection = new SelectionModel<Attendance>(true, []);
    searchKey: string; 

    /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
    displayedColumns: string [] = ['date','site','ot_on_day','controls'];

    

    constructor(private attendanceApi:AttendanceService,private router: Router,private formBuilder: FormBuilder,private actRoute:ActivatedRoute,private dialog:MatDialog,private _bottomSheetRef: MatBottomSheetRef<AttendanceCardComponent>,@Optional() @Inject(MAT_BOTTOM_SHEET_DATA) public data: AttendanceData) {
    //get month from date picker
    
    var filterID = data.emp_id;
    idFilter=filterID;
    
    this.dateForm = this.formBuilder.group({
        datepicker:[Date],
        emp_id:[data.emp_id],
        site:[data.site],
        month:[],
        ot_on_day:[]
        
    })
  
    this.forSelectMonth= this.formBuilder.group({
      select_month:[]
    })
  
  //  var day_length = [data.attendance[0].date[0].length]
    this.attendanceForm = this.formBuilder.group({
      _id:[this.data._id],
      emp_id:[this.data.emp_id],
      name_in:[this.data.name_in],
      site:[this.data.site],
    // month:[this.data.attendance[0].month],
    // days:[this.data.attendance[0].days],
    // ots:[this.data.attendance[0].ots],
      date:[this.dateForm]


    })
    this.attendanceApi.GetAllDates().subscribe(data=>{
      
      
      this.AllDatesData=data;
    // console.log(filterID);
      
      this.dataSource=new MatTableDataSource<DateModel>(this.AllDatesData);
      //get value from the month picker
      
    this.dataSource.filter=filterID.trim().toString();
    
    
      console.log(this.dataSource)
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;

      }, 0);
    })
    
    }

  
    applyFilter(){
      return this.dataSource.filter= this.searchKey.trim().toLowerCase();
    }

    ngOnInit(): void {
      this.dataSource = new MatTableDataSource<DateModel>();
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      
    }


    updateAttendanceForm(){
    
    }
    
    //filter date
    formatDate(e){
      // var convertDate = new Date(e.target).toISOString().substring(0,10);
      // this.dateForm.get('date').setValue(convertDate, {
      //   onlyself:true
      // })
      // console.log(convertDate);
      }
    

    openLink(event: MouseEvent): void {
      this._bottomSheetRef.dismiss();
      console.log(this._bottomSheetRef);
      event.preventDefault();
    }

    
    onPresent(){
      
    
    // console.log("present");
      var intmonth = getMonth(this.dateForm.value.datepicker);
      var strmonth='';
      
      switch (intmonth) {
        case 0:strmonth="January"
          break;
      case 1:strmonth="February"
          break;
          case 2:strmonth="March"
          break;
          case 3:strmonth="April"
          break;
          case 4:strmonth="May"
          break;
          case 5:strmonth="June"
          break;
          case 6:strmonth="July"
          break;
          case 7:strmonth="August"
          break;
          case 8:strmonth="September"
          break;
          case 9:strmonth="October"
          break;
          case 10:strmonth="November"
          break;
          case 11:strmonth="December"
          break;
          
          
        default:
          break;
      }
      this.dateForm.value.month = strmonth;
      console.log(this.dateForm.value);
      this.attendanceApi.AddAttendance(this.dateForm.value).subscribe(
        res=>{
          
        },
        err=>{
          if(err){
            console.log("Attendance Adding Failed"+err);
          }else{
            console.log("Something went Wrong");
          }
        }
      );
    }

    onAbsent(){
      console.log("absent")
    }
  
    onMonthChange(){
      var selectedmonth = this.forSelectMonth.value.select_month;
      this.attendanceApi.GetAllDatesforMonth(selectedmonth).subscribe(data=>{
        this.AllDatesData =data;   
      
        console.log(this.AllDatesData);
      
        this.dataSource = new MatTableDataSource<DateModel>(this.AllDatesData);
        this.dataSource.filter=idFilter.trim().toString();
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
      })
      console.log(this.dataSource)
      //console.log("change");
    }

    //on preset employee
  }
