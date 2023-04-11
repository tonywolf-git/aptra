import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MainService } from '../main.service';
import QRCode from 'easyqrcodejs';
import { AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ModalQRPage } from '../modal-qr/modal-qr.page';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  @ViewChild('qrcode', {static: false}) qrcode: ElementRef;
  @ViewChild('extraqrcode', {static: false}) extraqrcode: ElementRef;


  constructor(public mainService: MainService,
    public modalCtrl: ModalController) { }

  info: any;
  laFoto = '';
  elNumEmpleado = 1007;
  laDependencia = '';
  elPuesto = '';
  elNombre = '';
  elCURP = '';
  elAlergia = '';
  elTipoSangre = '';
  flipped = false;

  async ngOnInit() {
    console.log('HOHOHO');
    // console.log(this.mainService.credencialInfo);
    this.laFoto = this.mainService.credencialInfo.laFoto;
    this.elNumEmpleado = this.mainService.credencialInfo.elNumEmpleado;
    this.laDependencia = this.mainService.credencialInfo.laDependencia;
    this.elPuesto = this.mainService.credencialInfo.elPuesto;
    this.elNombre = this.mainService.credencialInfo.elNombre;
    this.elCURP = this.mainService.credencialInfo.elCURP;
    this.elAlergia = this.mainService.credencialInfo.elAlergia;
    this.elTipoSangre = this.mainService.credencialInfo.elTipoSangre;

    if (this.elNumEmpleado == 1007) {
      console.log('Corriendo protocolo 1007')
      this.info = await this.mainService.func_get(this.mainService.url_GET_recursos_humanos);
      this.laFoto = this.info.foto;
      this.elNumEmpleado = this.info.res.datDatosGenerales.DatosGenerales[0].NumeroEmpleado;
      this.laDependencia = this.info.res.datDatosGenerales.DatosGenerales[0].Dependencia;
      this.elPuesto = this.info.res.datDatosGenerales.DatosGenerales[0].puesto;
      this.elNombre = this.info.res.datDatosGenerales.DatosGenerales[0].Nombres + ' ' + this.info.res.datDatosGenerales.DatosGenerales[0].ApellidoPaterno + ' ' + this.info.res.datDatosGenerales.DatosGenerales[0].ApellidoMaterno;  
      this.elCURP = this.info.res.datDatosGenerales.DatosGenerales[0].curp;
      this.elAlergia = this.info.res.datDatosGenerales.DatosGenerales[0].alergias;
      this.elTipoSangre = this.info.res.datDatosGenerales.DatosGenerales[0].tipo_sangre;
    }
  };

  ionViewDidEnter() {
    console.log('----- ENTRÉ PINCHES PERROS ALV -----')
    if (document.querySelector('#qrcode')?.childNodes[0]) {
      document.querySelector('#qrcode')?.removeChild(document.querySelector('#qrcode')?.firstChild!)
    }

     // Options
     let _elstring = this.mainService.credencialInfo.elNombre + ' ' + this.mainService.credencialInfo.elNumEmpleado + ' ' + this.mainService.credencialInfo.elPuesto + ' ' + this.mainService.credencialInfo.laDependencia;
     var options = {
      text: _elstring
    }

    // Create new QRCode Object
    new QRCode(this.qrcode.nativeElement, options);
  }

  credencialClick() {
    switch (this.flipped) {
      case false:
        document.getElementById("credencial")!.animate(
          [
            { transform: 'rotateY(180deg)' },
          ], {
            duration: 500,
            iterations: 1,
            fill: "forwards"
          }
        );
        this.flipped = true;
        break;

      case true:
        document.getElementById("credencial")!.animate(
          [
            { transform: 'rotateY(0deg)' },
          ], {
            duration: 500,
            iterations: 1,
            fill: "forwards"
          }
        );
        this.flipped = false;
        break;
    
      default:
        break;
    };
  }

  async func_showQR() {
    console.log('QR CLICKED');
    // let _elstring = this.mainService.credencialInfo.elNombre + ' ' + this.mainService.credencialInfo.elNumEmpleado + ' ' + this.mainService.credencialInfo.elPuesto + ' ' + this.mainService.credencialInfo.laDependencia;
    //  var options = {
    //   text: _elstring
    // }

    // // Create new QRCode Object
    // new QRCode(this.extraqrcode.nativeElement, options);
    const modal = await this.modalCtrl.create({
      component: ModalQRPage,
      cssClass: 'controllerModal'
    });
    modal.present().then();

    const { data, role } = await modal.onWillDismiss();
  }
}


  // component: any;
  // componentProps?: { [key: string]: any };
  // presentingElement?: HTMLElement;
  // showBackdrop?: boolean;
  // backdropDismiss?: boolean;
  // cssClass?: string | string[];
  // animated?: boolean;
  // canDismiss?: boolean | (() => Promise<boolean>);

  // mode?: 'ios' | 'md';
  // keyboardClose?: boolean;
  // id?: string;
  // htmlAttributes?: { [key: string]: any };

  // enterAnimation?: AnimationBuilder;
  // leaveAnimation?: AnimationBuilder;

  // breakpoints?: number[];
  // initialBreakpoint?: number;
  // backdropBreakpoint?: number;
  // handle?: boolean;