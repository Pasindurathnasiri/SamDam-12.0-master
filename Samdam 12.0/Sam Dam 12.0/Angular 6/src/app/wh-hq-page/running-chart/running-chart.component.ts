  import { Component, OnInit ,Inject,Optional,ViewChild} from '@angular/core';
  import { MatPaginator } from '@angular/material/paginator';
  import { MatSort } from '@angular/material/sort';
  import { MatTable,MatTableDataSource } from '@angular/material/table';
  import {FormControl, FormBuilder, FormGroup ,Validators, NgForm} from '@angular/forms';
  import { getMonth } from 'date-fns';
  import { RunningChart} from '../../shared/runningchart.model'
  import { VehicleService } from 'src/app/shared/vehicle.service';
  import {MatBottomSheet, MatBottomSheetRef,MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';
  import { Vehicle } from 'src/app/shared/vehicle.model';


  export interface VehicleData{
    _id:string;
    reg_id:string;
    vh_type:Array<any>;
    brand:string
    vh_model:string;
    buyer:string;
    dor:string
    eng_cap:number;
    valueVH:number;
    chassie_no:string;
    eng_no:string;
    site:Array<any>;
    site_id:string;
    fuel_type:Array<any>; 
    unit_rate:number;
    driver:Array<any>;

  }

  var idFilter;

  @Component({
    selector: 'app-running-chart',
    templateUrl: './running-chart.component.html',
    styleUrls: ['./running-chart.component.css']
  })
  export class RunningChartComponent implements OnInit {

    public readonly runningChartForm:FormGroup;
    dataSourceVHRChart: MatTableDataSource<RunningChart>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    AllRunningChartData: any = [];

    displayedColumnsRC:string [] = ['date','site','description','milage','driver','fuel','controls']
    constructor(private vehicleService:VehicleService,private formBuilder: FormBuilder,private _bottomSheetRef: MatBottomSheetRef<RunningChartComponent>,@Optional() @Inject(MAT_BOTTOM_SHEET_DATA) public data: VehicleData) { 
      var filterID = data.reg_id;
      idFilter=filterID;

      this.runningChartForm= this.formBuilder.group({
        date:[Date],
        reg_id:[data.reg_id],
        site:[data.site],
        site_id:[data.site_id],
        driver:[data.driver],
        month:[],
        km_or_hr:[],
        description:[],
        fuel_input:[]

      })

      //Get all vehicles
      this.vehicleService.GetAllRunningchart().subscribe(data=>{
        console.log(data);
        this.AllRunningChartData=data;
        this.dataSourceVHRChart = new MatTableDataSource<RunningChart>(this.AllRunningChartData);
        this.dataSourceVHRChart.filter = filterID.trim().toString();
        setTimeout(()=>{
          this.dataSourceVHRChart.paginator = this.paginator;
        },0);
      })
    
    }

    ngOnInit(): void {
    }

    GetRegNo(){
      return this.runningChartForm.value.reg_id;
    }

    onRemoveRecord(index:number,e){
      if(window.confirm('Are you sure you want to Delete the Running Chart Record?')){
        const data = this.dataSourceVHRChart.data;
        data.splice((this.paginator.pageIndex * this.paginator.pageSize)+index,1)
        this.dataSourceVHRChart.data=data;
        this.vehicleService.deleteRunningChartRec(e._id).subscribe()
      }
      window.alert("Running Chart Record Deleted Succeccfully");
      
    }

    onAddChart(){

      //convert Date
      this.runningChartForm.value.date = new Date();
      var c_date = this.runningChartForm.value.date.toLocaleDateString();
      
      var intmonth = getMonth(this.runningChartForm.value.date);
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
      this.runningChartForm.value.month = strmonth;
      this.runningChartForm.value.date = c_date;
      this.vehicleService.addRunningChart(this.runningChartForm.value).subscribe(
        res=>{

        },
        err=>{
          if(err){
            console.log("Running Chart Record Adding Failed"+err);
          }else{
            console.log("Something Went Wrong..!");
          }
        }
      );
      window.alert("Running Chart Record Added Successfully..!");
    }

    onCancel(){
      this._bottomSheetRef.dismiss();
    }

    openLink(event: MouseEvent): void {
      this._bottomSheetRef.dismiss();
      console.log(this._bottomSheetRef);
      event.preventDefault();
    }
    
  }

