import { Component, OnInit } from '@angular/core';
import {FormControl, FormBuilder, FormGroup ,Validators, NgForm} from '@angular/forms';
import { SiteService } from '../../shared/site.service';
import { EmployeeService} from '../../shared/employee.service';
import { VehicleService} from '../../shared/vehicle.service'
import { from } from 'rxjs';


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
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.css']
})
export class AddVehicleComponent implements OnInit {
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


  public addVHGroup:FormGroup;
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


  constructor(private formBuilder:FormBuilder,private siteService:SiteService,private employeeService:EmployeeService,private vehicleService:VehicleService) {
   this.addVHGroup = this.formBuilder.group({
     reg_id:[],
     vh_type:[],
     brand:[],
     vh_model:[],
     buyer:[],
     dor:[Date],
     eng_cap:[],
     valueVH:[],
     chassie_no:[],
     eng_no:[],
     site:[],
     site_id:[],
     fuel_type:[],
     unit_rate:[],
     driver:[]
   });

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

   }

  ngOnInit(): void {
  }

  onAddVehicle(){
    this.addVHGroup.value.site_id = this.addVHGroup.value.site._id;
    this.vehicleService.AddVehicle(this.addVHGroup.value).subscribe(
      res=>{
        setTimeout(()=> this.showSucessMessage=false,4000);
      },
      err=>{
        if(err){
          console.log("Vehicle Adding Failed"+err);
        }else{
          this.serverErrorMessages = 'Something Went Wrong';
        }
      }
    );
    window.confirm("New Vehicle Added to the Warehouse Successfully");
    location.reload();
  }
  
}
