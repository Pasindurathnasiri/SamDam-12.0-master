import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SiteService } from '../../shared/site.service';
import { MaterialService} from '../../shared/material.service'
import { getMonth } from 'date-fns';



interface Site{
  _id:string;
  site_id:string;
  name: string;
  site: Array<Site>;
}

@Component({
  selector: 'app-transfer-material',
  templateUrl: './transfer-material.component.html',
  styleUrls: ['./transfer-material.component.css']
})
export class TransferMaterialComponent implements OnInit {

  siteControl = new FormControl('',Validators.required);
  siteFormControl = new FormControl('', Validators.required);
  sites: Site [] = [];
  AllMaterialData: any =[];
  AllSiteDate:any=[];
  showSucessMessage: boolean;
  serverErrorMessages: string;

  transferMaterialForm: FormGroup;
  public materials: any[]=[{material:''}];
  public materials_R: any[]=[{material_R:''}];
 

  constructor(private _formBuilder: FormBuilder,public dialogRef: MatDialogRef<TransferMaterialComponent>,private siteService:SiteService,private materialService:MaterialService) {
    this.siteService.GetAllSites().subscribe(data =>{
      this.AllSiteDate = data;
      //in here pass sites to mat-select
       setTimeout(()=>{

       },0)
       this.sites = this.AllSiteDate;
    })
    this.transferMaterialForm = this._formBuilder.group({
      dor:[Date],
      site:[],
      site_id:[],
      month:[],
      T_10:[],
      T_32:[],
      sand:[],
      cement:[],
      ABC:[],
      binding:[],
      metal_1:[],
      metal_1h:[],
      metal_3q:[],
      T_16:[],
      HBlock_4:[],
      HBlock_6:[],
      ABC_R:[],
      HBlock_4_R: [],
      HBlock_6_R: [],
      T_10_R: [],
      T_16_R: [],
      T_32_R: [],
      binding_R: [],
      cement_R: [],
      metal_1_R: [],
      metal_1h_R: [],
      metal_3q_R: [],
      sand_R: [],
    })

    materialService.getAllMaterialTypes().subscribe(datamat=>{
      this.AllMaterialData=datamat;
      console.log(this.AllMaterialData);

      for(var i=0;i<this.AllMaterialData.length;i++){
        
        this.materials[i]=this.AllMaterialData[i].mat_name;  
        this.materials_R[i]=this.AllMaterialData[i].mat_name+"_R";  

      }

       //console.log(this.materials); --> correct
      //create form group
     

     
      setTimeout(() => {
        
      }, 0);

    })

   }

  ngOnInit(): void {
  }

  addMaterialData(){
    //console.log(this.transferMaterialForm);
    //Get month
    var intmonth = getMonth(this.transferMaterialForm.value.dor);
     var strmonth='';
    
    switch (intmonth) {
      case 0:strmonth="January"
        break;
     case 1:strmonth="February"
        break;
        case 2:strmonth="March"
        break;
        case 3:strmonth="April"
        break;
        case 4:strmonth="May"
        break;
        case 5:strmonth="June"
        break;
        case 6:strmonth="July"
        break;
        case 7:strmonth="August"
        break;
        case 8:strmonth="September"
        break;
        case 9:strmonth="October"
        break;
        case 10:strmonth="November"
        break;
        case 11:strmonth="December"
        break;
        
        
      default:
        break;
    }
     // this.transfermaterial.value.month = strmonth;
 
  //add material dates
  this.transferMaterialForm.value.site_id = this.transferMaterialForm.value.site._id;
  console.log(this.transferMaterialForm.value);
  this.materialService.postMaterialDates(this.transferMaterialForm.value).subscribe(
    res=>{
     setTimeout(() => this.showSucessMessage=false , 4000);
    },
    err=>{
     if(err){
       console.log("Material Date Record Failed"+err);
     }else{
       this.serverErrorMessages = 'Something Went Wrong';
     }
    }
  );
  window.confirm("Material Daily Record Added Successfully");
  location.reload();
  }
  

  onCancel(){
    this.dialogRef.close({event:'Cancel'});
   }
  

}
