import { Component, OnInit } from '@angular/core';
import {FormControl, FormBuilder, FormGroup ,Validators, NgForm} from '@angular/forms';
import { EmployeeService } from '../shared/employee.service';
import { Router } from '@angular/router';
import { SiteService} from '../shared/site.service';


interface Animal {
  name: string;
 
}

interface Sites{
  name:string;
}

export interface Sitess {
  name: string;
}


export interface Designations {
  name: string;
}



@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
  providers: [EmployeeService]
})
export class AddEmployeeComponent implements OnInit {
  public readonly addGroup: FormGroup;
  showSucessMessage: boolean;
  serverErrorMessages: string;
  SiteArray: Sitess[] = [];
  AllSite: any = [];
  AllEmployeeData: any = [];
  DesignationArray: Designations[] = [];
  animalControl = new FormControl('', Validators.required);
  selectFormControl = new FormControl('', Validators.required);
  animals: Animal[] = [
   /* {name: 'Balangoda HQ'},
    {name: 'Rassagala'},
    {name: 'Rathnapura'},
    {name: 'Badulla'},*/
  ];

  siteControl = new FormControl('',Validators.required);
  selectSiteControl = new FormControl('',Validators.required);
  sites: Sites[]=[
    {name: 'HR Assistance'},
    {name: 'HR Manager'},
    {name: 'Unskilled Labour'},
    {name: 'Skilled Labour'},
    {name: 'Operator'},
    {name: 'Accounting Clerk'},
    {name: 'Accountant'},
    {name: 'Site Manager'},
    {name: 'Technical Officer'},
    {name: 'Site Officer'},
    {name: 'Executive Manager'},
    
  ];

  
 
  
  constructor(private formBuilder: FormBuilder,private employeeService:EmployeeService,private router: Router,private siteService:SiteService) { 
       
   
   /// Get Sites data & pass to mat select 
  this.siteService.GetAllSites().subscribe(data=>{
    this.AllSite=data;
  
    setTimeout(()=>{
      
    },0)
    this.animals=this.AllSite;
    console.log(this.animals);
  })

  this.employeeService.GetAllEmployees().subscribe(data=>{ 
    this.AllEmployeeData=data;
    setTimeout(()=>{
      
    },0)
    
  


  })
  var id=Date.now();
  this.addGroup = this.formBuilder.group({
    emp_id: ['E'+id],
    name_in: [],
    name_full: [],
    nic:[],
    dob:[Date],
    dor:[Date],
    gender:[],
    address_1:[],
    address_2:[],
    tp_no:[],
    epf:[],
    etf:[],
    site: [],
    designation:[],
    day_pay:[],
    ot_pay:[],
    remarks:[]
 });
  
  
  
  }

 
 
  ngOnInit(): void {
  }

onSubmit(){
  console.log(this.addGroup)
  this.employeeService.postEmployee(this.addGroup.value).subscribe(
    res =>{
      this.showSucessMessage = true;
      setTimeout(() => this.showSucessMessage =false,4000);
    },
    err => {
      if(err){
        console.log("Registration Faild"+err);
      }else{
        this.serverErrorMessages = 'Something went Wrong';
      }
    }
  );
  window.confirm("Employee Details Added Successfully");
  location.reload();
}

 
}
