import { Injectable } from '@angular/core';
import { Attendance } from '../shared/attendance.model';
import {DateModel} from '../shared/date.model';
import { HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class AttendanceService {

  endpointGetAttendance: string = 'http://localhost:3000/api/GetAllAttendance';
  endpoint: string = 'http://localhost:3000/api'
  headers = new HttpHeaders().set('Content-Type','application/json');
  
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };
  
  constructor(private http: HttpClient) { }

  GetAllAttendance(){
    return  this.http.get(`${this.endpointGetAttendance}`);
  }

  GetAllDates(){
    return this.http.get(`${this.endpoint}/getAllDates`);

  }

  GetAllDatesforMonth(month){
    return this.http.get(`${this.endpoint}/getAllDatesforMonth/${month}`);
  }

  GetAllSalaryforMonth(month){
    return this.http.get(`${this.endpoint}/GetAllSalaryforMonth/${month}`);
  }

  //IncreaseAttendance
  IncreaseAttendance(id,data):Observable<any>{
    let API_URL = `${this.endpoint}/incAttendance/${id}`;
    console.log(data);
    return this.http.put(API_URL,data,{headers:this.headers})
   .pipe(
     catchError(this.errorMgmt)
   )
  }

  //Add attendance in calader database
  AddAttendance(date:DateModel){
    return this.http.post(environment.URI+'/addAttendance',date,this.noAuthHeader)
  }

//add calander attendance to attendance 

  postCalnderAttendance(id,data){
    return this.http.post(environment.URI+'/addCalanderAttendance',data,this.noAuthHeader)
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
