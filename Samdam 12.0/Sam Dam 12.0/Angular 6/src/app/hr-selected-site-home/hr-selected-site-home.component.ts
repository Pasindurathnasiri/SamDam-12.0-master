import { Component, OnInit ,ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable,MatTableDataSource } from '@angular/material/table';
import { EmployeeService } from '../shared/employee.service';
import { Router,ActivatedRoute } from '@angular/router';

import { Employee } from '../shared/employee.model';
import { MatDialog,MatDialogConfig} from '@angular/material/dialog';
import { AddEmployeeComponent } from '../add-employee/add-employee.component'
import { tick } from '@angular/core/testing';

@Component({
  selector: 'app-hr-selected-site-home',
  templateUrl: './hr-selected-site-home.component.html',
  styleUrls: ['./hr-selected-site-home.component.css']
})
export class HrSelectedSiteHomeComponent implements OnInit {
  searchKey: string; 
  allSiteEmployeeData:any =[];
  dataSource: MatTableDataSource<Employee>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
 displayedColumns: string [] = ['emp_id', 'name','gender','nic','address_1','epf','etf','designation','action'];


  constructor(private employeeApi:EmployeeService,private dialog:MatDialog,private actRoute:ActivatedRoute) {
    var id =this.actRoute.snapshot.paramMap.get('id');
    this.employeeApi.GetAllSiteEmployees(id).subscribe(data=>{
      console.log(data);
      this.allSiteEmployeeData = data;
      this.dataSource = new MatTableDataSource<Employee>(this.allSiteEmployeeData);
      setTimeout(()=> {
        this.dataSource.paginator = this.paginator 
      },0);
    })

   }

   onSearchClear(){
    this.searchKey ='';
    this.applyFilter();
  }

  ngOnInit(): void {
  this.dataSource = new MatTableDataSource<Employee>();
  this.dataSource.sort = this.sort;
  this.dataSource.paginator = this.paginator;
  }


  
onAdd(){
  const adddialogConfig =new MatDialogConfig();
  adddialogConfig.disableClose=false;
  adddialogConfig.autoFocus=true;
  adddialogConfig.width="75%";
  adddialogConfig.height="100%";
  this.dialog.open(AddEmployeeComponent,adddialogConfig)
}
  
  applyFilter(){
    
    return this.dataSource.filter= this.searchKey.trim().toLowerCase();
  }


}
