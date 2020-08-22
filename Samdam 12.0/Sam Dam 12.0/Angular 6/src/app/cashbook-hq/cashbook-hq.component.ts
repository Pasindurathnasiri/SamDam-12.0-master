import { Component, OnInit,Inject,Optional,ViewChild } from '@angular/core';
import { MatDialog,MatDialogConfig} from '@angular/material/dialog';
import { AddTransactionComponent } from '../add-transaction/add-transaction.component';
import { AccountingService } from '../shared/accounting.service';
import {Transaction} from '../shared/accounting.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {SiteService} from '../shared/site.service';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { MatTableDataSource } from '@angular/material/table';
import {UpdateCashbookComponent} from '../cashbook-hq/update-cashbook/update-cashbook.component';
@Component({
  selector: 'app-cashbook-hq',
  templateUrl: './cashbook-hq.component.html',
  styleUrls: ['./cashbook-hq.component.css']
})
export class CashbookHqComponent implements OnInit {
  dataSourceTR:MatTableDataSource<Transaction>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  allTransactionsData :any =[];

  displayedColumnsTR:string[] = ['date','tr_id','site','description','bank_credit','bank_debit','cash_debit','cash_credit','balance','action']
  constructor(private dialog:MatDialog,private accService:AccountingService,private _bottomSheet:MatBottomSheet) {
    this.accService.getAllTransactions().subscribe(data=>{
      this.allTransactionsData=data;
      this.dataSourceTR = new MatTableDataSource<Transaction>(this.allTransactionsData);
      setTimeout(()=>{
        this.dataSourceTR.paginator = this.paginator;
      },0)
    })


   }

  ngOnInit(): void {
  }

  onAddTransaction(){
    const adddialogConfig =new MatDialogConfig();
    adddialogConfig.disableClose=false;
    adddialogConfig.autoFocus=true;
    adddialogConfig.width="75%";
    adddialogConfig.height="100%";
    this.dialog.open(AddTransactionComponent,adddialogConfig)
  }

  onUpdateTransaction(index:number,e){
    this._bottomSheet.open(UpdateCashbookComponent,{panelClass:'custom-width',data:e})

  }

  deleteTransaction(index:number,e){
    if(window.confirm('Are you sure you want to Delete the Transaction Record?')){
      const data = this.dataSourceTR.data;
      data.splice((this.paginator.pageIndex * this.paginator.pageSize)+index,1)
      this.dataSourceTR.data=data;
      this.accService.DeleteTransaction(e._id).subscribe()
    }
    window.alert("Transaction Record Deleted Succeccfully");
  }

  getDate(e){
    var dor = new Date(e.dor);
    return dor.toLocaleDateString();
  }

  //get balance
  getBalance(index:number,e){
   var i =index;
   var prev_bal=0;
   if(i==0){
    return (e.bank_credit+e.cash_debit)-(e.bank_debit+e.cash_credit);
   }else{
     for(var j=0;j<i;j++){
      prev_bal= prev_bal+(this.allTransactionsData[j].bank_credit+this.allTransactionsData[j].cash_debit)-(this.allTransactionsData[j].bank_debit+this.allTransactionsData[j].cash_credit);
   }
  var today_bal = (this.allTransactionsData[i].bank_credit+this.allTransactionsData[i].cash_debit)-(this.allTransactionsData[i].bank_debit+this.allTransactionsData[i].cash_credit);
  return prev_bal+today_bal;

   }
  }

}
