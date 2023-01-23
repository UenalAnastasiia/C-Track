import { Component, OnInit } from '@angular/core';
import { CoinsAPIService } from '../services/coins-api.service';

@Component({
  selector: 'app-tracking-tab',
  templateUrl: './tracking-tab.component.html',
  styleUrls: ['./tracking-tab.component.scss']
})
export class TrackingTabComponent implements OnInit {
  tableBtnInactive: boolean = true;
  chartBtnInactive: boolean = false;

  
  constructor(public service: CoinsAPIService) { }

  ngOnInit(): void { }
}