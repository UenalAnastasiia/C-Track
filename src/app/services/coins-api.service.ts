import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoinsAPIService {
  private url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1&sparkline=false';
  clickedCoin;
  coins = [];
  coinClicked: boolean;

  constructor(private httpClient: HttpClient) { }

  getAPIdata(): Observable<any> {
    return this.httpClient.get(this.url);
  }

  getChoosenCoinData(name: any) {
    return this.clickedCoin = name;
    // return this.httpClient.get(`https://api.coingecko.com/api/v3/coins/${name}`);
    // this.httpClient.get(`https://api.coingecko.com/api/v3/coins/${name}`).subscribe(
    //   data => {
    //     this.clickedCoin = data;
    //   });

      // this.loadCoinData(name);
  }


  loadCoinData(name: string) {
    // console.log('Coin:', name);
    return this.httpClient.get(`https://api.coingecko.com/api/v3/coins/${name}`);
  }
}
