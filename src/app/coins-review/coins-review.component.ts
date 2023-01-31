import { Component, OnInit } from '@angular/core';
import { CoinsAPIService } from '../services/coins-api.service';
import { TabButtonsService } from '../services/tab-buttons.service';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';

@Component({
  selector: 'app-coins-review',
  templateUrl: './coins-review.component.html',
  styleUrls: ['./coins-review.component.scss']
})
export class CoinsReviewComponent implements OnInit {
  public coins: any;
  searchText = '';
  activeElmIndex: number;

  constructor(public service: CoinsAPIService, public tabService: TabButtonsService) { }


  ngOnInit(): void {
    registerLocaleData( es );
    
    this.service.getAPIdata()
      .subscribe(result => {
        this.coins = result;
      });
  }


  updateClickedBtn() {
    this.service.showClickedCoinInfo = true; 
    this.tabService.marketBtnInactive = true;
    this.tabService.chartBtnInactive = false;
    this.tabService.tableBtnInactive = true;
  }
}