  import { Component, OnInit } from '@angular/core';
  import { MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
  import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
  import { SiteService } from '../../shared/site.service';
  import { MaterialService} from '../../shared/material.service'



  interface Site{
    _id:string;
    site_id:string;
    name: string;
    site: Array<Site>;
  }

  @Component({
    selector: 'app-transfer-equipment',
    templateUrl: './transfer-equipment.component.html',
    styleUrls: ['./transfer-equipment.component.css']
  })
  export class TransferEquipmentComponent implements OnInit {
    siteControl = new FormControl('',Validators.required);
    siteFormControl = new FormControl('', Validators.required);
    sites: Site [] = [];
    AllSiteDate:any=[];
    AllEQTypes:any=[];
    showSucessMessage: boolean;
    
    serverErrorMessages: string;
    transferEQForm: FormGroup;
    public equipments: any[]=[{equipment:''}];
    public eqTypes: any[]=[];
    constructor(private _formBuilder: FormBuilder,public dialogRef: MatDialogRef<TransferEquipmentComponent>,private siteService:SiteService,private materialService: MaterialService) { 
      this.siteService.GetAllSites().subscribe(data =>{
        this.AllSiteDate = data;
        //in here pass sites to mat-select
        setTimeout(()=>{

        },0)
        this.sites = this.AllSiteDate;
      })
    //get all equipment data

    //Gettiing Material Types
    materialService.getAllEquipment().subscribe(dataEQ=>{
      this.AllEQTypes=dataEQ;
      
      for(var i=0;i<this.AllEQTypes.length;i++){
          
        this.equipments[i]=this.AllEQTypes[i].eq_type[0].eq_type;  
        
      }
  //console.log(this.equipments);
    })

  //form control 
    this.transferEQForm= this._formBuilder.group({
      dot:[Date],
      site:[],
      site_id:[],
      Hoe:[],
      Mason_Handtool:[],
      Pan:[],
      Hammer:[],
      Ball_Hammer:[],
      Shovel:[],
      Handsaw:[],
      Hacksaw_Metal:[],
      Wrench:[],
      Axe:[], 
      Safty_Gloves:[],
      Safty_Helmet:[],
      Safty_Glass:[],
      Drill:[],
      Grinders:[],
      Plier:[],
      Screwdrivers:[],
      Tape_Measures:[],
      Spirit_Level:[],
      Chisel:[]
    })

    }

    ngOnInit(): void {
    }


    onCancel(){
      this.dialogRef.close({event:'Cancel'});
    }
    
    transferEQ(){
    this.transferEQForm.value.site_id= this.transferEQForm.value.site._id;
    console.log(this.transferEQForm);
    this.materialService.addEquipmentRecord(this.transferEQForm.value).subscribe(
      res=>{
        setTimeout(()=> this.showSucessMessage=false ,4000);
      },
      err=>{
        if(err){
          console.log("Equipment record Adding Failed"+err);
        }else{
          this.serverErrorMessages = 'Something Went Wrong';
        }
      }
    );
    window.alert("New Equipment Record Added Successfully");
      //location.reload();
    }
  }
