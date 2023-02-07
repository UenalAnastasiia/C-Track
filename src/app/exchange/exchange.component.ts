import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CoinsAPIService } from '../services/coins-api.service';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.scss']
})
export class ExchangeComponent implements OnInit {

  constructor(public service: CoinsAPIService, public dialogRef: MatDialogRef<ExchangeComponent>) { }

  ngOnInit(): void {
    console.log(this.service.clickedCoin);
    
  }

}
