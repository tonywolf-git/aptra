import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { MainService } from '../main.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  constructor(public modalCtrl: ModalController,
    public mainService: MainService,
    public platformCtrl: Platform) { }

  appVersion = 0;

  ngOnInit() {
    this.userProfile = this.mainService.credencialInfo.laFoto;
    if (this.platformCtrl.is('android')) {
      this.appVersion = this.mainService.appVersion["android"];
    } else {
      if (this.platformCtrl.is('ios')) {
        this.appVersion = this.mainService.appVersion["ios"];
      }
    }
  }

  userProfile = '';

  async func_perfilLogOut() {
    this.modalCtrl.dismiss().then(succ => {
      this.mainService.func_doLogOut();
    })
  }

  func_dismissModal() {
    this.modalCtrl.dismiss();
  }
}
