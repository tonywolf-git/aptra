import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MainService } from '../main.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  constructor(public modalCtrl: ModalController,
    public mainService: MainService) { }

  ngOnInit() {
    this.userProfile = this.mainService.credencialInfo.laFoto;
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
