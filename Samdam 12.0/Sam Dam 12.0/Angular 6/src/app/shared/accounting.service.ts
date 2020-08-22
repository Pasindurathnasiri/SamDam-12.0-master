import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import {Transaction} from '../shared/accounting.model';
import {CHTransaction} from '../shared/chtransaction.model';

@Injectable({
  providedIn: 'root'
})
export class AccountingService {
  headers = new HttpHeaders().set('Content-Type','application/json');
  endpoint: string = 'http://localhost:3000/api';
  endpoint_allTransactions: string = 'http://localhost:3000/api/GetAllTransactions';
  endpoint_allCHTransactions: string = 'http://localhost:3000/api/GetAllChequeTransactions';
  
  noAuthHeader = { headers:new HttpHeaders({'NoAuth':'True'})};

  constructor(private http:HttpClient) { }

  //add transaction
  addTransaction(transaction:Transaction){
    return this.http.post(environment.URI+'/addTransaction',transaction,this.noAuthHeader);
  }

  //add cheque transaction
  addCHTransaction(chTransaction:CHTransaction){
    return this.http.post(environment.URI+'/addChequeTransaction',chTransaction,this.noAuthHeader);
  }

  //get all cheque transactions
  getAllChequeTransactions(){
    return this.http.get(`${this.endpoint_allCHTransactions}`);
  }
  //get all transactions
  getAllTransactions(){
    return this.http.get(`${this.endpoint_allTransactions}`);
  }

  //delete transactions
  DeleteTransaction(id):Observable<any>{
    var API_URL=`${this.endpoint}/delete-transaction/${id}`;
    return this.http.delete(API_URL)
    .pipe(
      catchError(this.errorMgmt)
    )
  }

  //delete cheque transaction
  DeleteCHTransaction(id):Observable<any>{
    var API_URL=`${this.endpoint}/delete-cheque-transaction/${id}`;
    return this.http.delete(API_URL)
    .pipe(
      catchError(this.errorMgmt)
    )
  }

  //update transactions
  updateTransaction(id,data):Observable<any>{
    let API_URL = `${this.endpoint}/update-transaction/${id}`;
    return this.http.put(API_URL,data,{headers:this.headers})
    .pipe(
      catchError(this.errorMgmt)
    )
  }

  //update cheque transaction
  updateCHTransaction(id,data):Observable<any>{
    let API_URL = `${this.endpoint}/update-cheque-transaction/${id}`;
    return this.http.put(API_URL,data,{headers:this.headers})
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
