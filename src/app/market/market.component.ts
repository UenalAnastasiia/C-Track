import { Component, OnInit, ViewChild } from '@angular/core';
import { CoinsAPIService } from '../services/coins-api.service';
import { Chart, registerables } from 'node_modules/chart.js'
Chart.register(...registerables);


@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss']
})
export class MarketComponent implements OnInit {
  @ViewChild('piechart') piechart: any;
  market: any = '';
  global: any = '';

  labeldata: any[] = [];
  realdata: any[] = [];


  constructor(public service: CoinsAPIService) { }

  ngOnInit(): void {
    this.loadGlobalData();
  }

  async loadGlobalData() {
    let globalData = await this.service.getGlobalData();
    this.market = globalData.data;
    this.global = globalData.data.market_cap_percentage;
    this.labeldata = Object.keys(this.global);
    this.realdata = Object.values(this.global);

    this.RenderChart(this.labeldata, this.realdata);
  }


  RenderChart(labeldata: any, maindata: any) {
    this.piechart = new Chart('piechart', {
      type: 'pie',
      data: {
        labels: labeldata,
        datasets: [{
          data: maindata,
          backgroundColor: [
            '#9B2335',
            '#55B4B0',
            '#C3447A',
            '#98B4D4',
            '#009B77',
            '#955251',
            '#B565A7',
            '#DD4124',
            '#EFC050',
            '#5B5EA6'
          ],
          borderColor: [
            'white'
          ],
          borderWidth: 1
        }]
      },

      options: {
        plugins: {
          legend: {
            display: true,
            position: 'right',
            labels: {
              padding: 20,
              color: 'white',
              font: {
                size: 18
              }
            }
          }
        }
      }
    });
  }
}