  import { Component, OnInit,Inject,Optional,ViewChild } from '@angular/core';
  import { MatDialog,MatDialogConfig} from '@angular/material/dialog';
  import { AddTransactionComponent } from '../../add-transaction/add-transaction.component';
  import { AccountingService } from '../../shared/accounting.service';
  import {Transaction} from '../../shared/accounting.model';
  import { MatPaginator } from '@angular/material/paginator';
  import { MatSort } from '@angular/material/sort';
  import { Router,ActivatedRoute } from '@angular/router';
  import {SiteService} from '../../shared/site.service';
  import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
  import { MatTableDataSource } from '@angular/material/table';
  import {UpdateCashbookComponent} from '../../cashbook-hq/update-cashbook/update-cashbook.component';
  import * as jspdf from 'jspdf';
  import html2canvas from 'html2canvas';

  @Component({
    selector: 'app-accounting-site-cashbook',
    templateUrl: './accounting-site-cashbook.component.html',
    styleUrls: ['./accounting-site-cashbook.component.css']
  })
  export class AccountingSiteCashbookComponent implements OnInit {
    dataSourceTR:MatTableDataSource<Transaction>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    allTransactionsData :any =[];
    allFilteredTransactionsData :any =[];
    AllSiteData:any =[];
    displayedColumnsTR:string[] = ['date','tr_id','site','description','bank_credit','bank_debit','cash_debit','cash_credit','balance'];

    constructor(private dialog:MatDialog,private actRoute:ActivatedRoute,private accService:AccountingService,private _bottomSheet:MatBottomSheet,private siteService:SiteService) {
      var site_id = this.actRoute.snapshot.paramMap.get('id');

      this.siteService.getSiteDetails(site_id).subscribe(data=>{
        this.AllSiteData=data;
      })
  
      this.accService.getAllTransactions().subscribe(data=>{
        this.allTransactionsData=data;
        this.dataSourceTR = new MatTableDataSource<Transaction>(this.allTransactionsData);
        this.dataSourceTR.filter = site_id;
        this.allFilteredTransactionsData = this.dataSourceTR.filteredData;
        console.log(this.dataSourceTR);
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
          prev_bal= prev_bal+(this.allFilteredTransactionsData[j].bank_credit+this.allFilteredTransactionsData[j].cash_debit)-(this.allFilteredTransactionsData[j].bank_debit+this.allFilteredTransactionsData[j].cash_credit); 
        
        }
        var today_bal = (e.bank_credit+e.cash_debit)-(e.bank_debit+e.cash_credit);
        return prev_bal+today_bal;

    }

    }

    getSiteName(){
      return this.AllSiteData.site_name;
    }


    print(){
      var element = document.getElementById('print_table')

    html2canvas(element).then((canvas)=>{
      

      var imgData = canvas.toDataURL('image/png')
      var doc = new jspdf()
      var imgHeight = canvas.height *200 /canvas.width;
      doc.addImage(imgData,0,10,200,imgHeight)
      doc.save("site_cashbook.pdf")
    })
    }
  }
