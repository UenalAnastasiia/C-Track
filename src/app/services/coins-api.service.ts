import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoinsAPIService {
  firstCoinUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=1&page=1&sparkline=false';
  firstCoinID: any;
  coinAmount: number = 50;
  clickedCoin: any = '';


  constructor(private httpClient: HttpClient) {
    this.loadFirstCoin();
  }


  loadFirstCoin() {
    this.httpClient.get(this.firstCoinUrl).subscribe(data => {
      let coin = data;
      this.firstCoinID = coin[0].id;
      this.getChoosenCoinData(this.firstCoinID);
    });
  }


  getAPIdata(): Observable<any> {
    return this.httpClient.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=${this.coinAmount}&page=1&sparkline=false`);
  }


  getChoosenCoinData(name: any) {
    this.httpClient.get(`https://api.coingecko.com/api/v3/coins/${name}`).subscribe(data => {
      this.clickedCoin = data;
    });
  }
}