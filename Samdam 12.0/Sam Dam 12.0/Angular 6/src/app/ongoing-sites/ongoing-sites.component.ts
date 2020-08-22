import { Component, OnInit } from '@angular/core';
import { SiteService} from '../shared/site.service';
import { EmployeeService } from '../shared/employee.service';
import { VehicleService } from '../shared/vehicle.service';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {UpdateSiteDetailsComponent} from './update-site-details/update-site-details.component';
import { QsService } from '../shared/qs.service';
import {ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';

import { toNumber } from 'lodash';

@Component({
  selector: 'app-ongoing-sites',
  templateUrl: './ongoing-sites.component.html',
  styleUrls: ['./ongoing-sites.component.css']
})
export class OngoingSitesComponent implements OnInit {
  //progress bar
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  value = 50;
  //
  allSiteData: any = [];
  allEmoployeeData: any = [];
  allTaskData: any=[];
  allVehicleData: any = [];
  constructor(private siteService:SiteService,private _bottomSheet:MatBottomSheet,private empService:EmployeeService,private VHService:VehicleService,private qsService:QsService) {
    this.siteService.GetAllSites().subscribe(data=>{
      this.allSiteData=data;
      
      setTimeout(()=>{

      },0)
      
    })

    //employee data get
    this.empService.GetAllEmployees().subscribe(data=>{
      this.allEmoployeeData=data;
     
    })

    //vehicle data get
    this.VHService.GetAllVehicles().subscribe(data=>{
       this.allVehicleData = data;
      
    })

    //qs task get
    this.qsService.getAllTasks().subscribe(data=>{
       this.allTaskData =data;
       console.log(this.allTaskData);
    })

   }

  ngOnInit(): void {
  }

  //get no of employees
  getNoofEmployees(site){
   return site.no_of_sk+site.no_of_usk;
  }

  getAllocatedEmp(site){
    var count=0;
    for(var i=0;i<this.allEmoployeeData.length;i++){
      if(this.allEmoployeeData[i].site[0]._id == site._id){
        count = count+1;
      }
      
    }
   return count;
  }

  getAllocatedVH(site){
    var vhcount=0;
    for(var i=0;i<this.allVehicleData.length;i++){
      if(this.allVehicleData[i].site_id== site._id){
        vhcount = vhcount+1;
      }
    }
    return vhcount;
  }

  getDate(date){
    var dot = new Date(date);
  return dot.toLocaleDateString();
  }

  getType(site){
    return site.type_of_site[0].name;
  }

  openUpdate(site){
    this._bottomSheet.open(UpdateSiteDetailsComponent,{panelClass:'custom-width',data:site})

  }

  deleteSite(site){
    var id = site._id;
    if(window.confirm('Are you sure you want to Delete this Site Details ?')){
      this.siteService.deleteSite(id).subscribe()
    }
    window.alert("Transaction Record Deleted Succeccfully");
    location.reload();
  }

  getProcess(site){
    var process:number=0;
    var no_of_tasks:number =0
    for(var i=0;i<this.allTaskData.length;i++){
      if(this.allTaskData[i].site_id== site._id){
        process = process+this.allTaskData[i].progress;
        no_of_tasks = no_of_tasks+1
      }
    }
   
    return parseInt(`${process/no_of_tasks}`);
  }

}
