import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { MainService } from '../main.service';
import QRCode from 'easyqrcodejs';
import { AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ModalQRPage } from '../modal-qr/modal-qr.page';
import { PrivacyScreen } from '@capacitor-community/privacy-screen';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  @ViewChild('qrcode', {static: false}) qrcode: ElementRef;
  @ViewChild('extraqrcode', {static: false}) extraqrcode: ElementRef;


  constructor(public mainService: MainService,
    public modalCtrl: ModalController,
    public platformCtrl: Platform,
    public tosteCtrl: ToastController) { }

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
  water_this_mark = false;
  credencial_interactiva_toggle = true;

  async ngOnInit() {
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
    // ACTIVA LA PROTECCION COSA SCREENSHOT CHINGADERA -- INI --
    if (this.platformCtrl.is('android') || this.platformCtrl.is('ios')) {
      const enable = async () => {
        await PrivacyScreen.enable();
      };
      enable();
    }
    // ACTIVA LA PROTECCION COSA SCREENSHOT CHINGADERA -- END --

    if (document.querySelector('#qrcode')?.childNodes[0]) {
      document.querySelector('#qrcode')?.removeChild(document.querySelector('#qrcode')?.firstChild!)
    }

     // Options / x
    //  let _elstring = this.mainService.credencialInfo.elNombre + ' ' + this.mainService.credencialInfo.elNumEmpleado + ' ' + this.mainService.credencialInfo.laDependencia + ' ' + this.mainService.credencialInfo.elPuesto;
     let _elstring = this.mainService.url_LOGIN_qr;
    //  console.log(_elstring)
     let _elStringURL = 'https://sitam.tamaulipas.gob.mx/registroaptraempleado/qr?' + _elstring;
     var options = {
      text: _elStringURL,
      height: 50,
      width: 50
    }

    // Create new QRCode Object
    new QRCode(this.qrcode.nativeElement, options);
    // document.querySelector('canvas')!.style.width = "100%";

    if (this.water_this_mark == false) {
      document.querySelector('canvas')!.style.width = "auto";
      document.querySelector('canvas')!.style.height = "95%";
      document.querySelector('canvas')!.style.verticalAlign = "middle";
  
      document.querySelectorAll('.watermarked').forEach(el => {
        if (el instanceof HTMLElement) {
          el.dataset["watermark"] = (el.dataset["watermark"] + ' ').repeat(300);
        }
      });
    }

    this.water_this_mark = true;
  }

  ionViewDidLeave() {
    // ACTIVA LA PROTECCION COSA SCREENSHOT CHINGADERA -- INI --
    if (this.platformCtrl.is('android') || this.platformCtrl.is('ios')) {
      const disable = async () => {
        await PrivacyScreen.disable();
      };
      disable();
    }
    // ACTIVA LA PROTECCION COSA SCREENSHOT CHINGADERA -- END --
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

  async func_descargaPDF() {
    // console.log(this.mainService.url_LOGIN_qr)
    window.open("https://sitam.tamaulipas.gob.mx/registroaptraempleado/pdfempleado?" + this.mainService.url_LOGIN_qr, '_blank')
  }

  async func_credencial_interactiva_toggle() {
    if (this.credencial_interactiva_toggle == true) {
      this.func_show_toste('Credencial Interactiva desactivada!');
      this.credencial_interactiva_toggle = false;
      if (this.flipped == true) {
        this.credencialClick();
        this.func_force_watermarks();
      } else {
        this.func_force_watermarks();
      }
    } else {
      this.func_show_toste('Credencial Interactiva activada!');
      this.credencial_interactiva_toggle = true;
      this.func_force_watermarks();
    }
  }

  async func_force_watermarks() {
    setTimeout((succ:any) => {
      document.querySelectorAll('.watermarked').forEach(el => {
        if (el instanceof HTMLElement) {
          el.dataset["watermark"] = (el.dataset["watermark"] + ' ').repeat(300);
        }
      });
      let _elstring = this.mainService.url_LOGIN_qr;
        
      let _elStringURL = 'https://sitam.tamaulipas.gob.mx/registroaptraempleado/qr?' + _elstring;
      var options = {
       text: _elStringURL,
       height: 50,
       width: 50
     }
 
     new QRCode(this.qrcode.nativeElement, options);
 
     document.querySelector('canvas')!.style.width = "auto";
     document.querySelector('canvas')!.style.height = "95%";
     document.querySelector('canvas')!.style.verticalAlign = "middle";
    }, 1);
  }

  async func_show_toste(msg: string) {
    const toast = await this.tosteCtrl.create({
      message: msg,
      buttons: [
        {
          text: 'Aceptar',
          role: 'cancel',
        }
      ],
      duration: 5000,
      position: 'top'
    });
    await toast.present();
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