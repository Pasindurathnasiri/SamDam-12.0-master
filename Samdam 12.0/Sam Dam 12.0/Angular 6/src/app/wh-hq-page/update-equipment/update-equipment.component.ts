  import { Component, OnInit,Inject, Optional} from '@angular/core';
  import {MatBottomSheet, MatBottomSheetRef,MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';
  import { FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
  import { MaterialService} from '../../shared/material.service';
  import { set } from 'lodash';

  export interface EquipmentData{
  _id:string;
  eq_id:string;
  eq_type:Array<any>;
  brand_name:string;
  price_unit:number;
  buyer:string;
  dom:string;
  amount:number;
  }


  interface EQType{
    eq_type: string;
  }


  @Component({
    selector: 'app-update-equipment',
    templateUrl: './update-equipment.component.html',
    styleUrls: ['./update-equipment.component.css']
  })
  export class UpdateEquipmentComponent implements OnInit {
    equipmentForm: FormGroup;
    AllEquipmentData: any =[];
    eq_typeControl = new FormControl('',Validators.required);
  selectFormControl = new FormControl('',Validators.required);
  eq_types: EQType[]=[
    {eq_type:'Hoe'},
    {eq_type:'Mason Handtool'},
    {eq_type:'Pan'},
    {eq_type:'Hammer'},
    {eq_type:'Ball Hammer'},
    {eq_type:'Shovel'},
    {eq_type:'Handsaw'},
    {eq_type:'Hacksaw Metal'},
    {eq_type:'Wrench'},
    {eq_type:'Axe'}, 
    {eq_type:'Safty Gloves'},
    {eq_type:'Safty Helmet'},
    {eq_type:'Safty Glass'},
    {eq_type:'Drill'},
    {eq_type:'Grinders'},
    {eq_type:'Plier'},
    {eq_type:'Screwdrivers'},
    {eq_type:'Tape Measures'},
    {eq_type:'Spirit Level'},
    {eq_type:'Chisel'},

    
  ]


    constructor(private formBuilder: FormBuilder,private _bottomSheetRef: MatBottomSheetRef<UpdateEquipmentComponent>,@Optional() @Inject(MAT_BOTTOM_SHEET_DATA) public data: EquipmentData,private materialService:MaterialService) { 
      
      this.equipmentForm = formBuilder.group({
      _id:[data._id,[Validators.required]],
      eq_id:[data.eq_id,[Validators.required]],
      eq_type:[data.eq_type[0].eq_type,[Validators.required]],
      brand_name:[data.brand_name,[Validators.required]],
      price_unit:[data.price_unit,[Validators.required]],
      buyer:[data.buyer,[Validators.required]],
      dom:[data.dom,[Validators.required]],
      amount:[data.amount,[Validators.required]],
    })  
    console.log(this.equipmentForm.value)

    var selectedEQ = this.equipmentForm.value.eq_type[0];

    } 

    geteq_type(){
      return this.equipmentForm.value.eq_type;
    }
    openLink(event: MouseEvent): void {
      this._bottomSheetRef.dismiss();
      console.log(this._bottomSheetRef);
      event.preventDefault();
    }


    ngOnInit(): void {
    }

    onCancel(){
      this._bottomSheetRef.dismiss();
    }

    onUpdate(){
      var id=this.equipmentForm.value._id;
      if(window.confirm('Are you sure you want to update Equipment Details?')){
        this.materialService.updateEquipment(id,this.equipmentForm.value).subscribe(res=>{
        this.onCancel();
        })
      }
      location.reload();
    }
  }
