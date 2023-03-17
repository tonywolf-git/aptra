import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LoginPage } from './login/login.page';
import { PerfilPage } from './perfil/perfil.page';
import { RegistroPage } from './registro/registro.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public appPages = [
    { title: 'Mi perfil', url: '/folder/Inbox', icon: 'person' },
    { title: 'Mis trámites', url: '/folder/Outbox', icon: 'document-text' },
    { title: 'Mis denuncias', url: '/folder/Favorites', icon: 'chatbox' },
    { title: 'Notificaciones', url: '/folder/Archived', icon: 'notifications' },
    { title: 'Contacto', url: '/folder/Trash', icon: 'chatbubbles' },
    { title: 'Salir', url: '/folder/Spam', icon: 'exit' },
  ];
  
  constructor(public modalCtrl: ModalController) {}

  async func_openPerfil() {
    console.log('Hola, soy el perfil.');

    const modal = await this.modalCtrl.create({
      component: PerfilPage,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    // if (role === 'confirm') {
    //   this.message = `Hello, ${data}!`;
    // }
  }

  async func_openLogin() {
    console.log('Hola, soy el login.');

    const modal = await this.modalCtrl.create({
      component: LoginPage,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    // if (role === 'confirm') {
    //   this.message = `Hello, ${data}!`;
    // }
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
}
