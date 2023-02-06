import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TabButtonsService {
  marketBtnInactive: boolean = false;
  tableBtnInactive: boolean = true;
  chartBtnInactive: boolean = true;
  activeBtnIndex: number = 0;
  activeElmIndex: number;

  constructor() { }
}