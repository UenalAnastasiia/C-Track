import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoinsAPIService {
  firstCoinUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=1&page=1&sparkline=false';
  firstCoinID: any;
  clickedCoin: any = '';
  showClickedCoinInfo: boolean = false;
  tableData: any = '';
  chartData: any = [];
  currentPeriod = 1;
  choose = [];
  firstExChangeCoin: any = '';
  exChangeUpdateDate: any = '';

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


  getAPIdata(amount: number): Observable<any> {
    return this.httpClient.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=${amount}&page=1&sparkline=false`);
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
        this.firstExChangeCoin = this.chartData.prices[this.chartData.prices.length-1][1]; 
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