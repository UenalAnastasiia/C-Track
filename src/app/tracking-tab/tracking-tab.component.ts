import { HttpClient } from '@angular/common/http';
import { LocalizedString } from '@angular/compiler';
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
  coins: any;

  constructor(public service: CoinsAPIService, private httpClient: HttpClient) { }

  ngOnInit(): void {
    // this.load();
  }

  // if (this.service.coinClicked === true) {
  //   console.log('CLicked: ', this.service.coinClicked);
  //   this.service.getChoosenCoinData('bitcoin')
  //   .subscribe(result => {
  //     this.coins = result;
  //     console.log('Coin:', this.coins);
  //   });
  // } else {
  //   console.log('CLicked: ', this.service.coinClicked);
  //   this.service.getChoosenCoinData(this.coins)
  //   .subscribe(result => {
  //     this.coins = result;
  //     console.log('Coin:', this.coins);
  //   });


   load() {
    this.service.getChoosenCoinData(name)
    .subscribe(result => {
      // this.coins = result;
      console.log('Coin:', result);
    });
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