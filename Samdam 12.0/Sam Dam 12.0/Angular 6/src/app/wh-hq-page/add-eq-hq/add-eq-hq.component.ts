import { Component, OnInit } from '@angular/core';
import {FormControl, FormBuilder, FormGroup ,Validators, NgForm} from '@angular/forms';
import {MaterialService} from '../../shared/material.service';
import { SiteService } from '../../shared/site.service';



interface EQType{
  eq_type: string;
}

interface Site{
  _id:string;
  site_id:string;
  name: string;
  site: Array<Site>;
}

@Component({
  selector: 'app-add-eq-hq',
  templateUrl: './add-eq-hq.component.html',
  styleUrls: ['./add-eq-hq.component.css']
})
export class AddEqHqComponent implements OnInit {
  public addEQGroup:FormGroup;
  siteControl = new FormControl('',Validators.required);
  siteFormControl = new FormControl('', Validators.required);
  sites: Site [] = [];
  AllSiteData:any=[];
  showSucessMessage: boolean;
  
  serverErrorMessages: string;
eq_typeControl = new FormControl('',Validators.required);
selectFormControl = new FormControl('',Validators.required);
eq_types: EQType[]=[
  {eq_type:'Hoe'},
  {eq_type:'Mason_Handtool'},
  {eq_type:'Pan'},
  {eq_type:'Hammer'},
  {eq_type:'Ball_Hammer'},
  {eq_type:'Shovel'},
  {eq_type:'Handsaw'},
  {eq_type:'Hacksaw_Metal'},
  {eq_type:'Wrench'},
  {eq_type:'Axe'}, 
  {eq_type:'Safty_Gloves'},
  {eq_type:'Safty_Helmet'},
  {eq_type:'Safty_Glass'},
  {eq_type:'Drill'},
  {eq_type:'Grinders'},
  {eq_type:'Plier'},
  {eq_type:'Screwdrivers'},
  {eq_type:'Tape_Measures'},
  {eq_type:'Spirit_Level'},
  {eq_type:'Chisel'},

  
]

  constructor(private formBuilder:FormBuilder,private siteService:SiteService,private materialService:MaterialService) {
    this.addEQGroup = this.formBuilder.group({
      eq_id:[],
      eq_type:[],
      brand_name:[],
      buyer:[],
      dom:[Date],
      price_unit:[],
      amount:[],
      site:[]
    })

    this.siteService.GetAllSites().subscribe(data =>{
      this.AllSiteData = data;
      //in here pass sites to mat-select
       setTimeout(()=>{

       },0)
       this.sites = this.AllSiteData;
    })
   }

  ngOnInit(): void {
  }

  onSubmit(){
    this.materialService.postEquipment(this.addEQGroup.value).subscribe(
      res=>{
        setTimeout(()=> this.showSucessMessage=false ,4000);
      },
      err=>{
        if(err){
          console.log("Equipment Adding Failed"+err);
        }else{
          this.serverErrorMessages = 'Something Went Wrong';
        }
      }
    );
    window.confirm("New Equipment Added Successfully");
    location.reload();
  }

  onCancel(){
    
  }
}
