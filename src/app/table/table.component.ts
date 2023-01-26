import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { CoinsAPIService } from '../services/coins-api.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  prices: any = '';
  volumes: any = '';
  marketcaps: any = '';
  date: any = [];

  displayedColumns: string[] = ['Date', 'Price', 'Volume', 'Market Cap'];
  dataSource : any[] = [];

  constructor(public service: CoinsAPIService) { 
    this.service.getTableData().then(data => {
      this.dataSource = data;
      console.log(this.dataSource);
      
    });
  }

  ngOnInit(): void {
    // this.getData();
  }


  getData() {
    this.prices = this.service.tableData.prices[0][1].toString().replace('.', ',');
    this.volumes = this.changeFormat(this.service.tableData.total_volumes[0][1]);
    this.marketcaps = this.changeFormat(this.service.tableData.market_caps[0][1]);

    for (let index = 0; index < 31; index++) {
      let today = new Date();
      let indexDate = new Date(new Date().setDate(today.getDate() - index));
      let dateForm = indexDate.getFullYear() + '/' + (indexDate.getMonth() + 1) + '/' + indexDate.getDate();
      this.date.push(dateForm);
    }
  }


  changeFormat(data: any) {
    let dataFormat = new Intl.NumberFormat();
    let newDataFormat = dataFormat.format(data);
    return newDataFormat;
  }

}
