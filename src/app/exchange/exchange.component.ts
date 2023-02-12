import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CoinsAPIService } from '../services/coins-api.service';


@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.scss']
})
export class ExchangeComponent implements OnInit {
  today = new Date();
  firstCoin: any = '';
  secondCoin: any = '';
  currencyFirstCoin: any = '';
  currencySecondCoin: any = '';
  value: number = 1;
  activeChange: boolean = true;
  currencyActiveChange: boolean = true;
  currencyList = ['eth', 'bnb', 'btc', 'usd', 'gbp'];
  coinIndex: any;
  choosenCoin: any = '';


  constructor(public service: CoinsAPIService, public dialogRef: MatDialogRef<ExchangeComponent>) { }

  ngOnInit(): void { }


  chooseCoin(coin) {
    this.choosenCoin = coin;
  }


  changedFirstValue(value: any) {
    let result = value.target.value * this.service.firstExChangeCoin;
    this.firstCoin = result;
    // result > 100 ? this.firstCoin = result.toFixed(2).toString().replace('.', ',') : this.firstCoin = result.toFixed(10).toString().replace('.', ',');
  }


  changedSecondValue(value: any) {
    let result = value.target.value / this.service.firstExChangeCoin;
    this.secondCoin = result;
    // result > 100 ? this.secondCoin = result.toFixed(2).toString().replace('.', ',') : this.secondCoin = result.toFixed(10).toString().replace('.', ',');
  }


  currencyChangedFirstValue(value: any, coin: any, i) {
    this.coinIndex = i;
    let result = value.target.value * this.service.clickedCoin.market_data.current_price[coin];
    this.currencyFirstCoin = result;
    // result > 100 ? this.currencyFirstCoin = result.toFixed(2).toString().replace('.', ',') : this.currencyFirstCoin = result.toFixed(10).toString().replace('.', ',');
  }


  currencyChangedSecondValue(value: any, coin: any, i) {
    this.coinIndex = i;
    let result = value.target.value / this.service.clickedCoin.market_data.current_price[coin];
    this.currencySecondCoin = result;
    // result > 100 ? this.currencySecondCoin = result.toFixed(2).toString().replace('.', ',') : this.currencySecondCoin = result.toFixed(10).toString().replace('.', ',');
  }

}