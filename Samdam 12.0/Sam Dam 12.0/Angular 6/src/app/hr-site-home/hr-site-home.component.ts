import { Component, OnInit } from '@angular/core';
import { SiteService} from '../shared/site.service';

@Component({
  selector: 'app-hr-site-home',
  templateUrl: './hr-site-home.component.html',
  styleUrls: ['./hr-site-home.component.css']
})
export class HrSiteHomeComponent implements OnInit {

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
