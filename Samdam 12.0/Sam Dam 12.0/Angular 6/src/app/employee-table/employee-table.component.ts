import { AfterViewInit, Component, OnInit, ViewChild,Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EmployeeService } from '../shared/employee.service';
import { MatTable,MatTableDataSource } from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { EmployeeTableDataSource, EmployeeTableItem } from './employee-table-datasource';
import { from } from 'rxjs';
import { Employee } from '../shared/employee.model';
import { EventEmitterService } from '../event-emitter.service';
import { EmployeeMgmtComponent } from '../employee-mgmt/employee-mgmt.component';

@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.css']
})
export class EmployeeTableComponent implements AfterViewInit, OnInit {
  AllEmployeeData: any = [];
  dataSource: MatTableDataSource<Employee>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  selection = new SelectionModel<Employee>(true, []);
  searchKey: string;  
 

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns: string [] = ['select','emp_id', 'name','gender','nic','address_1','epf','etf','designation','site'];
 
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
  constructor(private employeeApi:EmployeeService,private eventEmitterService:EventEmitterService){
    this.employeeApi.GetAllEmployees().subscribe(data =>{
      this.AllEmployeeData =data;
      this.dataSource = new MatTableDataSource<Employee>(this.AllEmployeeData);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
      
    })
  }
 
  ngOnInit() {
    if(this.eventEmitterService.subsVar == undefined){
      this.eventEmitterService.subsVar= this.eventEmitterService.invokeEmployeeMgmtFunction.subscribe((pass:string)=>{
        this.applyFilter(pass);
      });
    }
    
  }



  //first func
  applyFilter(pass:string){

  return this.dataSource.filter= pass.trim() == undefined ? '' :pass.trim().toLowerCase() ;
   
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
   
  }
}
