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
  value: number = 1

  constructor(public service: CoinsAPIService, public dialogRef: MatDialogRef<ExchangeComponent>) { }

  ngOnInit(): void {
    // console.log(this.service.firstExChangeCoin);
    // console.log(this.service.exChangeUpdateDate);
  }


  changed(value){
    this.firstCoin = value.target.value * this.service.firstExChangeCoin;
  }

}
