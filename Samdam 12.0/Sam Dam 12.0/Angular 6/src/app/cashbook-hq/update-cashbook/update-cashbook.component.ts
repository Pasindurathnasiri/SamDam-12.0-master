import { Component, OnInit,Inject,Optional,ViewChild} from '@angular/core';
import {MatBottomSheet, MatBottomSheetRef,MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';
import { FormGroup ,FormBuilder, Validators,FormControl} from '@angular/forms';
import {SiteService} from '../../shared/site.service';
import {AccountingService} from '../../shared/accounting.service'

export interface TransactionData{
  _id:string;
  tr_id:string;
  dor:string;
  site:Array<any>;
  month:string;
  description:string;
  bank_credit:number;
  bank_debit:number;
  cash_debit:number;
  cash_credit:number;

}

interface Site{
  _id:string;
  site_id:string;
  name: string;
  site: Array<Site>;
}

@Component({
  selector: 'app-update-cashbook',
  templateUrl: './update-cashbook.component.html',
  styleUrls: ['./update-cashbook.component.css']
})
export class UpdateCashbookComponent implements OnInit {
  public readonly transactionForm:FormGroup;
  siteControl = new FormControl('',Validators.required);
  siteFormControl = new FormControl('', Validators.required);
  sites: Site [] = [];
  AllSiteDate:any=[];

  constructor(private accService:AccountingService,private siteService:SiteService,private formBuilder: FormBuilder,private _bottomSheetRef: MatBottomSheetRef<UpdateCashbookComponent>,@Optional() @Inject(MAT_BOTTOM_SHEET_DATA) public data: TransactionData) { 
    this.transactionForm = formBuilder.group({
      _id:[data._id,[Validators.required]],
      dor:[data.dor,[Validators.required]],
      tr_id:[data.tr_id,[Validators.required]],
      site:[data.site,[Validators.required]],
      month:[data.month,[Validators.required]],
      description:[data.description,[Validators.required]],
      bank_credit:[data.bank_credit,[Validators.required]],
      bank_debit:[data.bank_debit,[Validators.required]],
      cash_debit:[data.cash_debit,[Validators.required]],
      cash_credit:[data.cash_credit,[Validators.required]]
    })

   //Get all Sites
   this.siteService.GetAllSites().subscribe(data =>{
    this.AllSiteDate = data;
    //in here pass sites to mat-select
     setTimeout(()=>{

     },0)
     this.sites = this.AllSiteDate;
  })


  }

  ngOnInit(): void {
  }

  onUpdateTransaction(){
    var id= this.transactionForm.value._id;
    if(window.confirm('Are you sure do you want to update this Record..?')){
      this.accService.updateTransaction(id,this.transactionForm.value).subscribe(res=>{

      })
    }this.onCancel();
  }

  getDate(){
    return this.transactionForm.value.dor;
  }

  onCancel(){
    this._bottomSheetRef.dismiss();
 }
}
