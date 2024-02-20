import { Component } from '@angular/core';
import { MainService } from '../main.service';
// import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from 'swiper';
import { Router } from '@angular/router';
import { FCM } from "@capacitor-community/fcm";
import { LoadingController, MenuController, ModalController } from '@ionic/angular';
import moment from 'moment';
import { Platform } from '@ionic/angular';
import { IonModal } from '@ionic/angular';
import { ModalVCardPage } from '../modal-v-card/modal-v-card.page';

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

  vCardURL = '';

  efemeridesSemanales: any = [];
  efemeridesMensuales: any = [];

  constructor(public mainService: MainService,
    public routerCtrl: Router,
    public menuCtrl: MenuController,
    public loadingCtrl: LoadingController,
    public platform: Platform,
    public modalCtrl: ModalController) {}

  async ngOnInit() {
    this.menuCtrl.enable(true);
    this.menuCtrl.swipeGesture(true);
    moment.locale('es-MX');   

    // ESTO ES PORQUE EL SERVICOR SE INUNDÓ -- INI --
    const loading = await this.loadingCtrl.create({
      message: 'Cargando información...',
    });
    
    loading.present();

    await this.mainService.func_get(this.mainService.url_GET_recursos_humanos).then(async succ => {
      this.loadingCtrl.dismiss();
      this.mainService.checkVersion();
      
      await this.mainService.func_checkTelefono().then(_msg => {
        // console.log('ESTE ES EL LOG', _msg)
        switch (_msg) {
          case true:
            // NO PASA NADA, NO SE MUESTRA EL HEADER-WARNING
            this.mainService.service_bool_telefono = true;
            // this.mainService.func_alertNoTelefono();
            break;
          case false:
            // NO TIENE TELÉFONO REGISTRADO, SE ACTIVA EL HEADER-WARNING Y UNA ALERTA PARA INTRODUCIR UNO
            this.mainService.service_bool_telefono = false;
            this.mainService.func_alertNoTelefono();
            break;
          case 'error':
            // NO PASA NADA; ES UN ERROR DE SERVIDOR, PROBABLEMENTE
            this.mainService.service_bool_telefono = false;
            break;
        
          default:
            break;
        }
      });
    });

    await this.mainService.func_get_efemerides();

    let _weekStart = moment().startOf('week');
    let _weekEnd = moment().endOf('week');
    let _monthStart = moment().startOf('month');
    let _monthEnd = moment().endOf('month');
    // let _theNow = moment();
    // console.log(_theNow.isBetween(_weekStart, _weekEnd));

    for (let x = 0; x < this.mainService.service_efemerides.length; x++) {
      let _theNow = moment(this.mainService.service_efemerides[x]['fecha'], 'YYYY-MM-DD');
      if (_theNow.isBetween(_weekStart, _weekEnd) == true) {
        this.efemeridesSemanales.push(this.mainService.service_efemerides[x]);
      }

      if (_theNow.isBetween(_monthStart, _monthEnd) == true) {
        this.efemeridesMensuales.push(this.mainService.service_efemerides[x]);
      }
    }
    // console.log(this.efemeridesSemanales)
    // ESTO ES PORQUE EL SERVICOR SE INUNDÓ -- INI --
    
    let _eventos = await this.mainService.getSemana();

    this.tuSemana = [];

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
    FCM.subscribeTo({ topic: "larocatest" })
    .then((r) => {
      // alert(`subscribed to topic`)
      console.log('ERES PARTE DE LA ROCA :)');
    })
    .catch((err) => console.log(err));
  }

  async func_genVcard_button() {
    await this.mainService.func_genVcard().then(_res => {
      if (_res != 'ninguna') {
        this.vCardURL = _res;
        // SHOW MODAL HERE
        this.func_showQR()
        let modal = document.getElementById('modal-qr');
        if (modal) {
          modal.style.display = "block";
        }
      } else {
        this.mainService.alertThis('Aviso importante', 'No se pudo mostrar tu vCard, por favor intenta mas tarde.')
      }
    });
  }

  async func_showQR() {
    const modal = await this.modalCtrl.create({
      component: ModalVCardPage,
      cssClass: 'controllerModal',
      componentProps: {
        _vcardUrl : this.vCardURL
      }
      
    });
    modal.present().then();

    const { data, role } = await modal.onWillDismiss();
  }

  fucn_goTo(where: string) {
    // console.log(where)
    let _where = 'tabs/' + where;
    this.routerCtrl.navigateByUrl(_where);
  }
}