import { Component } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { LoginPage } from './login/login.page';
import { PerfilPage } from './perfil/perfil.page';
import { RegistroPage } from './registro/registro.page';
import { PushNotifications } from '@capacitor/push-notifications';
import { FCM } from "@capacitor-community/fcm";
import { MainService } from './main.service';
import { register } from 'swiper/element/bundle';

register();

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
  
  constructor(public modalCtrl: ModalController,
    public mainService: MainService,
    public navCtrl: NavController) {}

  profilePic = 'none';

  async openedShit() {
    console.log('OPNED');
    if (this.mainService.credencialInfo.laFoto != '') {
      this.profilePic = this.mainService.credencialInfo.laFoto;
    }
  }

  async ngOnInit() {
    console.log('IT HAS BEGUN');
    
    const addListeners = async () => {
      await PushNotifications.addListener('registration', token => {
        console.info('Registration token: ', token.value);
        FCM.subscribeTo({ topic: "laroca" })
        .then((r) => {
          // alert(`subscribed to topic`)
          console.log('ERES PARTE DE LA ROCA');
        })
        .catch((err) => alert(err));
      });
    
      await PushNotifications.addListener('registrationError', err => {
        console.error('Registration error: ', err.error);
      });
    
      await PushNotifications.addListener('pushNotificationReceived', notification => {
        console.log('Push notification received: ', notification);
      });
    
      await PushNotifications.addListener('pushNotificationActionPerformed', notification => {
        console.log('Push notification action performed', notification.actionId, notification.inputValue);
      });
    }

    const registerNotifications = async () => {
      let permStatus = await PushNotifications.checkPermissions();
    
      if (permStatus.receive === 'prompt') {
        permStatus = await PushNotifications.requestPermissions();
      }
    
      if (permStatus.receive !== 'granted') {
        throw new Error('User denied permissions!');
      }
    
      await PushNotifications.requestPermissions();
      await PushNotifications.register();
    }
    
    const getDeliveredNotifications = async () => {
      const notificationList = await PushNotifications.getDeliveredNotifications();
      console.log('delivered notifications', notificationList);
    }

    await addListeners().then(msg => {
    });

    await registerNotifications().then(msg => {
    });
  }

  async func_logOut() {
    this.mainService.func_doLogOut();
  }

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


