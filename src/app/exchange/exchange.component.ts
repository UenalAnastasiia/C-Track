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
  value: number = 1;
  coinHolder: any = '';
  activeChange: boolean = true;

  constructor(public service: CoinsAPIService, public dialogRef: MatDialogRef<ExchangeComponent>) { }

  ngOnInit(): void {
    this.coinHolder = this.service.clickedCoin.market_data.current_price[this.service.clickedCoin.symbol];
  }


  changedFirstValue(value: any){
    this.firstCoin = value.target.value * this.service.firstExChangeCoin;
  }


  changedSecondValue(value: any){
    this.secondCoin = value.target.value / this.service.firstExChangeCoin;
  }


  changeReverse() {
    this.firstCoin = 1 * this.service.firstExChangeCoin;
    this.secondCoin = 1 / this.service.firstExChangeCoin;  
  }
}