import { Component, OnInit } from '@angular/core';
import { SiteService} from '../shared/site.service';
@Component({
  selector: 'app-accounting-site-home',
  templateUrl: './accounting-site-home.component.html',
  styleUrls: ['./accounting-site-home.component.css']
})
export class AccountingSiteHomeComponent implements OnInit {

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
