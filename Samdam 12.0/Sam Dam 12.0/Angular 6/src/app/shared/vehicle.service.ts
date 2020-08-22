import { Injectable } from '@angular/core';
import { Vehicle} from '../shared/vehicle.model';
import { HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { RunningChart} from '../shared/runningchart.model'


@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  endpoint: string = 'http://localhost:3000/api';
  endpoint_getAllVehicle: string= 'http://localhost:3000/api/GetAllVehicles';
  endpoint_getAllRCharts: string= 'http://localhost:3000/api/GetAllRunningCharts';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http:HttpClient) { }

  //Add Vehicle
  AddVehicle(vehicle:Vehicle){
    return this.http.post(environment.URI+'/addVehicle',vehicle,this.noAuthHeader);
  }

  //getAll vehicles
  GetAllVehicles(){
    return this.http.get(`${this.endpoint_getAllVehicle}`);
  }

  //get all vehicle running chart
  GetAllRunningchart(){
    return this.http.get(`${this.endpoint_getAllRCharts}`)
  }

  //update vehicle
  updateVehicle(id,data):Observable<any>{

    let API_URL = `${this.endpoint}/update-vehicle/${id}`;
    return this.http.put(API_URL,data,{headers:this.headers})
    .pipe(
        catchError(this.errorMgmt)
    )
  }

  //add vehicle running chart
  addRunningChart(runningChart:RunningChart){
    return this.http.post(environment.URI+'/addRunningChart',runningChart,this.noAuthHeader);
  }

  //delete vehicle
  deleteVehicle(id):Observable<any>{
    var API_URL = `${this.endpoint}/delete-vehicle/${id}`;
    return this.http.delete(API_URL)
    .pipe(
      catchError(this.errorMgmt)
    )
  }

  //Delete Running Chart Record
  deleteRunningChartRec(id):Observable<any>{
    var API_URL = `${this.endpoint}/delete-runningchart-rec/${id}`;
    return this.http.delete(API_URL)
    .pipe(
      catchError(this.errorMgmt)
    )
  }
  //get vehicle
  getVehicle(id):Observable<any>{
    var API_URL =`${this.endpoint}/get-vehicle/${id}`;
    return this.http.get(API_URL,{headers:this.headers})
    .pipe(
      map((res:Response)=>{
        return res || {}
      }),
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

