import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CoinInfoComponent } from '../coin-info/coin-info.component';
import { CoinsAPIService } from '../services/coins-api.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnChanges {
  @Input () dataID: any;
  coin: any = '';

  constructor(public service: CoinsAPIService, public dialog: MatDialog) { }

  ngOnInit(): void {
  }


  ngOnChanges() {
    this.coin = this.dataID;
  }


  openInfo() {
    this.dialog.open(CoinInfoComponent);
  }

}