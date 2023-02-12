import { Component, OnInit, Input, OnChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Chart, registerables } from 'chart.js';
import { CoinInfoComponent } from '../coin-info/coin-info.component';
import { CoinsAPIService } from '../services/coins-api.service';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { NgxCaptureService } from 'ngx-capture';
import { TabButtonsService } from '../services/tab-buttons.service';
import { ExchangeComponent } from '../exchange/exchange.component';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnChanges {
  @Input() dataID: any;
  @Input() chartID: any;
  @ViewChild('screen', { static: true }) screen: any;
  @ViewChild('MyChart') canvas: any;
  public chart: any;
  chartData: any = [];
  prices = [];
  period = [];
  coin: any = '';
  imgBase64 = '';
  chartRange: any = 'prices';
  todayDate = new Date();
  currentPeriod = 1;
  fullscreenMode: boolean = false;
  showDatePicker: boolean = false;
  progressSpinner: boolean = false;
  choosenData: boolean = false;
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';

  trackDate = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  periodBtn = [{ data: 1, name: '1 D', period: 1 }, { data: 6, name: '7 D', period: 7 }, { data: 30, name: '30 D', period: 31 },
  { data: 93, name: '3 M', period: 94 }, { data: 182, name: '6 M', period: 183 }, { data: 364, name: '1 Y', period: 365 }
  ];

  rangeBtn = [{ id: 'prices', name: 'Prices' }, { id: 'market_caps', name: 'Market Caps' }, { id: 'total_volumes', name: 'Total Volumes' }];


  constructor(public service: CoinsAPIService, 
    public dialog: MatDialog, 
    public snackBar: MatSnackBar, 
    private captureService: NgxCaptureService, 
    public tabService: TabButtonsService) { }


  ngOnInit(): void {
    Chart.register(...registerables);
  }


  ngOnChanges() {
    this.chartData = [];
    this.coin = this.dataID;
    this.chartData = this.chartID;
    this.loadData(this.chartRange);
    this.getPeriod(this.currentPeriod);
  }


  chooseBtn(i: number, data: number, period: number) {
    this.service.getChartDataByPeriod(data); 
    this.getPeriod(period); 
    this.tabService.activeBtnIndex = i; 
    this.tabService.activeRangeIndex = 0; 
    this.showDatePicker = false;
  }


  loadData(range: any) {
    if (this.choosenData) {
      this.prices = [];
      this.prices = this.chartData;
    } else {
      let number = this.chartData[range].length;
      this.prices = [];
      for (let index = 0; index < number; index++) {
        this.prices.push(this.chartData[range][index][1]);
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
              label: "View in €",
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

    this.service.exChangeUpdateDate = this.period[this.period.length-1];
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

    this.pushChoosenData(choosenDate, time);
  }


  pushChoosenData(choosenDate: any, time: any) {
    this.period = [];
    for (let index = 0; index < choosenDate.length; index++) {
      let dateForm = time[index].getFullYear() + '/' + (time[index].getMonth() + 1) + '/' + time[index].getDate();
      this.period.push(dateForm);
    }

    this.service.getDataByChoosenDate(choosenDate);
    this.progressSpinner = true;
    setTimeout(() => {
      this.progressSpinner = false;
      this.fullscreenMode = true;
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


  /**
   * SCREENSHOT Functions
   */
  capture() {
    this.captureService
      .getImage(this.screen.nativeElement, true)
      .subscribe((img) => {
        this.imgBase64 = img;
        this.downloadJson();
      });
  }


  downloadJson() {
    let element = document.createElement('a');
    element.setAttribute('href', this.imgBase64);
    element.setAttribute('download', `${this.coin.name}_${this.todayDate}.png`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }


  openInfo() {
    this.dialog.open(CoinInfoComponent);
  }


  openExchange() {
    this.dialog.open(ExchangeComponent);
  }
}