import { Component, OnInit,Inject,Optional,ViewChild} from '@angular/core';
import { FormControl, FormBuilder, FormGroup ,Validators, NgForm } from '@angular/forms';
import {MatBottomSheet, MatBottomSheetRef,MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';
import {QsService} from '../../shared/qs.service';

export interface BOQData{
  _id:string;
  site_id:string;
  rec_no:string;
  description:string;
  unit:Array<any>;
  rate:number;
  quantity:number;
}

@Component({
  selector: 'app-update-boq-record',
  templateUrl: './update-boq-record.component.html',
  styleUrls: ['./update-boq-record.component.css']
})
export class UpdateBoqRecordComponent implements OnInit {
  showSucessMessage: boolean;
  serverErrorMessages: string;
  public updateboqRecordForm:FormGroup;

  constructor(private qsService:QsService,private formBuilder:FormBuilder,private _bottomSheetRef: MatBottomSheetRef<UpdateBoqRecordComponent>,@Optional() @Inject(MAT_BOTTOM_SHEET_DATA) public data: BOQData) {
  console.log(data);
    this.updateboqRecordForm = formBuilder.group({
     _id:[data._id,[Validators.required]],
     site_id:[data.site_id,[Validators.required]],
     rec_no:[data.rec_no,[Validators.required]],
     description:[data.description,[Validators.required]],
     unit:[data.unit,[Validators.required]],
     rate:[data.rate,[Validators.required]],
     quantity:[data.quantity,[Validators.required]],

   })


   }

   
  onCancel(){
    this._bottomSheetRef.dismiss();
  }

  ngOnInit(): void {
   
  }

  onUpdateBOQRec(){
    var id = this.updateboqRecordForm.value._id;
    if(window.confirm('Are you sure you want to Update BOQ Record?')){
      this.qsService.updateBOQRecord(id,this.updateboqRecordForm.value).subscribe(res=>{
        })
    }this.onCancel();
    // location.reload();
  }
}
