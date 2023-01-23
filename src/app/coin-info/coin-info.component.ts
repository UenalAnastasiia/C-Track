import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CoinsAPIService } from '../services/coins-api.service';

@Component({
  selector: 'app-coin-info',
  templateUrl: './coin-info.component.html',
  styleUrls: ['./coin-info.component.scss']
})
export class CoinInfoComponent implements OnInit {

  constructor(public service: CoinsAPIService, public dialogRef: MatDialogRef<CoinInfoComponent>) { }

  ngOnInit(): void {
  }

}
