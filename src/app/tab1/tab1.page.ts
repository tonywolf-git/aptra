import { Component } from '@angular/core';
import { MainService } from '../main.service';
// import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from 'swiper';
import { Router } from '@angular/router';
import { FCM } from "@capacitor-community/fcm";
import { MenuController } from '@ionic/angular';


// SwiperCore.use([Autoplay, Keyboard, Pagination, Scrollbar, Zoom]);

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public mainService: MainService,
    public routerCtrl: Router,
    public menuCtrl: MenuController) {}

  async ngOnInit() {
    await this.mainService.func_get(this.mainService.url_GET_recursos_humanos);
  }

  func_forceTopic() {
    FCM.subscribeTo({ topic: "laroca" })
    .then((r) => alert(`subscribed to topic`))
    .catch((err) => alert(err));
  }

  fucn_goTo(where: string) {
    console.log(where)
    let _where = 'tabs/' + where;
    this.routerCtrl.navigateByUrl(_where);
  }
}
