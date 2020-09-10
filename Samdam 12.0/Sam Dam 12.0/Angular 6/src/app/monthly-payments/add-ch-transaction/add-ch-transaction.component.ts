import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup ,Validators, NgForm } from '@angular/forms';
import { AccountingService} from '../../shared/accounting.service'
import { getMonth } from 'date-fns';

@Component({
  selector: 'app-add-ch-transaction',
  templateUrl: './add-ch-transaction.component.html',
  styleUrls: ['./add-ch-transaction.component.css']
})
export class AddChTransactionComponent implements OnInit {
  minDate: Date;
  maxDate: Date;
  public addCHTransactionGroup:FormGroup;
  showSucessMessage: boolean;
   serverErrorMessages: string;
  constructor(private formBuilder:FormBuilder,private accService:AccountingService) { 
   this.addCHTransactionGroup = this.formBuilder.group({
     chtr_id:[],
     doi:[Date],
     dot:[Date],
     type:[],
     description:[],
     bank_credit:[],
     bank_debit:[],
     rec_or_pay:[],
     month:[]
     
   })

   var currentDate = new Date();
   
  
   this.minDate = new Date();
   this.maxDate = new Date(currentDate);

  }

  ngOnInit(): void {
  }


  onAddCHTransaction(){
  //date converting
    
  var intmonth = getMonth(this.addCHTransactionGroup.value.dot);
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
    this.addCHTransactionGroup.value.month=strmonth;

    this.accService.addCHTransaction(this.addCHTransactionGroup.value).subscribe(
      res=>{
        setTimeout(()=> this.showSucessMessage=false,4000);
      },
      err=>{
        if(err){
          console.log("Cheque Record Adding Failed"+err);
        }else{
          this.serverErrorMessages = 'Something went Wrong';
        }
      }
    );
    window.alert("Cheque Record added Successfully..!");
    location.reload();

  }
}
