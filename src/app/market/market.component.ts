import { Component, OnInit } from '@angular/core';
import { CoinsAPIService } from '../services/coins-api.service';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss']
})
export class MarketComponent implements OnInit {
  market: any = '';
  global: any = '';

  constructor(public service: CoinsAPIService) { }

  ngOnInit(): void {
    this.loadGlobalData();
  }

  async loadGlobalData() {
    let globalData = await this.service.getGlobalData();
    this.market = globalData.data;
    this.global = globalData.data.market_cap_percentage;
  }

}
