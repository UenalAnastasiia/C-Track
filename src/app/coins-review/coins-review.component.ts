import { Component, OnInit } from '@angular/core';
import { CoinsAPIService } from '../services/coins-api.service';
import { TabButtonsService } from '../services/tab-buttons.service';

@Component({
  selector: 'app-coins-review',
  templateUrl: './coins-review.component.html',
  styleUrls: ['./coins-review.component.scss']
})
export class CoinsReviewComponent implements OnInit {
  public coins: any;
  searchText = '';
  activeElmIndex: number;

  constructor(public service: CoinsAPIService, public tabService: TabButtonsService) { }


  ngOnInit(): void {
    this.service.getAPIdata()
      .subscribe(result => {
        this.coins = result;
      });
  }
}