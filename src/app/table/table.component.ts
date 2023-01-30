import { Component, OnInit, Input, OnChanges, SimpleChange } from '@angular/core';
import { CoinsAPIService } from '../services/coins-api.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges {
  @Input() dataID;
  dates: any = '';
  prices: any = '';
  volumes: any = '';
  marketcaps: any = '';
  id: any = '';

  dataSource: any[] = [];

  constructor(public service: CoinsAPIService) {
  }


  ngOnInit(): void {
    this.getDate();
    this.pushToDataSource(this.dataID.id);
  }


  ngOnChanges(changes) {
    console.log(changes);
    
    this.id = this.dataID.id;
    this.pushToDataSource(this.id);
  }


  pushToDataSource(id) {
    console.log(id);

    let prices = [];
    let volumes = [];
    let marketcaps = [];

    this.service.getTableData(id).then(data => {
      for (let index = 0; index < 31; index++) {
        this.getPrices(data, prices, index);
        volumes.push(this.changeFormat(data.total_volumes[index][1].toFixed(0)));
        marketcaps.push(this.changeFormat(data.market_caps[index][1].toFixed(0)));
      }

      this.pushData(prices, volumes, marketcaps);
    });
  }


  getPrices(data: any, prices: any, index: number) {
    if (data.prices[index][1] < 10) {
      prices.push(data.prices[index][1].toString().replace('.', ','));
    } else if (data.prices[index][1] > 1000) {
      let p = data.prices[index][1].toFixed(0);
      prices.push(this.changeFormat(p));
    } else {
      prices.push(data.prices[index][1].toFixed(2).toString().replace('.', ','));
    }
  }


  pushData(prices: any, volumes: any, marketcaps: any) {
    this.dataSource.push({ 'prices': prices });
    this.dataSource.push({ 'volumes': volumes });
    this.dataSource.push({ 'marketcaps': marketcaps });

    this.prices = this.dataSource[1].prices;
    this.volumes = this.dataSource[2].volumes;
    this.marketcaps = this.dataSource[3].marketcaps;
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
    this.dates = this.dataSource[0].date;
  }


  changeFormat(data: any) {
    let dataFormat = new Intl.NumberFormat();
    let newDataFormat = dataFormat.format(data);
    return newDataFormat;
  }
}