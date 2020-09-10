import { Component, OnInit,Inject,Optional,ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {DailyWork} from '../../shared/dailywork.model';
import { MatTable,MatTableDataSource } from '@angular/material/table';
import {FormControl, FormBuilder, FormGroup ,Validators, NgForm} from '@angular/forms';
import { getMonth } from 'date-fns';
import {QsService} from '../../shared/qs.service';
import {MatBottomSheet, MatBottomSheetRef,MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';

export interface TaskData{
    _id:string;
    allocation_date:string;
    task_id:string;
    name:string;
    type:Array<any>;
    site:Array<any>;
    site_id:string;
    length:number;
    width:number;
    height:number;
    month:string;
    weight:number;
    progress:number;

}

@Component({
  selector: 'app-daily-works',
  templateUrl: './daily-works.component.html',
  styleUrls: ['./daily-works.component.css']
})
export class DailyWorksComponent implements OnInit {
  minDate: Date;
  maxDate: Date;
  public dailyWorkForm:FormGroup;
  dataSourceDW:MatTableDataSource<DailyWork>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  AllDWorksData:any = []; 
  AllTaskData:any = [];
  showSucessMessage: boolean;
  serverErrorMessages: string;
  displayedColumnsDW:string[]=['date','length','width','height','action'];
  constructor(private qsService:QsService,private formBuilder: FormBuilder,private _bottomSheetRef: MatBottomSheetRef<DailyWorksComponent>,@Optional() @Inject(MAT_BOTTOM_SHEET_DATA) public data: TaskData) { 
    this.AllTaskData=data;    
    var task_id =data._id;

    this.dailyWorkForm = this.formBuilder.group({
      task_id:[data._id],
      site_id:[data.site_id],
      month:[],
      date:[Date],
      length:[],
      width:[],
      height:[],
      weight:[]
    })

    

    //get all daily works
    this.qsService.getAllDailyWorks().subscribe(data=>{
      this.AllDWorksData=data;
      this.dataSourceDW = new MatTableDataSource<DailyWork>(this.AllDWorksData);
      this.dataSourceDW.filter = task_id.trim().toString();
      setTimeout(()=>{
        this.dataSourceDW.paginator = this.paginator;
      })
    })

    var currentDate = new Date()
   
  
    this.minDate = new Date();
    this.maxDate = new Date(currentDate);
    
  }

  ngOnInit(): void {

  }

  calculateProgress(){
    var planned_vol = this.AllTaskData.height*this.AllTaskData.length*this.AllTaskData.width;
    var daywork_vol = this.dailyWorkForm.value.height*this.dailyWorkForm.value.length*this.dailyWorkForm.value.width;
    var today_percent = (daywork_vol/planned_vol)*100;
    this.AllTaskData.progress = (this.AllTaskData.progress+today_percent);
    var task_id=this.AllTaskData._id;
    this.qsService.updateTask(task_id,this.AllTaskData).subscribe(res=>{

    })
    
  }

  deductProgress(e){
    var planned_vol = this.AllTaskData.height*this.AllTaskData.length*this.AllTaskData.width;
    var daywork_vol = e.height*e.length*e.width;
    var today_percent = (daywork_vol/planned_vol)*100;
    this.AllTaskData.progress = (this.AllTaskData.progress-today_percent);
    var task_id=this.AllTaskData._id;
    this.qsService.updateTask(task_id,this.AllTaskData).subscribe(res=>{

    })
  }

  onRemoveRecord(index:number,e){
    this.deductProgress(e);
    if(window.confirm('Are you sure you want to Delete the Daily Measurement Record?')){
      const data = this.dataSourceDW.data;
      data.splice((this.paginator.pageIndex * this.paginator.pageSize)+index,1)
      this.dataSourceDW.data=data;
      this.qsService.deleteDailyRecord(e._id).subscribe()
    }
    window.alert("Daily Measurement Record Deleted Succeccfully");
        

  }

  onAddDailyWork(){

     this.calculateProgress();
      //convert Date
    this.dailyWorkForm.value.date = new Date();
    var c_date = this.dailyWorkForm.value.date.toLocaleDateString();
    
     var intmonth = getMonth(this.dailyWorkForm.value.date);
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
    this.dailyWorkForm.value.month = strmonth;
    this.dailyWorkForm.value.date = c_date;    
     this.qsService.addDailyRecord(this.dailyWorkForm.value).subscribe(res=>{
       setTimeout(()=> this.showSucessMessage=false,4000);
     },
     err=>{
       if(err){
         console.log("Site Daily work Adding Failed"+err);
       }else{
        this.serverErrorMessages = 'Something went wrong';
       }
     }
     );
     window.alert("Site Daily Works Added Successfully..!");
     location.reload();
  }
}
