import { Component, OnInit, Input, OnChanges } from '@angular/core';
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
  minutes = [];

  constructor(public service: CoinsAPIService, public dialog: MatDialog) { }

  ngOnInit(): void {
    Chart.register(...registerables);
  }


  ngOnChanges() {
    this.getMinutes();
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

    // console.log(this.prices);
    this.createChart(this.prices);
  }


  createChart(prices: any) {
    if (this.chart) {
      this.chart.destroy();
    }
    

    this.chart = new Chart("MyChart", {
      type: 'line', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: this.minutes,
        datasets:
          [
            {
              label: "Prices in 24-Hour",
              data: prices
            }
          ],
      },
      options: {
        aspectRatio: 2.5,
        plugins: {
          legend: {
            display: true,
            position: 'top',
            align: 'end',
            labels: {
              color: 'white'
            }
          }
        }
      }
    });
  }


  getMinutes() {
    this.minutes = [];

    for (let index = 0; index < 288; index++) {
      let startTime = new Date();
      let endTime = new Date(new Date().setMinutes(startTime.getMinutes() - index * 5));
      let dateForm = endTime.getHours() + ':' + ((endTime.getMinutes()<10?'0':'') + endTime.getMinutes());
      this.minutes.push(dateForm);
    }
  }

}