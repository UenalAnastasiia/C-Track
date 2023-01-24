import { Component, OnInit } from '@angular/core';
import { CoinsAPIService } from '../services/coins-api.service';
import { TabButtonsService } from '../services/tab-buttons.service';

@Component({
  selector: 'app-tracking-tab',
  templateUrl: './tracking-tab.component.html',
  styleUrls: ['./tracking-tab.component.scss']
})
export class TrackingTabComponent implements OnInit {
  // marketBtnInactive: boolean = false;
  // tableBtnInactive: boolean = true;
  // chartBtnInactive: boolean = true;

  
  constructor(public service: CoinsAPIService, public tabService: TabButtonsService) { }

  ngOnInit(): void { }
}