  import { Component, OnInit,NgZone,Inject, Optional} from '@angular/core';
  import {FormControl, FormBuilder, FormGroup ,Validators, NgForm} from '@angular/forms';
  import { Router,ActivatedRoute } from '@angular/router';
  import { AttendanceService } from '../shared/attendance.service';
  import { Attendance } from '../shared/attendance.model';
  import {MatBottomSheet, MatBottomSheetRef,MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';
  import { from } from 'rxjs';
  import * as jspdf from 'jspdf';
  import html2canvas from 'html2canvas';
  import {DateModel} from '../shared/date.model'

  export interface AdvanceData{
    _id:string;
    emp_id: string;
    name_in : string;
    month : string;
    days:number;
    advance_req:number;
    advance_paid:number;
    ots:number;
    day_pay:number;
    ot_pay:number;
    attendance:Array<Attendance>;  
    dates:Array<DateModel>
  }

  @Component({
    selector: 'app-view-paysheet',
    templateUrl: './view-paysheet.component.html',
    styleUrls: ['./view-paysheet.component.css']
  })
  export class ViewPaysheetComponent implements OnInit {
  
    addAdvanceForm: FormGroup;

    constructor(private formBuilder: FormBuilder,private ngZone: NgZone,private router: Router,private _bottomSheetRef: MatBottomSheetRef<ViewPaysheetComponent>,@Optional() @Inject(MAT_BOTTOM_SHEET_DATA) public data: AdvanceData,private attendanceService : AttendanceService) {
      console.log(data._id);
      
      this.addAdvanceForm = this.formBuilder.group({
        _id:[data._id,[Validators.required]],
        emp_id:[data.emp_id,[Validators.required]],
        name_in:[data.name_in,[Validators.required]],
        month:[data.month,[Validators.required]],
        days:[data.dates.length,[Validators.required]],
        day_pay:[(data.dates.length*data.day_pay),[Validators.required]],
        ots:[data.ots,[Validators.required]],
        ot_pay:[(data.ots*data.ot_pay),[Validators.required]],
        gross_pay:[(data.ots*data.ot_pay)+(data.dates.length*data.day_pay),[Validators.required]],
        epf:[(data.dates.length*data.day_pay)*3/100,[Validators.required]],
        etf:[(data.dates.length*data.day_pay)*0.8/100,[Validators.required]],
        total_deduct:[data.advance_paid+((data.dates.length*data.day_pay)*0.8/100)+((data.dates.length*data.day_pay)*3/100),[Validators.required]],
        net_pay:[((data.ots*data.ot_pay)+(data.dates.length*data.day_pay))-(data.advance_paid+((data.dates.length*data.day_pay)*0.8/100)+((data.dates.length*data.day_pay)*3/100)),[Validators.required]],
        advance_possible:[((data.dates.length*data.day_pay)-data.advance_paid),[Validators.required]],
        advance_req:[data.advance_req,[Validators.required]],
        advance_paid:[data.advance_paid,[Validators.required]],
    
      })
    }

    openLink(event: MouseEvent): void {
      this._bottomSheetRef.dismiss();
      console.log(this._bottomSheetRef);
      event.preventDefault();
    }

    updateAdvanceForm(){
      this.addAdvanceForm = this.formBuilder.group({
        emp_id:[''],
        name_in:[''],
        month:[''],
        possible_advance:[]
      })
      } 

      onCancel(){

        this._bottomSheetRef.dismiss();
      }
          
      //from here we have to print function

    ngOnInit(): void {
    }

    printSheet(){
      var element = document.getElementById('paysheet')
  
      html2canvas(element).then((canvas)=>{
        console.log(canvas);
  
        var imgData = canvas.toDataURL('image/png')
        var doc = new jspdf()
        var imgHeight = canvas.height *100 /canvas.width;
        doc.addImage(imgData,0,0,100,imgHeight)
        doc.save("paysheet.pdf")
      })
    }

  }
