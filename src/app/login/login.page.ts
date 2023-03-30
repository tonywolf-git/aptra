import { Component, OnInit, ViewChild } from '@angular/core';
// import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, Zoom, SwiperOptions } from 'swiper';
import { IonModal, MenuController, ModalController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { MainService } from '../main.service';
import { RegistroPage } from '../registro/registro.page';

// SwiperCore.use([Autoplay, Keyboard, Pagination, Scrollbar, Zoom]);

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;

  // swiperConfig: SwiperOptions = {
  //   // autoHeight: true,
  // };

  constructor(public mainService: MainService,
    public menuCtrl: MenuController,
    public modalCtrl: ModalController) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.menuCtrl.enable(false);
    this.menuCtrl.swipeGesture(false);
  }

  func_doLogin() {
    this.mainService.func_doLogin();
  }

  async func_openRegistro() {
    console.log('Hola, soy el registro.');

    const modal = await this.modalCtrl.create({
      component: RegistroPage,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    // if (role === 'confirm') {
    //   this.message = `Hello, ${data}!`;
    // }
  }

   // MODAL STUFF INI
   onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
    }
  }
  // MODAL STUFF END
}