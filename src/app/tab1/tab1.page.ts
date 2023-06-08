import { Component } from '@angular/core';
import { MainService } from '../main.service';
// import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from 'swiper';
import { Router } from '@angular/router';
import { FCM } from "@capacitor-community/fcm";
import { LoadingController, MenuController } from '@ionic/angular';
import moment from 'moment';
import { Platform } from '@ionic/angular';

// SwiperCore.use([Autoplay, Keyboard, Pagination, Scrollbar, Zoom]);

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  tuSemana = new Array();
  tuSemanaMsg = "Cargando..."

  laFoto = '';
  elNumEmpleado = 1007;
  laDependencia = '';
  elPuesto = '';
  elNombre = '';

  constructor(public mainService: MainService,
    public routerCtrl: Router,
    public menuCtrl: MenuController,
    public loadingCtrl: LoadingController,
    public platform: Platform) {}

  async ngOnInit() {
    // console.log('Platform:', this.platform.is('ios'));
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
      this.mainService.checkVersion();
    });
    
    let _eventos = await this.mainService.getSemana();
    // _eventos.push({
    //   fecha: "2023-04-14",
    //   id: 666,
    //   titulo: "Prueba Uno"
    // })

    // _eventos.push({
    //   fecha: "2023-04-15",
    //   id: 667,
    //   titulo: "Prueba Dos"
    // })

    this.tuSemana = [];

    // console.log("_eventos:", _eventos)

    if (_eventos.length > 0) {
      for (let x = 0; x < _eventos.length; x++) {
        if (moment(_eventos[x]['fecha']).isAfter(moment().format('YYYY-MM-DD')) && moment(moment(_eventos[x]['fecha'])).isSame(moment().format('YYYY-MM-DD'), 'week')) {
          this.tuSemana.push({
            diaConvertido: moment(_eventos[x]['fecha']).format('dddd'),
            titulo: _eventos[x]['titulo'],
            valido: true
          })
        } 
      }
    } else {
      this.tuSemana = [];
    }

    this.tuSemanaMsg = "No hay eventos esta semana :(";
    
    // if (this.tuSemana.length > 0) {
    //   for (let x = 0; x < this.tuSemana.length; x++) {
    //     if (moment(this.tuSemana[x]['fecha']).isAfter(moment().format('YYYY-MM-DD')) && moment(moment(this.tuSemana[x]['fecha'])).isSame(moment().format('YYYY-MM-DD'), 'week')) {
    //       this.tuSemana[x]['diaConvertido'] = moment(this.tuSemana[x]['fecha']).format('dddd')
    //       this.tuSemana[x]['valido'] = true;
    //     } else {
    //       this.tuSemana[x]['diaConvertido'] = moment(this.tuSemana[x]['fecha']).format('dddd')
    //       this.tuSemana[x]['valido'] = false;
    //     }
    //   }
    // } else {
    //   this.tuSemana = [];
    // }

    // console.log(this.tuSemana)
  }

  func_forceTopic() {
    FCM.subscribeTo({ topic: "laroca" })
    .then((r) => {
      // alert(`subscribed to topic`)
      console.log('ERES PARTE DE LA ROCA :)');
    })
    .catch((err) => console.log(err));
  }

  fucn_goTo(where: string) {
    // console.log(where)
    let _where = 'tabs/' + where;
    this.routerCtrl.navigateByUrl(_where);
  }
}
