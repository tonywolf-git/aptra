import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IonModal, ModalController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import Swiper from 'swiper';
import { MainService } from '../main.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})

export class RegistroPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
  @ViewChild('swiper')
  theSwiper: ElementRef | undefined;
  
  step_registro = 0;
  swiperCtrl: any;
  
  constructor(public modalCtrl: ModalController,
    public mainService: MainService) {
      this.swiperCtrl = this.theSwiper?.nativeElement.swiper
    }

  ngOnInit() {
  }

  moveFocus(event: any, nextElement: any, previousElement: any) {
    console.log(event.keyCode);
    if (event.keyCode === 8 && previousElement) {
      previousElement.setFocus();
    } else if (event.keyCode >= 48 && event.keyCode <= 57) {
      if (nextElement) {
        nextElement.setFocus();
      }
    } else if (event.keyCode >= 96 && event.keyCode <= 105) {
      if (nextElement) {
        nextElement.setFocus();
      }
    } else {
      event.path[0].value = '';
    }
  }

  func_goBack() {
    this.modalCtrl.dismiss();
  }

  func_doRegistro() {
    this.swiperCtrl = this.theSwiper?.nativeElement.swiper;
    
    switch (this.step_registro) {
      case 0:
        console.log('CORREO | CONTRASEÑA | CHECAR CONTRASEÑA');
        this.step_registro += 1;
        this.swiperCtrl.slideNext();
        break;
        
      case 1:
        console.log('CONFIRMAR QUE VAMOS A SOLICITAR MAS COSAS');
        this.step_registro += 1;
        this.swiperCtrl.slideNext();
        break;

      case 2:
        console.log('NUM EMPLEADO | RFC | CURP');
        this.step_registro += 1;
        this.swiperCtrl.slideNext();
        break;

      case 3:
        console.log('TE VAMOS A ENVIAR EL MENSAJITO DEL WASA');
        this.step_registro += 1;
        this.swiperCtrl.slideNext();
        break;

      case 4:
        console.log('YA TE LO ENVIAMOS, PONLO');
        break;
    
      default:
        break;
    }
    // this.mainService.func_doRegistro();
  }

  // MODAL STUFF INI
  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
    }
  }
  // MODAL STUFF END
}
