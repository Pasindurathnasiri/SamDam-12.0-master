  import { Component, OnInit,ViewChild  } from '@angular/core';
  import { Vehicle } from '../../shared/vehicle.model';
  import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
  import { MatTableDataSource } from '@angular/material/table';
  import { MatPaginator } from '@angular/material/paginator';
  import {SelectionModel} from '@angular/cdk/collections';
  import { VehicleService } from '../../shared/vehicle.service';
  import { SiteService } from '../../shared/site.service';

  interface Site{
    _id:string;
    site_id:string;
    name: string;
    site: Array<Site>;
    
  }

  @Component({
    selector: 'app-tranfer-vehicle',
    templateUrl: './tranfer-vehicle.component.html',
    styleUrls: ['./tranfer-vehicle.component.css']
  })
  export class TranferVehicleComponent implements OnInit {
    AllVehicleData: any =[];
    AllSiteDate:any=[];
    updateVHForm: FormGroup;
    updateSiteForm: FormGroup;
    siteControl = new FormControl('',Validators.required);
    siteFormControl = new FormControl('', Validators.required);
    sites: Site [] = [];

    public dataSourceVH: MatTableDataSource<Vehicle>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    displayedColumnsVH: string[]=['select','reg_id','vh_type','brand','model','rate','site','driver'];
    
    selection = new SelectionModel<Vehicle>(true, []);

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSourceVH.data.length;
      return numSelected === numRows;
      
    }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSourceVH.data.forEach(row => this.selection.select(row));
        
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Vehicle): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.reg_id + 1}`;
    
  }
  
    constructor(private vehicleService:VehicleService,private siteService:SiteService,private _formBuilder: FormBuilder) { 
  //get all vehicle details
  vehicleService.GetAllVehicles().subscribe(data=>{
    this.AllVehicleData=data;
    console.log(this.AllVehicleData);
    this.dataSourceVH = new MatTableDataSource<Vehicle>(this.AllVehicleData);
    setTimeout(()=>{
      this.dataSourceVH.paginator = this.paginator;
      },0)
    });

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

    }

    ngOnInit(): void {
    }

    updateSite(){
      var n_of_selected = this.selection.selected.length;
      var i;
      for(i=0;i<(n_of_selected);i++){
        this.initializeUpdateForm();
        var update_id = this.selection.selected[i]._id;
        this.vehicleService.getVehicle(update_id).subscribe(data=>{
          this.updateVHForm = this._formBuilder.group({
            _id:[data._id,[Validators.required]],
            reg_id:[data.reg_id,[Validators.required]],
            vh_type:[data.vh_type,[Validators.required]],
            brand:[data.brand,[Validators.required]],
            vh_model:[data.vh_model,[Validators.required]],
            buyer:[data.buyer,[Validators.required]],
            dor:[data.dor,[Validators.required]],
            eng_cap:[data.eng_cap,[Validators.required]],
            valueVH:[data.valueVH,[Validators.required]],
            chassie_no:[data.chassie_no,[Validators.required]],
            eng_no:[data.eng_no,[Validators.required]],
            site:[this.updateSiteForm.value.site,[Validators.required]],
            site_id:[this.updateSiteForm.value.site._id,[Validators.required]],
            fuel_type:[data.fuel_type,[Validators.required]],
            unit_rate:[data.unit_rate,[Validators.required]],
            driver:[data.driver,[Validators.required]],
          })
          this.vehicleService.updateVehicle(update_id,this.updateVHForm.value).subscribe(res=>{
            console.log("Vehicle Trasnferred..!")
          })
        })

      }
     
      window.alert("Vehicle Transferred Successfully..!");
      location.reload();
    }  

    initializeUpdateForm(){
      this.updateVHForm = this._formBuilder.group({
        emp_id:[],
        reg_id:[],
        vh_type:[],
        brand:[],
        vh_model:[],
        buyer:[],
        dor:[Date],
        eng_cap:[],
        valueVH:[],
        chassie_no:[],
        eng_no:[],
        site:[],
        site_id:[],
        fuel_type:[],
        unit_rate:[],
        driver:[]
      })
    }

  }
