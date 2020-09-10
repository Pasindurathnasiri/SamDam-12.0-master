  import { Component, OnInit,Inject, Optional } from '@angular/core';
  import { FormControl, FormBuilder, FormGroup ,Validators, NgForm } from '@angular/forms';
  import { AccountingService} from '../../shared/accounting.service'
  import { getMonth } from 'date-fns';
  import {MatBottomSheet, MatBottomSheetRef,MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';


  export interface CHTransactionData{
    _id:string;
    doi:string;
    dot:string;
    type:Array<any>;
    month:string;
    chtr_id:string;
    description:string;
    bank_credit:number;
    bank_debit:number;
    rec_or_pay:string;
  }

  @Component({
    selector: 'app-update-ch-transactions',
    templateUrl: './update-ch-transactions.component.html',
    styleUrls: ['./update-ch-transactions.component.css']
  })
  export class UpdateChTransactionsComponent implements OnInit {
    public updateCHTransactionForm:FormGroup;
    constructor(private formBuilder: FormBuilder,private _bottomSheetRef: MatBottomSheetRef<UpdateChTransactionsComponent>,@Optional() @Inject(MAT_BOTTOM_SHEET_DATA) public data: CHTransactionData,private accService:AccountingService) {
    this.updateCHTransactionForm= formBuilder.group({
      _id:[data._id,[Validators.required]],
      doi:[data.doi,[Validators.required]],
      dot:[data.dot,[Validators.required]],
      type:[data.type,[Validators.required]],
      month:[data.month,[Validators.required]],
      chtr_id:[data.chtr_id,[Validators.required]],
      description:[data.description,[Validators.required]],
      bank_credit:[data.bank_credit,[Validators.required]],
      bank_debit:[data.bank_debit,[Validators.required]],
      rec_or_pay:[data.rec_or_pay,[Validators.required]],
    })

    }

    ngOnInit(): void {
    }


    onCancel(){
      this._bottomSheetRef.dismiss();
    }

    onUpdateCHTransaction(){
      var id = this.updateCHTransactionForm.value._id;
      if(window.confirm('Are you sure you want to Cheque Transaction Details?')){
        this.accService.updateCHTransaction(id,this.updateCHTransactionForm.value).subscribe(res=>{
          })
      }this.onCancel();
      location.reload();
    }
  }
