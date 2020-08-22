import { Component, OnInit } from '@angular/core';
import { SiteService} from '../shared/site.service';

@Component({
  selector: 'app-wh-site-page',
  templateUrl: './wh-site-page.component.html',
  styleUrls: ['./wh-site-page.component.css']
})
export class WhSitePageComponent implements OnInit {

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
