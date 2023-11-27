import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import moment from 'moment';

@Component({
  selector: 'app-efemerides-desc',
  templateUrl: './efemerides-desc.page.html',
  styleUrls: ['./efemerides-desc.page.scss'],
})
export class EfemeridesDescPage implements OnInit {

  constructor(public mainService: MainService) { }

  efemeride: any = [];

  ngOnInit() {
    this.efemeride = this.mainService.serive_selected_efemeride;
  }

  efe_func_convertDate(_date: string) {
    // 01 de octubre 2023
    return moment(_date).format('DD [de] MMMM YYYY');
  }

}
