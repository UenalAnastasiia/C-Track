import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CoinInfoComponent } from '../coin-info/coin-info.component';
import { CoinsAPIService } from '../services/coins-api.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  constructor(public service: CoinsAPIService, public dialog: MatDialog) { }

  ngOnInit(): void {
  }


  openInfo() {
    this.dialog.open(CoinInfoComponent);
  }

}