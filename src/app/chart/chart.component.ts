import { Component, OnInit, Input, OnChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Chart, registerables } from 'chart.js';
import { CoinInfoComponent } from '../coin-info/coin-info.component';
import { CoinsAPIService } from '../services/coins-api.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnChanges {
  @Input() dataID: any;
  @Input() chartID: any;
  chartData: any = [];
  coin: any = '';
  public chart: any;
  prices = [];

  constructor(public service: CoinsAPIService, public dialog: MatDialog) { }

  ngOnInit(): void {
    Chart.register(...registerables);
  }


  ngOnChanges() {
    this.chartData = [];
    this.coin = this.dataID;
    this.chartData = this.chartID;
    
    this.load();
  }


  openInfo() {
    this.dialog.open(CoinInfoComponent);
  }


  load() {
    let number = this.chartData.prices.length;
    this.prices = [];
    for (let index = 0; index < number; index++) {
      this.prices.push(this.chartData.prices[index][1]);
    }

    console.log(this.prices);
    this.createChart(this.prices);
  }


  createChart(prices: any) {
    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart("MyChart", {
      type: 'line', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['2022-05-10', '2022-05-11', '2022-05-12', '2022-05-13',
          '2022-05-14', '2022-05-15', '2022-05-16', '2022-05-17',],
        datasets: 
        [
          {
            label: "Prices in 24-Hour",
            data: prices,
            backgroundColor: 'blue'
          },
        ]
      },
      options: {
        aspectRatio: 2.5
      }

    });
  }

}