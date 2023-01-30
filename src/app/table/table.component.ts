import { Component, OnInit, Input, OnChanges, SimpleChange } from '@angular/core';
import { CoinsAPIService } from '../services/coins-api.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges {
  @Input() tableID: any;
  dates: any = [];
  prices: any = [];
  volumes: any = [];
  marketcaps: any = [];
  tableData: any = [];

  dataSource: any[] = [];

  constructor(public service: CoinsAPIService) {
  }


  ngOnInit(): void {
    this.getDate();
  }


  ngOnChanges() {
    this.tableData = this.tableID;
    this.dataSource = [];
    this.pushToDataSource(this.tableData)
  }


  pushToDataSource(tableData: any) {
    let prices = [];
    let volumes = [];
    let marketcaps = [];

    for (let index = 0; index < 31; index++) {
      this.getPrices(tableData, prices, index);
      volumes.push(this.changeFormat(tableData.total_volumes[index][1].toFixed(0)));
      marketcaps.push(this.changeFormat(tableData['market_caps'][index][1].toFixed(0)));
    }

    this.pushData(prices, volumes, marketcaps);
  }


  getPrices(tableData: any, prices: any, index: number) {
    if (tableData.prices[index][1] < 10) {
      prices.push(tableData.prices[index][1].toString().replace('.', ','));
    } else if (tableData.prices[index][1] > 1000) {
      let p = tableData.prices[index][1].toFixed(0);
      prices.push(this.changeFormat(p));
    } else {
      prices.push(tableData.prices[index][1].toFixed(2).toString().replace('.', ','));
    }
  }


  pushData(prices: any, volumes: any, marketcaps: any) {
    this.dataSource.push({ 'prices': prices });
    this.dataSource.push({ 'volumes': volumes });
    this.dataSource.push({ 'marketcaps': marketcaps });

    this.prices = this.dataSource[0].prices;
    this.volumes = this.dataSource[1].volumes;
    this.marketcaps = this.dataSource[2].marketcaps;
  }


  getDate() {
    let date = [];

    for (let index = 0; index < 31; index++) {
      let today = new Date();
      let indexDate = new Date(new Date().setDate(today.getDate() - 30 + index));
      let dateForm = indexDate.getFullYear() + '/' + (indexDate.getMonth() + 1) + '/' + indexDate.getDate();
      date.push(dateForm);
    }

    this.dataSource.push({ 'date': date });
    this.dates = this.dataSource[3].date;
  }


  changeFormat(data: any) {
    let dataFormat = new Intl.NumberFormat();
    let newDataFormat = dataFormat.format(data);
    return newDataFormat;
  }
}