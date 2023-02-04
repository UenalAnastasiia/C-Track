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
  chartData: any = [];
  currentPeriod = 1;
  choose = [];

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


  // getGlobal(name: any) {
  //   // console.log('Name of coins: ', name);
  //   let tableCoins = [];
  //   for (let index = 0; index < name.length; index++) {
  //     this.httpClient.get(`https://api.coingecko.com/api/v3/coins/${name[index]}`).subscribe(data => {
  //       tableCoins.push(data);
  //     });
  //   }
  //   console.log('Data: ', );

  // }


  getAPIdata(): Observable<any> {
    return this.httpClient.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=${this.coinAmount}&page=1&sparkline=false`);
  }


  getChoosenCoinData(name: any) {
    this.httpClient.get(`https://api.coingecko.com/api/v3/coins/${name}`).subscribe(data => {
      this.clickedCoin = data;
      this.getTableData();
      this.getChartDataByPeriod(this.currentPeriod);
    });
  }


  getTableData() {
    return this.httpClient.get(`https://api.coingecko.com/api/v3/coins/${this.clickedCoin.id}/market_chart?vs_currency=eur&days=30&interval=daily`).subscribe(data => {
      this.tableData = data;
    });
  }


  getChartDataByPeriod(period: number) {
    if (period == 1) {
      return this.httpClient.get(`https://api.coingecko.com/api/v3/coins/${this.clickedCoin.id}/market_chart?vs_currency=eur&days=1&interval=minute`).subscribe(data => {
        this.chartData = data;
      });
    }
    else if (period == 0) {
      this.chartData = this.choose;
    }
    else {
      return this.httpClient.get(`https://api.coingecko.com/api/v3/coins/${this.clickedCoin.id}/market_chart?vs_currency=eur&days=${period}&interval=daily`).subscribe(data => {
        this.chartData = data;
      });
    }
  }


  getDataByChoosenDate(date: any) {
    for (let index = 0; index < date.length; index++) {
      this.httpClient.get(`https://api.coingecko.com/api/v3/coins/${this.clickedCoin.id}/history?date=${date[index]}`).subscribe(data => {
        this.choose.push(data['market_data'].current_price.eur);
      });
    }
    this.chartData = this.choose;
  }
}