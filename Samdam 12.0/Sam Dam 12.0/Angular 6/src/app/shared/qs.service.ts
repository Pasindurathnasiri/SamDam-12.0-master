import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { environment } from '../../environments/environment';
import {QSTask} from '../shared/qstask.model';
import {DailyWork} from '../shared/dailywork.model';
import {BOQRecord} from '../shared/boqrecord.model'
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class QsService {
  headers = new HttpHeaders().set('Content-Type','application/json');
  endpoint: string = 'http://localhost:3000/api';
  endpoint_getAllTask: string = 'http://localhost:3000/api/GetAllTasks';
  endpoint_getAllDW: string = 'http://localhost:3000/api/GetAllDailyworks';
  endpoint_getAllBOQ: string = 'http://localhost:3000/api/GetAllBOQRecs';
 
  noAuthHeader = { headers:new HttpHeaders({'NoAuth':'True'})};

 
  constructor(private http:HttpClient) { }

  //add QS task for site
  addTaskQS(qsTask:QSTask){
    return this.http.post(environment.URI+'/addQSTask',qsTask,this.noAuthHeader);
  }

  addBOQRecord(boqRec:BOQRecord){
    return this.http.post(environment.URI+'/addBOQRec',boqRec,this.noAuthHeader);
  }

  //add daily work record for site
  addDailyRecord(dailywork:DailyWork){
    return this.http.post(environment.URI+'/addDailyWork',dailywork,this.noAuthHeader);
  }

  //get all tasks
  getAllTasks(){
    return this.http.get(`${this.endpoint_getAllTask}`);
  }

  //get all daily works data
  getAllDailyWorks(){
    return this.http.get(`${this.endpoint_getAllDW}`);
  }

  //get all boq records
  getAllBOQRecords(){
    return this.http.get(`${this.endpoint_getAllBOQ}`);
  }

 
  //get tasks by id --> dont using
  getAllTaskBySiteID(id):Observable<any>{
    let API_URL =`${this.endpoint}/read-tasks/${id}`;
    return this.http.get(API_URL,{headers: this.headers})
    .pipe(
      map((res: Response)=>{
        return res || {}
        
      }),
      catchError(this.errorMgmt)
    )
  }
  
  //update task
  updateTask(id,data):Observable<any>{
    let API_URL = `${this.endpoint}/update-qs-task/${id}`;
    return this.http.put(API_URL,data,{headers:this.headers})
    .pipe(
      catchError(this.errorMgmt)
    )
  }

  //update boq record
  updateBOQRecord(id,data):Observable<any>{
    let API_URL = `${this.endpoint}/update-boq-record/${id}`;
    return this.http.put(API_URL,data,{headers:this.headers})
    .pipe(
      catchError(this.errorMgmt)
    )
  }

  //delete task
  deleteTask(id):Observable<any>{
    var API_URL=`${this.endpoint}/delete-qs-task/${id}`;
    return this.http.delete(API_URL)
    .pipe(
      catchError(this.errorMgmt)
    )
  }

  //delete boq record
  deleteBOQRecord(id):Observable<any>{
    var API_URL=`${this.endpoint}/delete-boqrecord/${id}`;
    return this.http.delete(API_URL)
    .pipe(
      catchError(this.errorMgmt)
    )
  }
  
  //delete daily record
  deleteDailyRecord(id):Observable<any>{
    var API_URL=`${this.endpoint}/delete-daily-record/${id}`;
    return this.http.delete(API_URL)
    .pipe(
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
