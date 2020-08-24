import { Component, OnInit,ViewChild } from '@angular/core';
import { MatDialog,MatDialogConfig} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import {FormControl, FormBuilder, FormGroup ,Validators, NgForm} from '@angular/forms';
import { AddMaterialComponent} from '../add-material/add-material.component';
import { MaterialService} from '../shared/material.service';
import { MatTableDataSource } from '@angular/material/table';
import { Material} from '../shared/material.model';
import { Vehicle } from '../shared/vehicle.model';
import {EqipmentRecord} from '../shared/equipmentrecord.model';
import { Eqipment } from '../shared/equipment.model';
import { VehicleService } from '../shared/vehicle.service';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {UpdateMaterialTypeComponent} from '../wh-hq-page/update-material-type/update-material-type.component'
import {DialogBoxComponent} from '../dialog-box/dialog-box.component';
import { MatInfoDateDialogComponent } from '../wh-hq-page/mat-info-date-dialog/mat-info-date-dialog.component';
import { TransferMaterialComponent} from '../wh-hq-page/transfer-material/transfer-material.component';
import { AddEqHqComponent} from '../wh-hq-page/add-eq-hq/add-eq-hq.component';
import { from } from 'rxjs';
import { UpdateEquipmentComponent } from '../wh-hq-page/update-equipment/update-equipment.component';
import { TransferEquipmentComponent } from '../wh-hq-page/transfer-equipment/transfer-equipment.component';
import { AddVehicleComponent } from '../wh-hq-page/add-vehicle/add-vehicle.component';
import {UpdateVehicleComponent} from '../wh-hq-page/update-vehicle/update-vehicle.component';
import {TranferVehicleComponent} from '../wh-hq-page/tranfer-vehicle/tranfer-vehicle.component';
import {RunningChartComponent} from '../wh-hq-page/running-chart/running-chart.component';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-wh-hq-page',
  templateUrl: './wh-hq-page.component.html',
  styleUrls: ['./wh-hq-page.component.css']
})
export class WhHqPageComponent implements OnInit {
  AllMaterialData: any =[];
  AllEquipmentData: any =[];
  AllEQRecordsData: any =[];
  AllMaterialDatesData: any =[];
  AllVehicleData: any =[];
  forSelectMonth:FormGroup;
  searchKey: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public dataSourceMatTypes: MatTableDataSource<Material>;
  public dataSourceMatDates: MatTableDataSource<Material>;
  public dataSourceEQRecords: MatTableDataSource<EqipmentRecord>
  public dataSourceEQ: MatTableDataSource<Eqipment>;
  public dataSourceVH: MatTableDataSource<Vehicle>;
  

  displayedColumns: string [] = ['mat_id', 'name','unit','price','action'];
  displayerColomnsEQ: string [] = ['eq_id', 'eq_type','brand_name','price_unit','buyer','dom','amount','action'];
  displayedColumnsMat: string[]=[];
  displayedColumnsVH: string[]=['reg_id','vh_type','brand','model','rate','site','driver','action'];
  displayerColomnsEQREC: string[] = ['dot','site','hoe','pan','Mason_Handtool','axe','ball_hammer','chisel','drill','grinders','Hacksaw_Metal','hammer','handsaw','safty_glass','safty_gloves','Safty_Helmet','Screwdrivers','Shovel','Spirit_Level','Tape_Measures','Wrench','action'];
 
  constructor(private dialog:MatDialog,private formBuilder: FormBuilder,private materialService:MaterialService,private _bottomSheet:MatBottomSheet,private _bottomSheetRef:MatBottomSheetRef,private vehicleService:VehicleService) {
    materialService.getAllMaterialTypes().subscribe(data=>{
     this.AllMaterialData = data;
     this.dataSourceMatTypes = new MatTableDataSource<Material>(this.AllMaterialData);
     console.log(this.AllMaterialData);

     for(var i=1;i<this.AllMaterialData.length+1;i++){
      this.displayedColumnsMat[0]="Date";
      this.displayedColumnsMat[i]=this.AllMaterialData[i-1].mat_name;  
     // this.displayedColumnsMat[this.AllMaterialData.length+1]="action";
    }
    
     setTimeout(() => {
       this.dataSourceMatTypes.paginator = this.paginator;
     }, 0);
    })

    //Get all Material Dates
    materialService.getAllMaterialDates().subscribe(data=>{
      this.AllMaterialDatesData=data;
      console.log(this.AllMaterialDatesData);
      this.dataSourceMatDates = new MatTableDataSource<Material>(this.AllMaterialDatesData);
      this.dataSourceMatDates.filter = "HQ";
      setTimeout(() => {
        this.dataSourceMatDates.paginator = this.paginator;
      }, 0);
    })
    this.forSelectMonth= this.formBuilder.group({
      
      select_month:[]
    })
   
    //Equipment Data Table 
    materialService.getAllEquipment().subscribe(data=>{
      this.AllEquipmentData=data;
      console.log(this.AllEquipmentData);
      this.dataSourceEQ = new MatTableDataSource<Eqipment>(this.AllEquipmentData);
      setTimeout(()=>{
        this.dataSourceEQ.paginator = this.paginator;
      },0)
    });

    //get all vehicle details
    vehicleService.GetAllVehicles().subscribe(data=>{
      this.AllVehicleData=data;
      console.log(this.AllVehicleData);
      this.dataSourceVH = new MatTableDataSource<Vehicle>(this.AllVehicleData);
      setTimeout(()=>{
        this.dataSourceVH.paginator = this.paginator;
      },0)
    });

    //get all eq records
    materialService.getAllEQRecords().subscribe(data=>{
     this.AllEQRecordsData=data;
     console.log(this.AllEQRecordsData);
     this.dataSourceEQRecords = new MatTableDataSource<EqipmentRecord>(this.AllEQRecordsData);
     setTimeout(()=>{
      this.dataSourceEQRecords.paginator = this.paginator;
    },0)
    })

   }

  ngOnInit(): void {

  }

  
onAdd(){
  const adddialogConfig =new MatDialogConfig();
  adddialogConfig.disableClose=false;
  adddialogConfig.autoFocus=true;
  adddialogConfig.width="75%";
  adddialogConfig.height="100%";
  this.dialog.open(AddMaterialComponent,adddialogConfig)
}

onAddEQ(){
  const adddialogConfig =new MatDialogConfig();
  adddialogConfig.disableClose=false;
  adddialogConfig.autoFocus=true;
  adddialogConfig.width="75%";
  adddialogConfig.height="100%";
  this.dialog.open(AddEqHqComponent,adddialogConfig)
}

onAddVH(){
  const adddialogConfig =new MatDialogConfig();
  adddialogConfig.disableClose=false;
  adddialogConfig.autoFocus=true;
  adddialogConfig.width="75%";
  adddialogConfig.height="100%";
  this.dialog.open(AddVehicleComponent,adddialogConfig)
}



getMaterialBalance(column){

switch(column){
  case 'Date' :return 'Current Balance' ; break;
  case 'HBlock_4':return  (this.AllMaterialDatesData.map(t=>t.HBlock_4_R).reduce((acc,value)=>acc+value,0))-(this.AllMaterialDatesData.map(t=>t.HBlock_4).reduce((acc,value)=>acc+value,0)); break;
  case 'T_10':return (this.AllMaterialDatesData.map(t=>t.T_10_R).reduce((acc,value)=>acc+value,0))-(this.AllMaterialDatesData.map(t=>t.T_10).reduce((acc,value)=>acc+value,0));break;
  case 'sand':return (this.AllMaterialDatesData.map(t=>t.sand_R).reduce((acc,value)=>acc+value,0))-(this.AllMaterialDatesData.map(t=>t.sand).reduce((acc,value)=>acc+value,0));break;
  case 'metal_1':return (this.AllMaterialDatesData.map(t=>t.metal_1_R).reduce((acc,value)=>acc+value,0))-(this.AllMaterialDatesData.map(t=>t.metal_1).reduce((acc,value)=>acc+value,0));break;
  case 'T_32':return (this.AllMaterialDatesData.map(t=>t.T_32_R).reduce((acc,value)=>acc+value,0))-(this.AllMaterialDatesData.map(t=>t.T_32).reduce((acc,value)=>acc+value,0));break;
  case 'ABC':return (this.AllMaterialDatesData.map(t=>t.ABC_R).reduce((acc,value)=>acc+value,0))-(this.AllMaterialDatesData.map(t=>t.ABC).reduce((acc,value)=>acc+value,0));break;
  case 'binding':return (this.AllMaterialDatesData.map(t=>t.binding_R).reduce((acc,value)=>acc+value,0))-(this.AllMaterialDatesData.map(t=>t.binding).reduce((acc,value)=>acc+value,0));break;
  case 'metal_1h':return (this.AllMaterialDatesData.map(t=>t.metal_1h_R).reduce((acc,value)=>acc+value,0))-(this.AllMaterialDatesData.map(t=>t.metal_1h).reduce((acc,value)=>acc+value,0));break; 
  case 'cement':return (this.AllMaterialDatesData.map(t=>t.cement_R).reduce((acc,value)=>acc+value,0))-(this.AllMaterialDatesData.map(t=>t.cement).reduce((acc,value)=>acc+value,0));break;
  case 'cement':return (this.AllMaterialDatesData.map(t=>t.cement_R).reduce((acc,value)=>acc+value,0))-(this.AllMaterialDatesData.map(t=>t.cement).reduce((acc,value)=>acc+value,0));break;
  case 'metal_3q':return (this.AllMaterialDatesData.map(t=>t.metal_3q_R).reduce((acc,value)=>acc+value,0))-(this.AllMaterialDatesData.map(t=>t.metal_3q).reduce((acc,value)=>acc+value,0));break;
  case 'T_16':return (this.AllMaterialDatesData.map(t=>t.T_16_R).reduce((acc,value)=>acc+value,0))-(this.AllMaterialDatesData.map(t=>t.T_16).reduce((acc,value)=>acc+value,0));break;
  case 'HBlock_6':return (this.AllMaterialDatesData.map(t=>t.HBlock_6_R).reduce((acc,value)=>acc+value,0))-(this.AllMaterialDatesData.map(t=>t.HBlock_6).reduce((acc,value)=>acc+value,0));break;
 
  default : return 0;

}
/**

 
  
   */
//  this.AllMaterialDatesData.map(t=>t.(column)).reduce((acc,value)=>acc+value,0);
//return bal;
// console.log(bal);
}

onMonthChange(){
  var selectedmonth = this.forSelectMonth.value.select_month;
  this.materialService.getAllMaterialDatesmonth(selectedmonth).subscribe(data=>{
    this.AllMaterialDatesData =data;   
  
    console.log(this.AllMaterialDatesData);
  
     this.dataSourceMatDates = new MatTableDataSource<Material>(this.AllMaterialDatesData);
   
  setTimeout(() => {
   // this.dataSource.paginator = this.paginator;
  }, 0);
  })
 
}

getDate(e){
  var dom = new Date(e.dom);
  return dom.toLocaleDateString();
}

getEQRECDate(e){
  var dot = new Date(e.dot);
  return dot.toLocaleDateString();
}


deleteMaterialType(index:number,e){
   if(window.confirm('Are you Sure Do you want to remove this Material type?')){
     const data = this.dataSourceMatTypes.data;
     data.splice((this.paginator.pageIndex* this.paginator.pageSize)+index,1)
     this.dataSourceMatTypes.data=data;
     this.materialService.DeleteMaterial(e._id).subscribe();
   }
}

infoDateDialog(e){

 this._bottomSheet.open(MatInfoDateDialogComponent,{panelClass:'custom-width',data:e})
}
updateMaterialType(index:number,e){
this._bottomSheet.open(UpdateMaterialTypeComponent,{panelClass:'custom-width',data:e})
}

openRunningChart(index:number,e){
  this._bottomSheet.open(RunningChartComponent,{panelClass:'custom-width',data:e})
}

openDialog(action,obj) {
  obj.action = action;
  // console.log(action)
  const dialogRef = this.dialog.open(DialogBoxComponent, {
    width: '600px',
    data:obj
  });

  dialogRef.afterClosed().subscribe(result => {
    // if(result.event == 'Add'){
    //   this.addRowData(result.data);
    // }else if(result.event == 'Update'){
    //   this.updateRowData(result.data);
    // }else if(result.event == 'Delete'){
    //   this.deleteRowData(result.data);
    // }
  });
}

//delete equipment
deleteEquipment(index: number,e){
if(window.confirm('Are you sure you want to Delete the Equipment?')){
  const data = this.dataSourceEQ.data;
  data.splice((this.paginator.pageIndex * this.paginator.pageSize)+index,1)
  this.dataSourceEQ.data=data;
  this.materialService.DeleteEquipment(e._id).subscribe()
}
}

//Delete eq record
deleteEQRec(index:number,e){
  if(window.confirm('Are you sure you want to Delete this Equipment Transfer Record?')){
    const data = this.dataSourceEQRecords.data;
    data.splice((this.paginator.pageIndex * this.paginator.pageSize)+index,1)
    this.dataSourceEQRecords.data=data;
    this.materialService.DeleteEQRec(e._id).subscribe()
  } 
}

//Delete vehicle
deleteVH(index: number,e){
  if(window.confirm('Are you sure you want to Remove this Vehicle From the Warehouse?')){
    const data = this.dataSourceVH.data;
    data.splice((this.paginator.pageIndex * this.paginator.pageSize)+index,1)
    this.dataSourceVH.data=data;
    this.vehicleService.deleteVehicle(e._id).subscribe()
  }
}

//update equipment details
updateEquipment(index :number,e){
  this._bottomSheet.open(UpdateEquipmentComponent,{panelClass:'custom-width',data:e})

}

updateVH(index :number,e){
  this._bottomSheet.open(UpdateVehicleComponent,{panelClass:'custom-width',data:e})

}

onTransfer(){
  const adddialogConfig =new MatDialogConfig();
  adddialogConfig.disableClose=false;
  adddialogConfig.autoFocus=true;
  adddialogConfig.width="75%";
  adddialogConfig.height="100%";
  this.dialog.open(TransferMaterialComponent,adddialogConfig)
}

openTransfer(){
  const adddialogConfig =new MatDialogConfig();
  adddialogConfig.disableClose=false;
  adddialogConfig.autoFocus=true;
  adddialogConfig.width="75%";
  adddialogConfig.height="100%";
  this.dialog.open(TransferEquipmentComponent,adddialogConfig)
}

openVHTransfer(){
  const adddialogConfig =new MatDialogConfig();
  adddialogConfig.disableClose=false;
  adddialogConfig.autoFocus=true;
  adddialogConfig.width="75%";
  adddialogConfig.height="100%";
  this.dialog.open(TranferVehicleComponent,adddialogConfig)
}

onSearchClear(){
  this.searchKey ='';
  this.applyFiltermattype();
}

applyFiltermattype(){
  return this.dataSourceMatTypes.filter= this.searchKey.trim().toLowerCase();
}

printTable(){
  var element = document.getElementById('print_table')

   html2canvas(element).then((canvas)=>{
     console.log(canvas);

     var imgData = canvas.toDataURL('image/png')
     var doc = new jspdf()
     var imgHeight = canvas.height *235 /canvas.width;
     doc.addImage(imgData,0,0,235,imgHeight)
     doc.save("materialRecords.pdf")
   })
}

applyFilterRec(){
  return this.dataSourceEQRecords.filter= this.searchKey.trim().toLowerCase();
}

printTableVH(){
  var element = document.getElementById('tableVH')

   html2canvas(element).then((canvas)=>{
     console.log(canvas);

     var imgData = canvas.toDataURL('image/png')
     var doc = new jspdf()
     var imgHeight = canvas.height *235 /canvas.width;
     doc.addImage(imgData,0,0,235,imgHeight)
     doc.save("Vehicles.pdf")
   })
}
}
