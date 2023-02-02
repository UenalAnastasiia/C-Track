import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Chart, registerables } from 'chart.js';
import { CoinInfoComponent } from '../coin-info/coin-info.component';
import { CoinsAPIService } from '../services/coins-api.service';
import {FormGroup, FormControl} from '@angular/forms';

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
  period = [];
  showDatePicker: boolean = false;
  currentPeriod = 1;
  periodBtn = [
    {
      data: 1,
      name: '1 D',
      period: 1
    },
    {
      data: 6,
      name: '7 D',
      period: 7
    },
    {
      data: 30,
      name: '30 D',
      period: 31
    },
    {
      data: 93,
      name: '3 M',
      period: 94
    },
    {
      data: 182,
      name: '6 M',
      period: 183
    },
    {
      data: 364,
      name: '1 Y',
      period: 365
    }
  ];

  trackDate = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });


  constructor(public service: CoinsAPIService, public dialog: MatDialog) { }

  ngOnInit(): void {
    Chart.register(...registerables);
  }


  ngOnChanges() {
    this.chartData = [];
    this.coin = this.dataID;
    this.chartData = this.chartID;
    this.loadData();
    this.getPeriod(this.currentPeriod);
  }


  loadData() {
    let number = this.chartData.prices.length;
    this.prices = [];
    for (let index = 0; index < number; index++) {
      this.prices.push(this.chartData.prices[index][1]);
    }

    this.createChart(this.prices);
  }


  createChart(prices: any) {
    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart("MyChart", {
      type: 'line',
      data: {
        labels: this.period,
        datasets:
          [
            {
              label: "Overview of prices in €",
              data: prices,
              fill: true,
              backgroundColor: '#ff63844d'
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


  getPeriod(period: number) {
    this.period = [];

    if (period == 1) {
      this.pushMinutesToPeriod();
    } else {
      this.pushDaysToPeriod(period);
    }
  }


  pushMinutesToPeriod() {
    for (let index = 0; index < 288; index++) {
      let start = new Date();
      let startTime = new Date(start.setDate(start.getDate() - 2));
      let endTime = new Date(new Date().setMinutes(startTime.getMinutes() + index * 5));
      let dateForm = endTime.getHours() + ':' + ((endTime.getMinutes() < 10 ? '0' : '') + endTime.getMinutes());
      this.period.push(dateForm);
    }
  }


  pushDaysToPeriod(period: number) {
    for (let index = 0; index < period; index++) {
      let today = new Date();
      let indexDate = new Date(new Date().setDate(today.getDate() - period + index));
      let dateForm = indexDate.getFullYear() + '/' + (indexDate.getMonth() + 1) + '/' + indexDate.getDate();
      this.period.push(dateForm);
    }
  }


  openInfo() {
    this.dialog.open(CoinInfoComponent);
  }
}