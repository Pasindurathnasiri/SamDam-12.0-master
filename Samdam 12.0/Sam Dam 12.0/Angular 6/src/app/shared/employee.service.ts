import { Injectable } from '@angular/core';

import { Employee } from './employee.model';
import { HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError, map } from 'rxjs/operators';

import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  endpoint: string = 'http://localhost:3000/api/GetAllEmployees';
  endpoint_2: string = 'http://localhost:3000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');



  selectedEmployee:Employee={
    _id:'',
    emp_id: '',
    name_in: '',
    name_full: '',
    nic: '',
    dob: '',
    dor:'',
    gender:'',
    address_1: '',
    address_2: '',
    tp_no: '',
    epf: '',
    etf: '',
    site: '',
    designation:'',
    day_pay:null,
    ot_pay:null,
    remarks:''

  };

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient) { }

  //Add Employee 
  postEmployee( employee:Employee){
    return this.http.post(environment.URI+'/addEmployee',employee,this.noAuthHeader)
  }

//Get All Employees
   GetAllEmployees(){
     return this.http.get(`${this.endpoint}`);
   }

//Delete Employee
DeleteEmployee(emp_id): Observable<any>{
 var API_URL = `${this.endpoint_2}/delete-employee/${emp_id}`;
 return this.http.delete(API_URL)
 .pipe(
   catchError(this.errorMgmt)
 )
}   

//Get employee
GetEmployee(emp_id):Observable<any>{
  let API_URL =`${this.endpoint_2}/read-employee/${emp_id}`;
  return this.http.get(API_URL,{headers: this.headers})
  .pipe(
    map((res: Response)=>{
      return res || {}
      
    }),
    catchError(this.errorMgmt)
  )
}

//Update employee
UpdateEmployee(id,data):Observable<any>{
  let API_URL= `${this.endpoint_2}/update-employee/${id}`;
  return this.http.put(API_URL,data,{headers:this.headers})
  .pipe(
    catchError(this.errorMgmt)
  )
}

//Read All Employee data by site
GetAllSiteEmployees(id){
  console.log(id)
  return this.http.get(`${this.endpoint_2}/read-site-employees/${id}`);

}



//Error Handling
   errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
