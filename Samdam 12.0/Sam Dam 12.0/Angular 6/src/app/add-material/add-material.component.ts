  import { Component, OnInit } from '@angular/core';
  import {FormControl, FormBuilder, FormGroup ,Validators, NgForm} from '@angular/forms';
  import { Router } from '@angular/router';
  import { add } from 'lodash';
  import {MaterialService} from '../shared/material.service';

  interface Unit {
    mat_unit: string;
  
  }

  interface Mat{
    mat : string;
  }


  @Component({
    selector: 'app-add-material',
    templateUrl: './add-material.component.html',
    styleUrls: ['./add-material.component.css']
  })
  export class AddMaterialComponent implements OnInit {
    public addMatGroup:FormGroup;
    showSucessMessage: boolean;
    serverErrorMessages: string;
    unitControl = new FormControl('',Validators.required);
    selectFormControl = new FormControl('',Validators.required);
    units: Unit[]=[
      {mat_unit:'KG'},
      {mat_unit:'Bags'},
      {mat_unit:'Cubes'},
      {mat_unit:'Tons'},
      {mat_unit:'Pieces'},
      {mat_unit:'Blocks'},  
      {mat_unit:'Liter'},
      {mat_unit:'Barrels'}
      
    ];

    matControl = new FormControl('',Validators.required);
    selectMatControl = new FormControl('',Validators.required);
    mats: Mat[]=[
      {mat:'H/Blocks'},
      {mat:'Rainforcement Steel Bars'},
      {mat:'Sand'},
      {mat:'Metal'},
      {mat:'Wood'},
      {mat:'Metal Chips'},
      {mat:'Cement'},
      {mat:'Chemicals'},
      {mat:'ABC'},
      {mat:'Tar'},
      {mat:'Tiles'}
      
        
      
    ];

    constructor(private formBuilder:FormBuilder,private materialService:MaterialService) { 
  this.addMatGroup = this.formBuilder.group({
    mat_id:[],
    type_material:[],
    mat_name:[],
    buyer:[],
    dom:[Date],
    unit_material:[],
    price_unit:[]
  });
    }

    ngOnInit(): void {
    }
    
    onSubmit(){
      console.log(this.addMatGroup);
      this.materialService.postMaterial(this.addMatGroup.value).subscribe(
        res=>{
          setTimeout(() => this.showSucessMessage=false , 4000);
        },
        err =>{
          if(err){
            console.log("Registration Failed"+err);
          }else{
            this.serverErrorMessages = 'Something Went Wrong';
          }
        }
        
      );
    window.confirm("Material Details Added Successfully");
    location.reload();

    }

  }
