import { Injectable,EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {

  invokeEmployeeMgmtFunction = new EventEmitter();    
  subsVar: Subscription;    

  constructor() { }

  onApplyFilterClick(pass : string){
    this.invokeEmployeeMgmtFunction.emit(pass);
  }

}
