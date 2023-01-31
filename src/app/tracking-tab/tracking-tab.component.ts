import { Component, OnInit } from '@angular/core';
import { CoinsAPIService } from '../services/coins-api.service';
import { TabButtonsService } from '../services/tab-buttons.service';

@Component({
  selector: 'app-tracking-tab',
  templateUrl: './tracking-tab.component.html',
  styleUrls: ['./tracking-tab.component.scss']
})
export class TrackingTabComponent implements OnInit {
  dataID: any = '';
  tableID: any = ''
  chartID: any = '';

  constructor(public service: CoinsAPIService, public tabService: TabButtonsService) { }

  ngOnInit(): void {
    this.chartID = '';
    this.dataID = this.service.clickedCoin;
    this.tableID = this.service.tableData;
    this.chartID = this.service.chartData;
  }
}