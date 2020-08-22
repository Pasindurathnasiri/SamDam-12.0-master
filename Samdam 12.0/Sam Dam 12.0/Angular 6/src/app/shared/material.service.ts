import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError, map } from 'rxjs/operators';

import { Material} from '../shared/material.model';
import {Eqipment} from '../shared/equipment.model';
import {MaterialDates} from '../shared/material-dates.model';
import {EqipmentRecord} from '../shared/equipmentrecord.model';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  headers = new HttpHeaders().set('Content-Type','application/json');
  endpoint: string = 'http://localhost:3000/api/GetAllMaterialTypes';
  endpoint_1: string= 'http://localhost:3000/api/GetAllMaterialDates';
  endpoint_2: string = 'http://localhost:3000/api';
  endpoint_3: string= 'http://localhost:3000/api/GetAllMaterialDatesmonth';
  endpoint_eq: string='http://localhost:3000/api/GetAllEquipments'; 
  endpoint_eqrec: string='http://localhost:3000/api/GetAllEQRecords'; 
  
 
  noAuthHeader = { headers:new HttpHeaders({'NoAuth':'True'})};

  constructor(private http:HttpClient) { }

  //Add Material
  postMaterial(material:Material){
    //console.log(material);
   return this.http.post(environment.URI+'/addMaterial',material,this.noAuthHeader);
  }

  //post equipments
  postEquipment(equipment:Eqipment){
   return this.http.post(environment.URI+'/addEquipment',equipment,this.noAuthHeader);
  }
  //add material dates
  postMaterialDates(mat_date:MaterialDates){
   // console.log(mat_date);
   return this.http.post(environment.URI+'/addMaterialDates',mat_date,this.noAuthHeader);
  }

  //add equipment record
  addEquipmentRecord(eq_rec:EqipmentRecord){
    return this.http.post(environment.URI+'/addEQRecord',eq_rec,this.noAuthHeader);
  }
  
// get all mat dates
   getAllMaterialDates(){
     return this.http.get(`${this.endpoint_1}`);
   }

//get all Equipments
   getAllEquipment(){
     return this.http.get(`${this.endpoint_eq}`);
   }

  //GetAll Material types
  getAllMaterialTypes(){
    return this.http.get(`${this.endpoint}`);
  }

  //get all equipment record
  getAllEQRecords(){
    return this.http.get(`${this.endpoint_eqrec}`);
  }

  //update Meterial daily record
  updateMaterialRecord(id,data):Observable<any>{
  //  console.log(data);
    let API_URL = `${this.endpoint_2}/update-meterial-record/${id}`;
    return this.http.put(API_URL,data,{headers:this.headers})
    .pipe(
      catchError(this.errorMgmt)
    )
  }

  //update equipment 
  updateEquipment(id,data):Observable<any>{
    let API_URL = `${this.endpoint_2}/update-equipment/${id}`;
    return this.http.put(API_URL,data,{headers:this.headers})
    .pipe(
      catchError(this.errorMgmt)
    )
  }

  //update equipment record
  updateEQRecord(id,data):Observable<any>{
    let API_URL = `${this.endpoint_2}/update-eq-record/${id}`;
    return this.http.put(API_URL,data,{headers:this.headers})
    .pipe(
      catchError(this.errorMgmt)
    )
  }  

  //Get Allmaterial dates by month
  getAllMaterialDatesmonth(month){
    return this.http.get(`${this.endpoint_3}/${month}`)
  }

  //Delete Equipment
  DeleteEquipment(id):Observable<any>{
    var API_URL=`${this.endpoint_2}/delete-equipment/${id}`;
    return this.http.delete(API_URL)
    .pipe(
      catchError(this.errorMgmt)
    )
  }

  //Delete Material Daily record
  DeleteRecord(id):Observable<any>{
    var API_URL = `${this.endpoint_2}/delete-material-record/${id}`;
    return this.http.delete(API_URL)
    .pipe(
      catchError(this.errorMgmt)
    )
  }
  //Delete Material Type
  DeleteMaterial(mat_id):Observable<any>{
    var API_URL = `${this.endpoint_2}/delete-material-type/${mat_id}`;
    return this.http.delete(API_URL)
    .pipe(
      catchError(this.errorMgmt)
    )
  }

//delete equipment rec
  DeleteEQRec(id):Observable<any>{
    var API_URL = `${this.endpoint_2}/delete-eq-record/${id}`;
    return this.http.delete(API_URL)
    .pipe(
      catchError(this.errorMgmt)
    )
  }

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
