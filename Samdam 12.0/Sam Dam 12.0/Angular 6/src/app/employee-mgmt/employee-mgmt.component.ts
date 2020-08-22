import { AfterViewInit, Component, OnInit, ViewChild,Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable,MatTableDataSource } from '@angular/material/table';
import { EmployeeService } from '../shared/employee.service';
import {SelectionModel} from '@angular/cdk/collections';
import { Employee } from '../shared/employee.model';
import { MatDialog,MatDialogConfig} from '@angular/material/dialog';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { TransferEmployeeComponent } from '../employee-mgmt/transfer-employee/transfer-employee.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';




@Component({
  selector: 'app-employee-mgmt',
  templateUrl: './employee-mgmt.component.html',
  styleUrls: ['./employee-mgmt.component.css']
})
export class EmployeeMgmtComponent implements OnInit {

  AllEmployeeData: any = [];
  public dataSource: MatTableDataSource<Employee>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  selection = new SelectionModel<Employee>(true, []);
  searchKey: string;  
  filterSelectObj = [];
  filterValues = {};
 /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns: string [] = ['emp_id', 'name','gender','nic','address_1','epf','etf','designation','site','action'];
 

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


constructor(private employeeApi:EmployeeService,private dialog:MatDialog){
  this.employeeApi.GetAllEmployees().subscribe(data =>{
    this.AllEmployeeData =data;    
    this.dataSource = new MatTableDataSource<Employee>(this.AllEmployeeData);
    
      setTimeout(() => {
      this.dataSource.paginator = this.paginator;
    }, 0);
    
  })
  //filter object
  this.filterSelectObj = [
  {
      name: 'Current Site',
      columnProp: 'site',
      options: []
    }
  ]
}

ngOnInit() {
  
  this.getRemoteData()
  this.dataSource = new MatTableDataSource<Employee>();
  
  this.dataSource.sort = this.sort;
  this.dataSource.paginator = this.paginator;
  //filter function
  this.dataSource.filterPredicate = this.createFilter();
}

getFilterObject(fullObj, key) {
  const uniqChk = [];
  fullObj.filter((obj) => {
    if (!uniqChk.includes(obj[key])) {
      uniqChk.push(obj[key]);
    }
    return obj;
  });
  return uniqChk;
}

getRemoteData(){
  this.employeeApi.GetAllEmployees().subscribe(data =>{
    this.AllEmployeeData =data;    
    this.dataSource = new MatTableDataSource<Employee>(this.AllEmployeeData);
     
    console.log(this.AllEmployeeData)
    this.filterSelectObj.filter((o) => {
    o.options = this.getFilterObject(this.AllEmployeeData, o.columnProp);
    });
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
    }, 0);
  })

  
}
 // Called on Filter change
 filterChange(filter, event) {
  //let filterValues = {}
  this.filterValues[filter.columnProp] = event.target.value.trim().toLowerCase()
  this.dataSource.filter = JSON.stringify(this.filterValues)
}

  // Custom filter method fot Angular Material Datatable
  createFilter() {
    let filterFunction = function (data: any, filter: string): boolean {
      let searchTerms = JSON.parse(filter);
      let isFilterSet = false;
      for (const col in searchTerms) {
        if (searchTerms[col].toString() !== '') {
          isFilterSet = true;
        } else {
          delete searchTerms[col];
        }
      }

      console.log(searchTerms);

      let nameSearch = () => {
        let found = false;
        if (isFilterSet) {
          for (const col in searchTerms) {
            searchTerms[col].trim().toLowerCase().split(' ').forEach(word => {
              if (data[col].toString().toLowerCase().indexOf(word) != -1 && isFilterSet) {
                found = true
              }
            });
          }
          return found
        } else {
          return true;
        }
      }
      return nameSearch()
    }
    return filterFunction
  }

  // Reset table filters
  resetFilters() {
    this.filterValues = {}
    this.filterSelectObj.forEach((value, key) => {
      value.modelValue = undefined;
    })
    this.dataSource.filter = "";
  }


onAdd(){
  const adddialogConfig =new MatDialogConfig();
  adddialogConfig.disableClose=false;
  adddialogConfig.autoFocus=true;
  adddialogConfig.width="75%";
  adddialogConfig.height="100%";
  this.dialog.open(AddEmployeeComponent,adddialogConfig)
}

onTransfer(){
  const adddialogConfig =new MatDialogConfig();
  adddialogConfig.disableClose=false;
  adddialogConfig.autoFocus=true;
  adddialogConfig.width="75%";
  adddialogConfig.height="100%";
  this.dialog.open(TransferEmployeeComponent,adddialogConfig)
}
  
  onSearchClear(){
    this.searchKey ='';
    this.applyFilter();
  }

  ngAfterViewInit() {
  
  }
  
  deleteEmployee(index: number,e){
    
    if(window.confirm('Are you sure do you want to Remove this employee from Company?')){
      const data= this.dataSource.data;
      data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index,1)
      this.dataSource.data = data;
      this.employeeApi.DeleteEmployee(e.emp_id).subscribe()
      
    }
     
  }

  applyFilter(){
    
    return this.dataSource.filter= this.searchKey.trim().toLowerCase();
  }

  printTable(){
   var element = document.getElementById('print_table')

   html2canvas(element).then((canvas)=>{
     console.log(canvas);

     var imgData = canvas.toDataURL('image/png')
     var doc = new jspdf()
     var imgHeight = canvas.height *260 /canvas.width;
     doc.addImage(imgData,0,0,260,imgHeight)
     doc.save("employee.pdf")
   })
  }
 

}
