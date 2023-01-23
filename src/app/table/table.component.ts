import { Component, OnInit } from '@angular/core';
import { CoinsAPIService } from '../services/coins-api.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  constructor(public service: CoinsAPIService) { }

  ngOnInit(): void {
  }

}
