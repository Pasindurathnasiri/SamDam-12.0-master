import { Injectable } from '@angular/core';
import {Salarypay} from './salarypay.model';
import { HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalarypayService {

  endpoint: string= 'http://localhost:3000/api/GetAllSalary';
  endpoint_2: string = 'http://localhost:3000/api';

  headers = new HttpHeaders().set('Content-Type','application/json');

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient) {  }

    //GetAllSalary Payments God help me
    GetAllSalary(){
     return this.http.get(`${this.endpoint}`) 
    }

    //Get Salary
GetSalary(id):Observable<any>{
  let API_URL =`${this.endpoint_2}/read-salary/${id}`;
  console.log(id);
  return this.http.get(API_URL,{headers: this.headers})
  .pipe(
    map((res: Response)=>{
      return res || {}
      
    }),
    catchError(this.errorMgmt)
  )
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
