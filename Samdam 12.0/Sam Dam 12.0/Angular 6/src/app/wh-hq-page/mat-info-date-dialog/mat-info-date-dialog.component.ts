  import { Component, OnInit,Inject, Optional } from '@angular/core';
  import {MatBottomSheet, MatBottomSheetRef,MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';
  import { FormGroup, FormBuilder, Validators} from '@angular/forms';
  import { MaterialService} from '../../shared/material.service'


  export interface MaterialData{
    _id:string;
    ABC: number;
    HBlock_4: number;
    HBlock_6: number;
    T_10: number;
    T_16: number;
    T_32: number;
    binding: number;
    cement: number;
    Date: Date;
    metal_1: number;
    metal_1h: number;
    metal_3q: number;
    sand: number;
    ABC_R: number;
    HBlock_4_R: number;
    HBlock_6_R: number;
    T_10_R: number;
    T_16_R: number;
    T_32_R: number;
    binding_R: number;
    cement_R: number;
    metal_1_R: number;
    metal_1h_R: number;
    metal_3q_R: number;
    sand_R: number;
    ABC_B: number;
    HBlock_4_B: number;
    HBlock_6_B: number;
    T_10_B: number;
    T_16_B: number;
    T_32_B: number;
    binding_B: number;
    cement_B: number;
    metal_1_B: number;
    metal_1h_B: number;
    metal_3q_B: number;
    sand_B: number;
  }

  

  @Component({
    selector: 'app-mat-info-date-dialog',
    templateUrl: './mat-info-date-dialog.component.html',
    styleUrls: ['./mat-info-date-dialog.component.css']
  })
  export class MatInfoDateDialogComponent implements OnInit {
    AllMaterialData: any =[];
    materialForm : FormGroup;
    materialForm_R : FormGroup;
    materialForm_Final : FormGroup;
    public materials: any[]=[{material:''}];
    public materials_R: any[]=[{material_R:''}];
    public materials_B: any[]=[{material_R:''}];
    

    constructor(private formBuilder: FormBuilder,private _bottomSheetRef: MatBottomSheetRef<MatInfoDateDialogComponent>,@Optional() @Inject(MAT_BOTTOM_SHEET_DATA) public data: MaterialData,private materialService:MaterialService) {
      //console.log(data);


      this.materialForm_Final= formBuilder.group({
        _id:[data._id,[Validators.required]],
        ABC:[data.ABC,[Validators.required]],
        HBlock_4: [data.HBlock_4,[Validators.required]],
        HBlock_6: [data.HBlock_6,[Validators.required]],
        T_10: [data.T_10,[Validators.required]],
        T_16: [data.T_16,[Validators.required]],
        T_32: [data.T_32,[Validators.required]],
        binding: [data.binding,[Validators.required]],
        cement: [data.cement,[Validators.required]],
        dor: [data.Date,[Validators.required]],
        metal_1: [data.metal_1,[Validators.required]],
        metal_1h: [data.metal_1h,[Validators.required]],
        metal_3q: [data.metal_3q,[Validators.required]],
        sand: [data.sand,[Validators.required]],
        ABC_R:[data.ABC_R,[Validators.required]],
        HBlock_4_R: [data.HBlock_4_R,[Validators.required]],
        HBlock_6_R: [data.HBlock_6_R,[Validators.required]],
        T_10_R: [data.T_10_R,[Validators.required]],
        T_16_R: [data.T_16_R,[Validators.required]],
        T_32_R: [data.T_32_R,[Validators.required]],
        binding_R: [data.binding_R,[Validators.required]],
        cement_R: [data.cement_R,[Validators.required]],
        metal_1_R: [data.metal_1_R,[Validators.required]],
        metal_1h_R: [data.metal_1h_R,[Validators.required]],
        metal_3q_R: [data.metal_3q_R,[Validators.required]],
        sand_R: [data.sand_R,[Validators.required]],
      })

      

        //Gettng Material types

      materialService.getAllMaterialTypes().subscribe(datamat=>{
        this.AllMaterialData=datamat;
        console.log(this.AllMaterialData);

        for(var i=0;i<this.AllMaterialData.length;i++){
          
          this.materials[i]=this.AllMaterialData[i].mat_name;
          this.materials_R[i]=this.AllMaterialData[i].mat_name+"_R";  
        }
      })
  
    

    
    }
    
    //  getMaterialBalance(){
    //    return 
    //  }
    
    openLink(event: MouseEvent): void {
      this._bottomSheetRef.dismiss();
      console.log(this._bottomSheetRef);
      event.preventDefault();
    }

    updateAdvanceForm(){
      this.materialForm = this.formBuilder.group({
        _id:[],
        ABC:[''],
        HBlock_4: [''],
        HBlock_6: [''],
        T_10: [''],
        T_16: [''],
        T_32: [''],
        binding: [''],
        cement: [''],
        dor: [''],
        metal_1: [''],
        metal_1h: [''],
        metal_3q: [''],
        sand: [''],
        ABC_R:[''],
        HBlock_4_R: [''],
        HBlock_6_R: [''],
        T_10_R: [''],
        T_16_R: [''],
        T_32_R: [''],
        binding_R: [''],
        cement_R: [''],
        metal_1_R: [''],
        metal_1h_R: [''],
        metal_3q_R: [''],
        sand_R: [''],
      })
    }

    onCancel(){
      this._bottomSheetRef.dismiss();
    }

    onDelete(){
      //console.log("delete");
      if(window.confirm("Are you sure do you want to delete this record?")){
        console.log(this.materialForm_Final.value._id);
      this.materialService.DeleteRecord(this.materialForm_Final.value._id).subscribe();
    }
        this._bottomSheetRef.dismiss();
        // location.reload();
    
    
    }

    onUpdateRecord(){
      //console.log("Update");
      console.log(this.materialForm_Final.value)
      
      var id = this.materialForm_Final.value._id;
      if(window.confirm('Are you Sure you want to update this Record.?')){
        this.materialService.updateMaterialRecord(id,this.materialForm_Final.value).subscribe(res=>{
          this.onCancel();
        })
      
      }
      location.reload();
    }

    onUpdateRecordRec(){
      var id = this.materialForm_Final.value._id;
      if(window.confirm('Are you Sure you want to update this Record.?')){
        this.materialService.updateMaterialRecord(id,this.materialForm_Final.value).subscribe(res=>{
          this.onCancel();
        })
      
      }
      location.reload();
    }

    ngOnInit(): void {
    }

  }
