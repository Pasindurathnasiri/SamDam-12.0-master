  import { Component, OnInit ,Inject,Optional,ViewChild} from '@angular/core';
  import {FormControl, FormBuilder, FormGroup ,Validators, NgForm} from '@angular/forms';
  import { MatTableDataSource } from '@angular/material/table';
  import { MatPaginator } from '@angular/material/paginator';
  import {SiteService} from '../../shared/site.service';
  import {QsService} from '../../shared/qs.service';
  import {BOQRecord} from '../../shared/boqrecord.model'
  import { Router,ActivatedRoute } from '@angular/router';
  import { MatSort } from '@angular/material/sort';
  import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
  import { UpdateBoqRecordComponent } from '../update-boq-record/update-boq-record.component'
  import { from } from 'rxjs';
  import * as jspdf from 'jspdf';
  import html2canvas from 'html2canvas';


  var site_hashedid;

  interface Unit {
    mat_unit: string;
  
  }

  @Component({
    selector: 'app-qs-site-costsheet',
    templateUrl: './qs-site-costsheet.component.html',
    styleUrls: ['./qs-site-costsheet.component.css']
  })
  export class QsSiteCostsheetComponent implements OnInit {
    
    public boqRecordForm:FormGroup;
    AllSiteData:any =[];
    AllBOQData:any =[];
    dataSourceBOQ:MatTableDataSource<BOQRecord>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    showSucessMessage: boolean;
    serverErrorMessages: string;
    displayedColumnsBOQ:string[]=['rec','description','unit','quantity','rate','value','action'];
    unitControl = new FormControl('',Validators.required);
    selectFormControl = new FormControl('',Validators.required);
    units: Unit[]=[
      {mat_unit:'KG'},
      {mat_unit:'Bags'},
      {mat_unit:'Cubes'},
      {mat_unit:'Tons'},
      {mat_unit:'Pieces'},
      {mat_unit:'Blocks'},  
      {mat_unit:'Liter'},
      {mat_unit:'Barrels'}
      
    ];
    constructor(private actRoute:ActivatedRoute,private _bottomSheet:MatBottomSheet,private _bottomSheetRef:MatBottomSheetRef,private formBuilder: FormBuilder,private siteService:SiteService,private qsService:QsService) {
      var site_id = this.actRoute.snapshot.paramMap.get('id');
      this.siteService.getSiteDetails(site_id).subscribe(data=>{
        this.AllSiteData=data;
        site_hashedid =data._id;
        
        
      })

      this.boqRecordForm= this.formBuilder.group({
        site_id:[],
        rec_no:[],
        description:[],
        unit:[],
        rate:[],
        quantity:[]

      })

      this.qsService.getAllBOQRecords().subscribe(data=>{
      this.AllBOQData=data;
      this.dataSourceBOQ= new MatTableDataSource<BOQRecord>(this.AllBOQData);
      this.dataSourceBOQ.filter = site_hashedid.trim().toString();
        setTimeout(()=>{
          this.dataSourceBOQ.paginator = this.paginator;
        })
      })

    }

    ngOnInit(): void {
    }

    getSiteName(){
      return this.AllSiteData.site_name;
    }

    onUpdateRec(e){
      this._bottomSheet.open(UpdateBoqRecordComponent,{panelClass:'custom-width',data:e})
    
    }

    onClear(){
      this.boqRecordForm= this.formBuilder.group({
        site_id:[''],
        rec_no:[''],
        description:[''],
        unit:[''],
        rate:[''],
        quantity:['']

      })
    }

    onAddBOQRec(){
      this.boqRecordForm.value.site_id=this.AllSiteData._id;
      this.qsService.addBOQRecord(this.boqRecordForm.value).subscribe(res=>{
        setTimeout(()=>this.showSucessMessage=false,4000);
      },
      err=>{
        if(err){
          console.log("BOQ Record Adding Failed"+err);
        }else{
          this.serverErrorMessages = "Something Went Wrong";
        }
      }
      );
      window.alert("BOQ Record Added Successfully..!");
      location.reload();
    }

    onRemoveRecord(index:number,e){
      if(window.confirm('Are you sure you want to Delete the BOQ Record?')){
        const data = this.dataSourceBOQ.data;
        data.splice((this.paginator.pageIndex * this.paginator.pageSize)+index,1)
        this.dataSourceBOQ.data=data;
        this.qsService.deleteBOQRecord(e._id).subscribe()
      }
      window.alert("BOQ Record Deleted Succeccfully");
    }

    print(){
      var element = document.getElementById('print_table')

    html2canvas(element).then((canvas)=>{
      console.log(canvas);

      var imgData = canvas.toDataURL('image/png')
      var doc = new jspdf()
      var imgHeight = canvas.height *235 /canvas.width;
      doc.addImage(imgData,0,0,235,imgHeight)
      doc.save("BoQRecord.pdf")
    })
    }

  }
