import { Component, OnInit, ViewChild, NgZone} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {FormControl,FormBuilder, FormGroup, Validators} from '@angular/forms';
import { EmployeeService } from '../shared/employee.service';
import { Employee } from '../shared/employee.model';
import { SiteService } from '../shared/site.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog,MatDialogConfig} from '@angular/material/dialog';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';

interface Types{
  name:string;
}

@Component({
  selector: 'app-eb-shedule-site',
  templateUrl: './eb-shedule-site.component.html',
  styleUrls: ['./eb-shedule-site.component.css']
})
export class EbSheduleSiteComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  updateForm : FormGroup;
  showSucessMessage: boolean;
  serverErrorMessages: string;
  
  typeControl = new FormControl('',Validators.required);
  selectTypeControl = new FormControl('',Validators.required);
  types: Types[]=[
    {name: 'Road'},
    {name: 'Building'},
    {name: 'Bridge'},
    {name: 'Other'},
    
  ];


  //Table's Attributes
  AllEmployeeData: any = [];
  passdata:any = [];
  site:any = [];
  displayedColumns: string[] = ['select', 'emp_id', 'name','gender','designation','site'];
  dataSource :MatTableDataSource<Employee>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  selection = new SelectionModel<Employee>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
    
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
        
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Employee): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.emp_id + 1}`;
    
  }


  ///Old Part
  isEditable = false;

  
  
  constructor(private _formBuilder: FormBuilder,private siteService:SiteService,private ngZone: NgZone,private employeeApi:EmployeeService,private route: Router,private actRoute:ActivatedRoute) {
    this.employeeApi.GetAllEmployees().subscribe(data =>{
      this.AllEmployeeData =data;    
      this.dataSource = new MatTableDataSource<Employee>(this.AllEmployeeData);
      console.log(data);
      
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
      
    })
    
    
   }

  
  
  GetSelect(){
    //Update form
    
    

      var n_of_selected = this.selection.selected.length;
      var i;
      
      for(i=0;i<n_of_selected;i++){
        var update_id = this.selection.selected[i]._id;
        this.employeeApi.GetEmployee(update_id).subscribe(data =>{
        this.updateForm = this._formBuilder.group({
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
         site:[this.firstFormGroup.value,[Validators.required]],
         designation:[data.designation,[Validators.required]],
         day_pay:[data.day_pay,[Validators.required]],
         ot_pay:[data.ot_pay,[Validators.required]],
         remarks:[data.remarks,[Validators.required]],
        })
        
        console.log(this.updateForm);
        this.employeeApi.UpdateEmployee(update_id,this.updateForm.value).subscribe(res=>{
          
          console.log(this.updateForm.value);
          
        });
                
      });
     
    }
    window.confirm("Employee Allocated Successfully..!");
    
  }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      site_id: [],
      site_name: [],
      place: [],
      start_date: [Date],
      end_date: [Date],
      type_of_site:[],
      est_budget:[],
      no_of_sk:[],
      no_of_usk:[]
      
    });
    this.secondFormGroup = this._formBuilder.group({
      
    });

    this.updateForm = this._formBuilder.group({

    })

    
  this.dataSource = new MatTableDataSource<Employee>();
  this.dataSource.sort = this.sort;
  this.dataSource.paginator = this.paginator;
  }

  

  onSubmit(){
    console.log(this.firstFormGroup)
    this.siteService.postSite(this.firstFormGroup.value).subscribe(
      res=>{
        //Success Message
        window.confirm("Construction Site Added Successfully..!");
        setTimeout(()=> this.showSucessMessage = false,4000)
      },
      err =>{
        if(err){
          console.log("Site Registration Failed"+err);
        }else{
          this.serverErrorMessages = 'Something Went Wrong.';
        }
      }
    );
    
  }

}
