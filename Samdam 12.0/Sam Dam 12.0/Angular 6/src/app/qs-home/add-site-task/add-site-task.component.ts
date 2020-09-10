  import { Component, OnInit,Inject,Optional,ViewChild} from '@angular/core';
  import { FormControl, FormBuilder, FormGroup ,Validators, NgForm } from '@angular/forms';
  import {MatBottomSheet, MatBottomSheetRef,MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';
  import {QsService} from '../../shared/qs.service';
  export interface SiteData{
    _id:string;
    site_id: string;
    site_name: string;
    place: string;
    start_date: string;
    end_date:string;
    type_of_site:string;
    est_budget:string;
    no_of_sk:number;
    no_of_usk:number;

  }

  @Component({
    selector: 'app-add-site-task',
    templateUrl: './add-site-task.component.html',
    styleUrls: ['./add-site-task.component.css']
  })
  export class AddSiteTaskComponent implements OnInit {
    showSucessMessage: boolean;
    serverErrorMessages: string;
    public addTaskForm:FormGroup;
    constructor(private qsService:QsService,private formBuilder:FormBuilder,private _bottomSheetRef: MatBottomSheetRef<AddSiteTaskComponent>,@Optional() @Inject(MAT_BOTTOM_SHEET_DATA) public data: SiteData) { 
  
      this.addTaskForm = this.formBuilder.group({
        allocation_date:[Date],
        task_id:[],
        name:[],
        type:[],
        site:[data],
        site_id:[data._id],
        length:[],
        width:[],
        height:[],
        month:[],
        weight:[],
        progress:[0]
      })
      console.log(data.site_name)
    }

    ngOnInit(): void {
    }

    onAddTask(){
      this.qsService.addTaskQS(this.addTaskForm.value).subscribe(res=>{
        setTimeout(()=> this.showSucessMessage=false,4000);
      },
      err=>{
        if(err){
          console.log("Site Task Adding Failed"+err);
        }else{
          this.serverErrorMessages = 'Something went wrong';
        }
      }
      );
      window.alert("Site Task Added Successfully..!");
      location.reload();
    }

  }
