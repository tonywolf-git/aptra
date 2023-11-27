import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import moment from 'moment';

@Component({
  selector: 'app-efemerides',
  templateUrl: './efemerides.page.html',
  styleUrls: ['./efemerides.page.scss'],
})
export class EfemeridesPage implements OnInit {

  constructor(public mainService: MainService) { }

  efemerides: any = [];
  efemeridesFiltro: any = [];

  ngOnInit() {
    let _monthStart = moment().startOf('month');
    let _monthEnd = moment().endOf('month');

    for (let x = 0; x < this.mainService.service_efemerides.length; x++) {
      let _theNow = moment(this.mainService.service_efemerides[x]['fecha'], 'YYYY-MM-DD');

      if (_theNow.isBetween(_monthStart, _monthEnd) == true) {
        this.efemerides.push(this.mainService.service_efemerides[x]);
      }
    }
    
    this.efemeridesFiltro = this.efemerides.slice(0);
  }

  func_onSearchTerm(ev:any) {
    this.efemeridesFiltro = this.efemerides.slice();
    const val = ev.detail.value;
    if (val.length >= 4) {
    this.efemeridesFiltro = this.efemerides;
      if (val.trim() !== '') {
        this.efemeridesFiltro = this.efemeridesFiltro.filter((term:any) => {
          return term["titulo"].toLowerCase().indexOf(val.trim().toLowerCase()) > -1;
        });
      }
    }
  }
}
