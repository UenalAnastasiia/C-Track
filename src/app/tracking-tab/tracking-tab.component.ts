import { Component, OnInit } from '@angular/core';
import { CoinsAPIService } from '../services/coins-api.service';

@Component({
  selector: 'app-tracking-tab',
  templateUrl: './tracking-tab.component.html',
  styleUrls: ['./tracking-tab.component.scss']
})
export class TrackingTabComponent implements OnInit {
  tableBtnInactive: boolean = false;
  chartBtnInactive: boolean = true;

  
  constructor(public service: CoinsAPIService) { }

  ngOnInit(): void {
  }


  activeBtn(btn: string) {
    if (btn === 'table') {
      this.tableBtnInactive = false;
      this.chartBtnInactive = true;
    }

    if (btn === 'chart') {
      this.tableBtnInactive = true;
      this.chartBtnInactive = false;
    }
  }

}