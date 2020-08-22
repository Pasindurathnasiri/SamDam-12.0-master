import { Component, OnInit,NgZone,Inject, Optional} from '@angular/core';
import {FormControl, FormBuilder, FormGroup ,Validators, NgForm} from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { AttendanceService } from '../../shared/attendance.service';
import { Attendance } from '../../shared/attendance.model';
import {MatBottomSheet, MatBottomSheetRef,MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';
import { NgIf } from '@angular/common';

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
  attendance:Array<Attendance>;  
}


@Component({
  selector: 'app-confirm-advance-single',
  templateUrl: './confirm-advance-single.component.html',
  styleUrls: ['./confirm-advance-single.component.css']
})
export class ConfirmAdvanceSingleComponent implements OnInit {

  confirmAdvanceForm: FormGroup;
  AllDatesData: any = [];

  constructor(private formBuilder:FormBuilder, private ngZone: NgZone,private router: Router,private _bottomSheetRef: MatBottomSheetRef<ConfirmAdvanceSingleComponent>,@Optional() @Inject(MAT_BOTTOM_SHEET_DATA) public data: AdvanceData,private attendanceService : AttendanceService) {

    this.AllDatesData=data;
    console.log(this.AllDatesData.dates.length)
   // console.log(this.AllDatesData[0].dates.length);
    this.confirmAdvanceForm = this.formBuilder.group({
      _id:[data._id,[Validators.required]],
      emp_id:[data.emp_id,[Validators.required]],
      name_in:[data.name_in,[Validators.required]],
      month:[data.month,[Validators.required]],
      advance_possible:[((this.AllDatesData.dates.length*data.day_pay)-data.advance_paid),[Validators.required]],
      advance_req:[data.advance_req,[Validators.required]],
      advance_paid:[data.advance_paid,[Validators.required]],
    })

   }
 
   onCancel(){
    if(window.confirm('Are you sure ? Do You want to Cancel Employee Advance Request.? ')){
      this._bottomSheetRef.dismiss();
      this.confirmAdvanceForm.value.advance_req = 0;
      var id = this.confirmAdvanceForm.value._id;
    this.attendanceService.IncreaseAttendance(id,this.confirmAdvanceForm.value).subscribe(res=>{
      this.ngZone.run(()=> this.router.navigateByUrl('/advance-pay'));
      this._bottomSheetRef.dismiss();
      location.reload();      
    })

    }
    
    }


  ngOnInit(): void {
  }

  getTotDays(i){
    return this.AllDatesData[i].dates.length;
  }

  confirmAdvanceRequest(){
    this.confirmAdvanceForm.value.advance_paid = this.confirmAdvanceForm.value.advance_paid+this.confirmAdvanceForm.value.advance_req;
    this.confirmAdvanceForm.value.advance_req = 0;
    var id = this.confirmAdvanceForm.value._id;
    this.attendanceService.IncreaseAttendance(id,this.confirmAdvanceForm.value).subscribe(res=>{
      this.ngZone.run(()=> this.router.navigateByUrl('/advance-pay'));
      this._bottomSheetRef.dismiss();
      
    })
    window.confirm("Employee Advance Confirmed!! ");
    location.reload();
 }

}
