import { Component, OnInit } from '@angular/core';
import {AccountingService} from '../shared/accounting.service';
import { MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormControl, FormBuilder, FormGroup ,Validators, NgForm } from '@angular/forms';
import { SiteService } from '../shared/site.service';
import { getMonth } from 'date-fns';
import { add } from 'lodash';

interface Site{
  _id:string;
  site_id:string;
  name: string;
  site: Array<Site>;
}

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.css']
})
export class AddTransactionComponent implements OnInit {
  minDate: Date;
  maxDate: Date;
  siteControl = new FormControl('',Validators.required);
  siteFormControl = new FormControl('', Validators.required);
  sites: Site [] = [];
  AllSiteDate:any=[];
  public addTransactionGroup:FormGroup;
  showSucessMessage: boolean;
   serverErrorMessages: string;
  constructor(private formBuilder:FormBuilder,private accService:AccountingService,private siteService:SiteService,public dialogRef: MatDialogRef<AddTransactionComponent>) { 
   this.addTransactionGroup= this.formBuilder.group({
     dor:[Date],
     site:[],
     site_id:[],
     month:[],
     tr_id:[],
     description:[],
     bank_credit:[],
     bank_debit:[],
     cash_debit:[],
     cash_credit:[],
   })

   var currentDate = new Date().toLocaleDateString();
   
  
    this.minDate = new Date();
    this.maxDate = new Date(currentDate);

   //Get sites
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

  onTransaction(){
    var intmonth = getMonth(this.addTransactionGroup.value.dor);
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
    this.addTransactionGroup.value.month = strmonth;
    this.addTransactionGroup.value.site_id = this.addTransactionGroup.value.site._id;
   // console.log(this.addTransactionGroup);
    this.accService.addTransaction(this.addTransactionGroup.value).subscribe(
      res=>{

      },
      err=>{
        if(err){
          console.log("Transaction Record Adding Failed"+err);
        }else{
          console.log("Something Went Wrong..!");
      
        }
      }
    );window.alert("Transaction Added Successfully..!");
    this.onCancel();
    location.reload();
    
  }


  onCancel(){
    this.dialogRef.close({event:'Cancel'});
  }

}
