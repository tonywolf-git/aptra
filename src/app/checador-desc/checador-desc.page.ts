import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import moment from 'moment';

@Component({
  selector: 'app-checador-desc',
  templateUrl: './checador-desc.page.html',
  styleUrls: ['./checador-desc.page.scss'],
})
export class ChecadorDescPage implements OnInit {

  constructor(public mainService: MainService) { }

  checadorData: any = [];

  ngOnInit() {
    this.checadorData = this.mainService.checador_passed_data;
    // console.log(this.checadorData);
  }

  format_date(date:any) {
    return moment(date, 'DD-MM-YYYY').format('DD [de] MMMM')
  }

}
