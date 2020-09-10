  import { Component, OnInit } from '@angular/core';
  import { SiteService} from '../shared/site.service';

  @Component({
    selector: 'app-qs-home',
    templateUrl: './qs-home.component.html',
    styleUrls: ['./qs-home.component.css']
  })
  export class QsHomeComponent implements OnInit {

    allSiteData: any = [];
    constructor(private siteService:SiteService) {
      this.siteService.GetAllSites().subscribe(data=>{
        this.allSiteData=data;
        setTimeout(()=>{

        },0)
        
      })

    }

    ngOnInit(): void {
    }

  }
