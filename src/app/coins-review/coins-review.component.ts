import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Coins } from '../coins';
import { CoinsAPIService } from '../services/coins-api.service';

@Component({
  selector: 'app-coins-review',
  templateUrl: './coins-review.component.html',
  styleUrls: ['./coins-review.component.scss']
})
export class CoinsReviewComponent implements OnInit {
  public coins: any;
  urlName = ['bitcoin', 'ethereum', 'usd-coin', 'dogecoin'];
  api = 'https://api.coingecko.com/api/v3/coins/';
  names;

  constructor(public service: CoinsAPIService, private http: HttpClient) { }

  ngOnInit(): void {
    this.service.getAPIdata()
      .subscribe(result => {
        this.coins = result;
      });
    
    // this.load();
  }


  load() {
    for (let index = 0; index < this.urlName.length; index++) {
      this.http.get<Coins[]>(`https://api.coingecko.com/api/v3/coins/${this.urlName[index]}`).subscribe(data => {
        this.coins = data;
      });
      // this.service.getAPIdata(this.urlName[index])
      //   .subscribe(result => {
      //     this.coins = result;
      //     console.log(this.coins);

      //     this.coins = Array.from(Object.values(response));
      //     console.log(this.names);       
      // });
    }
  }

}