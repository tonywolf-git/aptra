import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MainService } from '../main.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  constructor(public mainService: MainService,
    public modalCtrl: ModalController) { }

  info: any;
  laFoto = '';
  elNumEmpleado = 0;
  laDependencia = '';
  elPuesto = '';
  elNombre = '';
  flipped = false;

  async ngOnInit() {
    console.log('HOHOHO');
    this.info = await this.mainService.func_get(this.mainService.url_GET_recursos_humanos);
    this.laFoto = this.info.foto;
    this.elNumEmpleado = this.info.res.datDatosGenerales.DatosGenerales[0].NumeroEmpleado;
    this.laDependencia = this.info.res.datDatosGenerales.DatosGenerales[0].Dependencia;
    this.elPuesto = this.info.res.datDatosGenerales.DatosGenerales[0].puesto;
    this.elNombre = this.info.res.datDatosGenerales.DatosGenerales[0].Nombres + ' ' + this.info.res.datDatosGenerales.DatosGenerales[0].ApellidoPaterno + ' ' + this.info.res.datDatosGenerales.DatosGenerales[0].ApellidoMaterno;
  };

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

  func_showQR() {
    console.log('QR CLICKED');
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