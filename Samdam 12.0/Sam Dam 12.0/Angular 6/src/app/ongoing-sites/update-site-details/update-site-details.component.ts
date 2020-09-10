  import { Component, OnInit,Inject,Optional,ViewChild} from '@angular/core';
  import {MatBottomSheet, MatBottomSheetRef,MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';
  import { FormGroup ,FormBuilder, Validators,FormControl} from '@angular/forms';
  import {SiteService} from '../../shared/site.service';

  export interface SiteData{
    _id:String;
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


  interface Types{
    name:string;
  }

  @Component({
    selector: 'app-update-site-details',
    templateUrl: './update-site-details.component.html',
    styleUrls: ['./update-site-details.component.css']
  })
  export class UpdateSiteDetailsComponent implements OnInit {
    public readonly updateSiteForm:FormGroup;
    typeControl = new FormControl('',Validators.required);
    selectTypeControl = new FormControl('',Validators.required);
    types: Types[]=[
      {name: 'Road'},
      {name: 'Building'},
      {name: 'Bridge'},
      {name: 'Other'},
      
    ];


    constructor(private siteService:SiteService,private formBuilder: FormBuilder,private _bottomSheetRef: MatBottomSheetRef<UpdateSiteDetailsComponent>,@Optional() @Inject(MAT_BOTTOM_SHEET_DATA) public data: SiteData) { 
      this.updateSiteForm = formBuilder.group({
        _id:[data._id,[Validators.required]],
        site_id:[data.site_id,[Validators.required]],
        site_name:[data.site_name,[Validators.required]],
        type_of_site:[data.type_of_site,[Validators.required]],
        no_of_usk:[data.no_of_usk,[Validators.required]],
        no_of_sk:[data.no_of_sk,[Validators.required]],
        est_budget:[data.est_budget,[Validators.required]],
        place:[data.place,[Validators.required]],
        start_date:[data.start_date,[Validators.required]],
        end_date:[data.end_date,[Validators.required]],


      })
    }

    ngOnInit(): void {
    }

    onUpdate(){
      var id= this.updateSiteForm.value._id;
      if(window.confirm('Are you sure do you want to update Site Details..?')){
        this.siteService.updateSiteDetails(id,this.updateSiteForm.value).subscribe(res=>{

        })
      }this.onCancel();
    }

    
    onCancel(){
      this._bottomSheetRef.dismiss();
  }
  }
