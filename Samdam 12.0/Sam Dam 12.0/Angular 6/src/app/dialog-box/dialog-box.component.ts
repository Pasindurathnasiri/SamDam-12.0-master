  import { Component, OnInit,Inject,Optional } from '@angular/core';
  import { MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
  import { MaterialService} from '../shared/material.service'
  import { FormGroup,FormBuilder,FormArray} from '@angular/forms';
  import { getMonth } from 'date-fns';




  export interface UsersData {
    name: string;
    id: number;
  }

  @Component({
    selector: 'app-dialog-box',
    templateUrl: './dialog-box.component.html',
    styleUrls: ['./dialog-box.component.css']
  })
  export class DialogBoxComponent implements OnInit {
    AllMaterialData: any =[];
    addMaterialDataForm: FormGroup;
    items:FormArray;
    action:string;
    showSucessMessage: boolean;
    serverErrorMessages: string;
    local_data:any;
    public materialtypes:any[]=[];
    public materials: any[]=[{material:''}];
    public materials_R: any[]=[{material_R:''}];
  

    constructor(private formBuilder:FormBuilder,public dialogRef: MatDialogRef<DialogBoxComponent>,@Optional() @Inject(MAT_DIALOG_DATA) public data: UsersData,private materialService:MaterialService) {
      
      console.log(data);
      this.local_data = {...data};
      this.action = this.local_data.action;
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

      this.addMaterialDataForm= this.formBuilder.group({
        dor:[Date],
        site:['HQ'],
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

    }


    addMaterialData(){
      //get month
      var intmonth = getMonth(this.addMaterialDataForm.value.dor);
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
      this.addMaterialDataForm.value.month = strmonth;
      console.log(this.addMaterialDataForm.value);
      //add material dates
      this.materialService.postMaterialDates(this.addMaterialDataForm.value).subscribe(
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
    

    ngOnInit(): void {
    }

  }
