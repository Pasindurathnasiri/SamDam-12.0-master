  import { Component, OnInit,ViewChild, NgZone } from '@angular/core';
  import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
  import { MatPaginator } from '@angular/material/paginator';
  import { MatSort } from '@angular/material/sort';
  import { EmployeeService } from '../../shared/employee.service';
  import { Employee } from '../../shared/employee.model';
  import { SiteService } from '../../shared/site.service';
  import { Router, ActivatedRoute } from '@angular/router';
  import { MatDialog,MatDialogConfig} from '@angular/material/dialog';
  import {SelectionModel} from '@angular/cdk/collections';
  import {MatTableDataSource} from '@angular/material/table';
  import { ResourceLoader } from '@angular/compiler';

  interface Site{
    _id:string;
    site_id:string;
    name: string;
    site: Array<Site>;
  }

  @Component({
    selector: 'app-transfer-employee',
    templateUrl: './transfer-employee.component.html',
    styleUrls: ['./transfer-employee.component.css']
  })
  export class TransferEmployeeComponent implements OnInit {

    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;
    updateForm : FormGroup;
    updateSiteForm: FormGroup;
    siteControl = new FormControl('',Validators.required);
    siteFormControl = new FormControl('', Validators.required);
    sites: Site [] = [];
    //Table's Attributes
    AllEmployeeData: any = [];
    AllSiteDate:any=[];

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


    constructor(private _formBuilder: FormBuilder,private siteService:SiteService,private ngZone: NgZone,private employeeApi:EmployeeService,private route: Router,private actRoute:ActivatedRoute) { 
      this.employeeApi.GetAllEmployees().subscribe(data =>{
        this.AllEmployeeData =data;    
        this.dataSource = new MatTableDataSource<Employee>(this.AllEmployeeData);
        console.log(data);
        
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
        }, 0);
        
      })

      this.siteService.GetAllSites().subscribe(data =>{
        this.AllSiteDate = data;
        //in here pass sites to mat-select
        setTimeout(()=>{

        },0)
        this.sites = this.AllSiteDate;
      })
      this.updateSiteForm = this._formBuilder.group({
        site:[]
      })
      // console.log(this.updateForm.value)
    }

    GetSelect(){
      //Update form
      console.log(this.updateSiteForm.value);
        
        var n_of_selected = this.selection.selected.length;
        
        var i;
        
        for(i=0;i<(n_of_selected);i++){
          this.initializeUpdateForm();
          var update_id = this.selection.selected[i]._id;
          console.log(update_id);
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
          site:[this.updateSiteForm.value.site,[Validators.required]],
          designation:[data.designation,[Validators.required]],
          day_pay:[data.day_pay,[Validators.required]],
          ot_pay:[data.ot_pay,[Validators.required]],
          remarks:[data.remarks,[Validators.required]],
          })
          
        this.employeeApi.UpdateEmployee(update_id,this.updateForm.value).subscribe(res=>{
            
          console.log(this.updateForm.value)
      });
            
            
        });


      
      
      
      }
      
      
      
                  
    }

    initializeUpdateForm(){
      this.updateForm = this._formBuilder.group({
        emp_id:[],
      name_in:[],
      name_full:[],
      nic:[],
      dob:[],
      gender:[],
      address_1:[],
      address_2:[],
      tp_no:[],
      epf:[],
      etf:[],
      site:[],
      designation:[],
      day_pay:[],
      ot_pay:[],
      remarks:[],
      })
    }

    ngOnInit(): void {
      this.firstFormGroup = this._formBuilder.group({
        site_id: ['', Validators.required],
        site_name: ['', Validators.required],
        place: ['', Validators.required],
        start_date: [Date, Validators.required],
        
      });
      this.secondFormGroup = this._formBuilder.group({
        
      });

      this.updateForm = this._formBuilder.group({

      })

      
    this.dataSource = new MatTableDataSource<Employee>();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator; 
    }


    

  }
