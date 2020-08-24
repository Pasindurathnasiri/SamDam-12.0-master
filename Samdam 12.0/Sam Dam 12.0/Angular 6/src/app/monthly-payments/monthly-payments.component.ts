import { Component, OnInit,ViewChild } from '@angular/core';
import { AddChTransactionComponent } from '../monthly-payments/add-ch-transaction/add-ch-transaction.component'
import { MatDialog,MatDialogConfig} from '@angular/material/dialog';
import { AccountingService } from '../shared/accounting.service';
import {CHTransaction} from '../shared/chtransaction.model'
import { MatPaginator } from '@angular/material/paginator';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { MatSort } from '@angular/material/sort';
import { MatTable,MatTableDataSource } from '@angular/material/table';
import {UpdateChTransactionsComponent} from './update-ch-transactions/update-ch-transactions.component'
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-monthly-payments',
  templateUrl: './monthly-payments.component.html',
  styleUrls: ['./monthly-payments.component.css']
})
export class MonthlyPaymentsComponent implements OnInit {
  AllCHTransactionData: any = [];
  public dataSourceCH: MatTableDataSource<CHTransaction>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumnsCH: string [] = ['chtr_id', 'doi','dot','type','description','bank_debit','bank_credit','recpay','action'];
 

  constructor(private dialog:MatDialog,private accService:AccountingService,private _bottomSheet:MatBottomSheet,private _bottomSheetRef:MatBottomSheetRef) { 
    this.accService.getAllChequeTransactions().subscribe(data=>{
     this.AllCHTransactionData=data;
     console.log(this.AllCHTransactionData);
     this.dataSourceCH = new MatTableDataSource<CHTransaction>(this.AllCHTransactionData);
     setTimeout(()=>{
       this.dataSourceCH.paginator = this.paginator;
     },0)
    })
  }

  ngOnInit(): void {
  }

  onAddCHTransaction(){
    const adddialogConfig =new MatDialogConfig();
    adddialogConfig.disableClose=false;
    adddialogConfig.autoFocus=true;
    adddialogConfig.width="75%";
    adddialogConfig.height="100%";
    this.dialog.open(AddChTransactionComponent,adddialogConfig)
  }

  getDOI(index:number,e){
    var doi = new Date(e.doi);
    return doi.toLocaleDateString();
  }

  getDOT(index:number,e){
    var dot = new Date(e.dot);
    return dot.toLocaleDateString();
     
  }

  onUpdateCHTransaction(index:number,e){
    this._bottomSheet.open(UpdateChTransactionsComponent,{panelClass:'custom-width',data:e})
   
  }

  deleteCHTransaction(index:number,e){
    if(window.confirm('Are you sure do you want to Remove this Cheque Transaction.?')){
      const data= this.dataSourceCH.data;
      data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index,1)
      this.dataSourceCH.data = data;
      this.accService.DeleteCHTransaction(e._id).subscribe()
      
    }

  }

  printTableCH(){
    var element = document.getElementById('print_table')

    html2canvas(element).then((canvas)=>{
      console.log(canvas);
 
      var imgData = canvas.toDataURL('image/png')
      var doc = new jspdf()
      var imgHeight = canvas.height *235 /canvas.width;
      doc.addImage(imgData,0,0,235,imgHeight)
      doc.save("ch_transaction.pdf")
    })
  }
}
