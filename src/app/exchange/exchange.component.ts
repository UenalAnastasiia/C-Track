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
  activeChange: boolean = true;


  constructor(public service: CoinsAPIService, public dialogRef: MatDialogRef<ExchangeComponent>) { }

  ngOnInit(): void {}


  changedFirstValue(value: any){
    let result = value.target.value * this.service.firstExChangeCoin;
    result > 100 ? this.firstCoin = result.toFixed(2).toString().replace('.', ',') : this.firstCoin = result.toFixed(10).toString().replace('.', ',');
  }


  changedSecondValue(value: any){
    let result = value.target.value / this.service.firstExChangeCoin;
    result > 100 ? this.secondCoin = result.toFixed(2).toString().replace('.', ',') : this.secondCoin = result.toFixed(10).toString().replace('.', ',');
  }
}