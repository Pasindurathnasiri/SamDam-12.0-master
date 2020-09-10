  import { Component, OnInit,NgZone,Inject, Optional} from '@angular/core';
  import {FormControl, FormBuilder, FormGroup ,Validators, NgForm} from '@angular/forms';
  import { Router,ActivatedRoute } from '@angular/router';
  import { AttendanceService } from '../../shared/attendance.service'
  import {MatBottomSheet, MatBottomSheetRef,MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';
  import { from } from 'rxjs';

  export interface AdvanceData{
    _id:string;
    emp_id: string;
    name_in : string;
    month : string;
    days:number;
    advance_req:number;
    advance_paid:number;
    ots:number;
    
  }

  @Component({
    selector: 'app-add-advance-single',
    templateUrl: './add-advance-single.component.html',
    styleUrls: ['./add-advance-single.component.css']
  })
  export class AddAdvanceSingleComponent implements OnInit {
    
    addAdvanceForm: FormGroup;


    constructor(private formBuilder: FormBuilder,private ngZone: NgZone,private router: Router,private _bottomSheetRef: MatBottomSheetRef<AddAdvanceSingleComponent>,@Optional() @Inject(MAT_BOTTOM_SHEET_DATA) public data: AdvanceData,private attendanceService : AttendanceService) { 
    
    console.log(data);
    
      this.addAdvanceForm = this.formBuilder.group({
        _id:[data._id,[Validators.required]],
        emp_id:[data.emp_id,[Validators.required]],
        name_in:[data.name_in,[Validators.required]],
        month:[data.month,[Validators.required]],
        possible_advance:[data.days,[Validators.required]],
        advance_req:[data.advance_req,[Validators.required]],
      
      })
    
    }

    openLink(event: MouseEvent): void {
      this._bottomSheetRef.dismiss();
      console.log(this._bottomSheetRef);
      event.preventDefault();
    }

    ngOnInit(){
    //this.updateAdvanceForm();
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
    
  addAdvanceRequest(){
    var id = this.addAdvanceForm.value._id;
    this.attendanceService.IncreaseAttendance(id,this.addAdvanceForm.value).subscribe(res=>{
      this.ngZone.run(()=> this.router.navigateByUrl('/advance-pay'));
      this._bottomSheetRef.dismiss();
      
    })
    window.confirm("Employee Advance Added Successfully");
    location.reload();
  }
  }
