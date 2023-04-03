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

  loginData = {
    email: '',
    password: ''
  }

  constructor(public mainService: MainService,
    public menuCtrl: MenuController,
    public modalCtrl: ModalController) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.menuCtrl.enable(false);
    this.menuCtrl.swipeGesture(false);
  }

  async func_doLogin() {
    let _res = await this.mainService.func_NoAxios_doLogin(this.loginData['email'], this.loginData['password']);
    if (_res == 0 || _res == '0') {
      this.mainService.alertThis('Error', 'Datos incorrectos, porfavor intenta de nuevo.')
    }
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