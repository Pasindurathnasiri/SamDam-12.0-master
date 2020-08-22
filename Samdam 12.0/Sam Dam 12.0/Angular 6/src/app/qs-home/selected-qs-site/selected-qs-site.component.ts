import { Component, OnInit ,ViewChild} from '@angular/core';
import { MatDialog,MatDialogConfig} from '@angular/material/dialog';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {SiteService} from '../../shared/site.service';
import { MatTable,MatTableDataSource } from '@angular/material/table';
import { Router,ActivatedRoute } from '@angular/router';
import {QSTask} from '../../shared/qstask.model';
import { MatPaginator } from '@angular/material/paginator';
import {QsService} from '../../shared/qs.service';
import {UpdateSiteTaskComponent} from '../update-site-task/update-site-task.component';
import {AddSiteTaskComponent} from '../add-site-task/add-site-task.component';
import {DailyWorksComponent} from '../daily-works/daily-works.component';
import { da, fi } from 'date-fns/locale';

@Component({
  selector: 'app-selected-qs-site',
  templateUrl: './selected-qs-site.component.html',
  styleUrls: ['./selected-qs-site.component.css']
})
export class SelectedQsSiteComponent implements OnInit {
  
  AllSiteData:any =[];
  
  AllQSTaskData:any =[];
  FilteredQSData:any =[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public dataSource: MatTableDataSource<QSTask>;
  constructor(private dialog:MatDialog,private qsService:QsService,private actRoute:ActivatedRoute,private _bottomSheet:MatBottomSheet,private _bottomSheetRef:MatBottomSheetRef,private siteService:SiteService) { 
   var site_id = this.actRoute.snapshot.paramMap.get('id');
 
   this.siteService.getSiteDetails(site_id).subscribe(data=>{
     this.AllSiteData=data;
   })


   //get tasks
   this.qsService.getAllTasks().subscribe(data=>{
     this.AllQSTaskData=data;
     this.dataSource = new MatTableDataSource<QSTask>(this.AllQSTaskData);
     this.dataSource.filter = site_id;
     console.log(this.dataSource);
    this.FilteredQSData=this.dataSource.filteredData;
   })

  }



  ngOnInit(): void {
  }

  onAddTask(){
   
    this._bottomSheet.open(AddSiteTaskComponent,{panelClass:'custom-width',data:this.AllSiteData})
   
  }

  editTask(e){
    this._bottomSheet.open(UpdateSiteTaskComponent,{panelClass:'custom-width',data:e})
  
  }
 
  getProgress(e){
    return parseInt(e.progress);
  }
  deleteTask(e){

    if(window.confirm('Are you sure do you want to Remove this Task from this Site.?')){
      const data= this.dataSource.data;
      this.dataSource.data = data;
      this.qsService.deleteTask(e._id).subscribe()
      
    }location.reload();
  }

  openDialyRecord(e){
    this._bottomSheet.open(DailyWorksComponent,{panelClass:'custom-width',data:e})
  }
}
