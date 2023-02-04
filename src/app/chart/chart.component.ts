import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Chart, registerables } from 'chart.js';
import { CoinInfoComponent } from '../coin-info/coin-info.component';
import { CoinsAPIService } from '../services/coins-api.service';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';


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
  currentPeriod = 1;
  fullscreenMode: boolean = false;
  showDatePicker: boolean = false;
  maxDate = new Date();
  trackDate = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  progressBar: boolean = false;
  choosenData: boolean = false;

  verticalPosition: MatSnackBarVerticalPosition = 'top';
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';

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


  constructor(public service: CoinsAPIService, public dialog: MatDialog, public snackBar: MatSnackBar) { }


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
    if (this.choosenData) {
      this.prices = [];
      this.prices = this.chartData;
    } else {
      let number = this.chartData.prices.length;
      this.prices = [];
      for (let index = 0; index < number; index++) {
        this.prices.push(this.chartData.prices[index][1]);
      }
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
      this.choosenData = false;
      this.pushMinutesToPeriod();
    } else if (period == 0) {
      this.choosenData = true;
      this.showDatePicker = false;
      this.pushChoosenDaysToPeriod();
    } else {
      this.choosenData = false;
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


  pushChoosenDaysToPeriod() {
    if (this.trackDate.value.start == null || this.trackDate.value.end == null) {
      this.showDateMessage();
    } else {
      this.getChoosenDays();
    }
  }


  getChoosenDays() {
    let start = new Date(this.trackDate.value.start);
    let end = new Date(this.trackDate.value.end);
    const date = new Date(start.getTime());

    while (date <= end) {
      this.period.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    this.loadChoosenData();
  }


  loadChoosenData() {
    let choosenDate = [];
    let number = this.period.length;
    let time = this.period;

    for (let index = 0; index < number; index++) {
      let form = time[index].getDate() + '-' + (time[index].getMonth() + 1) + '-' + time[index].getFullYear();
      choosenDate.push(form);
    }

    this.period = [];
    for (let index = 0; index < choosenDate.length; index++) {
      let dateForm = time[index].getFullYear() + '/' + (time[index].getMonth() + 1) + '/' + time[index].getDate();
      this.period.push(dateForm);
    }

    this.service.getDataByChoosenDate(choosenDate);

    this.progressBar = true;
    setTimeout(() => {
      this.progressBar = false;
    }, 5000);
  }


  showDateMessage() {
    this.snackBar.open('Please choose a tracking date!', '', {
      panelClass: ['snackbar-box'],
      verticalPosition: this.verticalPosition,
      horizontalPosition: this.horizontalPosition,
      duration: 1500
    });
  }


  openInfo() {
    this.dialog.open(CoinInfoComponent);
  }
}