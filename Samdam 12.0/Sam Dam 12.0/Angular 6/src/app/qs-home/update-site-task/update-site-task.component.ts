  import { Component, OnInit,Inject,Optional,ViewChild} from '@angular/core';
  import { FormControl, FormBuilder, FormGroup ,Validators, NgForm } from '@angular/forms';
  import {MatBottomSheet, MatBottomSheetRef,MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';
  import {QsService} from '../../shared/qs.service';

  export interface TaskData{
    _id:string;
    allocation_date:string;
    task_id:string;
    name:string;
    type:string;
    site:Array<any>;
    site_id:string;
    length:number;
    width:number;
    height:number;
    month:string;
    weight:number;
  }

  @Component({
    selector: 'app-update-site-task',
    templateUrl: './update-site-task.component.html',
    styleUrls: ['./update-site-task.component.css']
  })
  export class UpdateSiteTaskComponent implements OnInit {

    showSucessMessage: boolean;
    serverErrorMessages: string;
    public updateTaskForm:FormGroup;

  constructor(private qsService:QsService,private formBuilder:FormBuilder,private _bottomSheetRef: MatBottomSheetRef<UpdateSiteTaskComponent>,@Optional() @Inject(MAT_BOTTOM_SHEET_DATA) public data: TaskData) { 
    this.updateTaskForm= formBuilder.group({
    _id:[data._id,[Validators.required]],
    allocation_date:[data.allocation_date,[Validators.required]],
    task_id:[data.task_id,[Validators.required]],
    name:[data.name,[Validators.required]],
    type:[data.type,[Validators.required]],
    site:[data.site,[Validators.required]],
    site_id:[data.site_id,[Validators.required]],
    length:[data.length,[Validators.required]],
    width:[data.width,[Validators.required]],
    height:[data.height,[Validators.required]],
    month:[data.month,[Validators.required]],
    weight:[data.weight,[Validators.required]],
    })
  

    }

    onCancel(){
      this._bottomSheetRef.dismiss();
    }


    ngOnInit(): void {
    }

    onUpdateTask(){
      var id = this.updateTaskForm.value._id;
      if(window.confirm('Are you sure you want to Task Details?')){
        this.qsService.updateTask(id,this.updateTaskForm.value).subscribe(res=>{
          })
      }this.onCancel();
      // location.reload();
    }

  }
