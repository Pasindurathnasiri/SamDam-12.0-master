import { Component, OnInit,Inject, Optional } from '@angular/core';
import {MatBottomSheet, MatBottomSheetRef,MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';
import { FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import {VehicleService } from '../../shared/vehicle.service';
import { SiteService} from '../../shared/site.service';
import {EmployeeService} from '../../shared/employee.service';

export interface VehicleData{
     _id:string;
     reg_id:string;
     vh_type:Array<any>;
     brand:string
     vh_model:string;
     buyer:string;
     dor:string
     eng_cap:number;
     valueVH:number;
     chassie_no:string;
     eng_no:string;
     site:Array<any>;
     site_id:string;
     fuel_type:Array<any>;
     unit_rate:number;
     driver:Array<any>;

}

interface VH {
  vh_type: string;
}

interface Site{
  _id:string;
  site_id:string;
  name: string;
  site: Array<Site>;
}

interface Driver{
  _id:string;
  emp_id: string;
  name_in: string;
}

@Component({
  selector: 'app-update-vehicle',
  templateUrl: './update-vehicle.component.html',
  styleUrls: ['./update-vehicle.component.css']
})
export class UpdateVehicleComponent implements OnInit {

  AllSiteData:any=[];
  AllDriverData:any=[];
  //getting availabale sites
  siteControl = new FormControl('',Validators.required);
  siteFormControl = new FormControl('', Validators.required);
  sites: Site [] = [];
  //getting available drivers
  driverControl = new FormControl('',Validators.required);
  driverFormControl = new FormControl('', Validators.required);
  drivers: Driver [] = [];


  public updateVHGroup:FormGroup;
  showSucessMessage: boolean;
   serverErrorMessages: string;
   vhControl = new FormControl('',Validators.required);
   selectFormControl = new FormControl('',Validators.required);
   vh_types: VH[]=[
     {vh_type:'Dump_Truck'},
     {vh_type:'Body_Lorry'},
     {vh_type:'Skavator'},
     {vh_type:'JCB'},
     {vh_type:'Dumper'},
     {vh_type:'Carry_Lorry'},
     {vh_type:'Car_Mix'},
     {vh_type:'Truck_Mixture'},
     {vh_type:'Mixture'},
     {vh_type:'Cab'},
     {vh_type:'Van'},
     {vh_type:'Car'},
     {vh_type:'VR_Roller'},
     {vh_type:'Concrete_Pumper'},
     {vh_type:'VR_Roller'},
   ];


  constructor(private formBuilder: FormBuilder,private _bottomSheetRef: MatBottomSheetRef<UpdateVehicleComponent>,@Optional() @Inject(MAT_BOTTOM_SHEET_DATA) public data: VehicleData,private vehicleService:VehicleService,private employeeService:EmployeeService,private siteService:SiteService) { 
 
    this.updateVHGroup= formBuilder.group({
      _id:[data._id,[Validators.required]],
      reg_id:[data.reg_id,[Validators.required]],
      vh_type:[data.vh_type,[Validators.required]],
      brand:[data.brand,[Validators.required]],
      vh_model:[data.vh_model,[Validators.required]],
      buyer:[data.buyer,[Validators.required]],
      dor:[data.dor,[Validators.required]],
      eng_cap:[data.eng_cap,[Validators.required]],
      valueVH:[data.valueVH,[Validators.required]],
      chassie_no:[data.chassie_no,[Validators.required]],
      eng_no:[data.eng_no,[Validators.required]],
      site:[data.site,[Validators.required]],
      site_id:[data.site_id,[Validators.required]],
      fuel_type:[data.fuel_type,[Validators.required]],
      unit_rate:[data.unit_rate,[Validators.required]],
      driver:[data.driver,[Validators.required]],
    })

    this.siteService.GetAllSites().subscribe(data =>{
      this.AllSiteData = data;
      //in here pass sites to mat-select
       setTimeout(()=>{
  
       },0)
       this.sites = this.AllSiteData;
    })
  
    //get all employees
    this.employeeService.GetAllEmployees().subscribe(data=>{
      this.AllDriverData = data;
      setTimeout(()=>{
  
      },0)
      this.drivers = this.AllDriverData;
    })
  
     console.log(this.updateVHGroup.value);

  }

  ngOnInit(): void {
  }

  onUpdateVehicle(){
    console.log(this.updateVHGroup.value);
    var id=this.updateVHGroup.value._id;

    if(window.confirm('Are you sure you want to update Vehicle Details?')){
      this.vehicleService.updateVehicle(id,this.updateVHGroup.value).subscribe(res=>{
        })
    }this.onCancel();
    //location.reload();
  
  }

  
  onCancel(){
    this._bottomSheetRef.dismiss();
 }
}
