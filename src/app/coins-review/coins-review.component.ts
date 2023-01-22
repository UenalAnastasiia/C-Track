import { Component, OnInit } from '@angular/core';
import { CoinsAPIService } from '../services/coins-api.service';

@Component({
  selector: 'app-coins-review',
  templateUrl: './coins-review.component.html',
  styleUrls: ['./coins-review.component.scss']
})
export class CoinsReviewComponent implements OnInit {
  public coins: any;

  constructor(public service: CoinsAPIService) { }


  ngOnInit(): void {
    this.service.getAPIdata()
      .subscribe(result => {
        this.coins = result;
      });
  }
}