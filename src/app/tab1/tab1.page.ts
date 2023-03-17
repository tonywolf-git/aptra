import { Component } from '@angular/core';
import { MainService } from '../main.service';
import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from 'swiper';
import { Router } from '@angular/router';

SwiperCore.use([Autoplay, Keyboard, Pagination, Scrollbar, Zoom]);

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public mainService: MainService,
    public routerCtrl: Router) {}

  fucn_goTo(where: string) {
    console.log(where)
    let _where = 'tabs/' + where;
    this.routerCtrl.navigateByUrl(_where);
  }
}
