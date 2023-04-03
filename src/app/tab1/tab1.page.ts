import { Component } from '@angular/core';
import { MainService } from '../main.service';
// import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from 'swiper';
import { Router } from '@angular/router';
import { FCM } from "@capacitor-community/fcm";
import { LoadingController, MenuController } from '@ionic/angular';
import * as moment from 'moment';


// SwiperCore.use([Autoplay, Keyboard, Pagination, Scrollbar, Zoom]);

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  tuSemana = new Array();

  constructor(public mainService: MainService,
    public routerCtrl: Router,
    public menuCtrl: MenuController,
    public loadingCtrl: LoadingController) {}

  async ngOnInit() {
    this.menuCtrl.enable(true);
    this.menuCtrl.swipeGesture(true);
    moment.locale('es-MX');   
    // console.log('URL:', this.mainService.url_GET_recursos_humanos);
    
    const loading = await this.loadingCtrl.create({
      message: 'Cargando información...',
    });
    
    loading.present();

    await this.mainService.func_get(this.mainService.url_GET_recursos_humanos).then(async succ => {
      this.loadingCtrl.dismiss();
    });
    
    this.tuSemana = await this.mainService.getSemana();
    
    if (this.tuSemana.length > 0) {
      for (let x = 0; x < this.tuSemana.length; x++) {
        if (moment(this.tuSemana[x]['fecha']).isAfter(moment().format('YYYY-MM-DD')) && moment(moment(this.tuSemana[x]['fecha'])).isSame(moment().format('YYYY-MM-DD'), 'week')) {
          this.tuSemana[x]['diaConvertido'] = moment(this.tuSemana[x]['fecha']).format('dddd')
          this.tuSemana[x]['valido'] = true;
        } else {
          this.tuSemana[x]['diaConvertido'] = moment(this.tuSemana[x]['fecha']).format('dddd')
          this.tuSemana[x]['valido'] = false;
        }
      }
    } else {
      this.tuSemana = [];
    }
    console.log(this.tuSemana)
  }

  func_forceTopic() {
    FCM.subscribeTo({ topic: "laroca" })
    .then((r) => {
      // alert(`subscribed to topic`)
      console.log('ERES PARTE DE LA ROCA :)');
    })
    .catch((err) => alert(err));
  }

  fucn_goTo(where: string) {
    console.log(where)
    let _where = 'tabs/' + where;
    this.routerCtrl.navigateByUrl(_where);
  }
}
