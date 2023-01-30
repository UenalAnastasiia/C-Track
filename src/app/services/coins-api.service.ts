import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoinsAPIService {
  firstCoinUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=1&page=1&sparkline=false';
  firstCoinID: any;
  coinAmount: number = 250;
  clickedCoin: any = '';
  showClickedCoinInfo: boolean = false;
  tableData: any = '';


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


  getGlobalData(): Promise<any> {
    return this.httpClient.get('https://api.coingecko.com/api/v3/global').toPromise();
  }


  getAPIdata(): Observable<any> {
    return this.httpClient.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=${this.coinAmount}&page=1&sparkline=false`);
  }


  getChoosenCoinData(name: any) {
    this.httpClient.get(`https://api.coingecko.com/api/v3/coins/${name}`).subscribe(data => {
      this.clickedCoin = data;
      this.getTableData(name);
      // console.log(this.clickedCoin);
    });
  }


  getTableData(name) : Promise<any> {
    return this.httpClient.get(`https://api.coingecko.com/api/v3/coins/${name}/market_chart?vs_currency=eur&days=30&interval=daily`).toPromise();
    // return this.httpClient.get(`https://api.coingecko.com/api/v3/coins/${this.clickedCoin.id}/market_chart?vs_currency=eur&days=30&interval=daily`).subscribe(data => {
    //   this.tableData = data;
    // });
  }
}