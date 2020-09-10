  import { Component, OnInit,ViewChild,NgZone} from '@angular/core';
  import {FormControl, FormBuilder, FormGroup ,Validators, NgForm} from '@angular/forms';
  import { EmployeeService } from '../../shared/employee.service';
  import { Router,ActivatedRoute } from '@angular/router';
  import { SiteService} from '../../shared/site.service';
  import { tick } from '@angular/core/testing';

  import { from } from 'rxjs';

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
    selector: 'app-update-employee',
    templateUrl: './update-employee.component.html',
    styleUrls: ['./update-employee.component.css'],
    providers:[EmployeeService]
  })
  export class UpdateEmployeeComponent implements OnInit {
    updateForm: FormGroup;
    showSucessMessage: boolean;
    serverErrorMessages: string;
    SiteArray: Sitess[] = [];
    AllSite: any = [];
    DesignationArray: Designations[] = [];
    animalControl = new FormControl('', Validators.required);
    selectFormControl = new FormControl('', Validators.required);
    animals: Animal[] = [
      {name: 'Balangoda HQ'},
      {name: 'Rassagala'},
      {name: 'Rathnapura'},
      {name: 'Badulla'},
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

    ngOnInit() {
      this.updateEmployeeForm();
    }

  
    constructor(private formBuilder: FormBuilder,private employeeApi:EmployeeService,private router: Router,private ngZone: NgZone,private actRoute:ActivatedRoute,private siteService:SiteService) { 
      var id = this.actRoute.snapshot.paramMap.get('id');
      this.employeeApi.GetEmployee(id).subscribe(data =>{
        var selectedSite =data.site[0].site_name;
        console.log(id);
        console.log(data.designation[0].name)
        this.updateForm= this.formBuilder.group({
          emp_id:[data.emp_id,[Validators.required]],
          name_in:[data.name_in,[Validators.required]],
          name_full:[data.name_full,[Validators.required]],
          nic:[data.nic,[Validators.required]],
          dob:[data.dob,[Validators.required]],
          gender:[data.gender],
          address_1:[data.address_1,[Validators.required]],
          address_2:[data.address_2,[Validators.required]],
          tp_no:[data.tp_no,[Validators.required]],
          epf:[data.epf,[Validators.required]],
          etf:[data.etf,[Validators.required]],
          site:[data.site,[Validators.required]],
          designation:[data.designation[0].name],
          day_pay:[data.day_pay,[Validators.required]],
          ot_pay:[data.ot_pay,[Validators.required]],
          remarks:[data.remarks,[Validators.required]],
          
        })

      })

      //Load Site Data for Mat-select
      this.siteService.GetAllSites().subscribe(data=>{
        this.AllSite=data;
        setTimeout(()=>{

        },0)
        this.animals=this.AllSite;
      })

    }

    
    

    
    //Reactive Employee Form

    updateEmployeeForm(){

      this.updateForm = this.formBuilder.group({
        emp_id: [],
        name_in: [''],
        name_full: [''],
        nic:[''],
        dob:[''],
        gender:['Male'],
        address_1:[''],
        address_2:[''],
        tp_no:[''],
        epf:[''],
        etf:[''],
        site: [''],
        designation:[''],
        day_pay:[''],
        ot_pay:[''],
        remarks:['']
    })
    }

    //Date
    formatDate(e){
    var convertDate = new Date(e.target.value).toISOString().substring(0,10);
    this.updateForm.get('dob').setValue(convertDate, {
      onlyself:true
    })
    }
  
    
    //Update Book
    updateEmpForm(){
    console.log(this.updateForm.value)
    var id = this.actRoute.snapshot.paramMap.get('id');
    if(window.confirm('Are you sure you want to update??')){
      this.employeeApi.UpdateEmployee(id,this.updateForm.value).subscribe(res=>{
        this.ngZone.run(()=> this.router.navigateByUrl('/employee-mgmt'))
      });
    }
    }

  }
