import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LoginPage } from './login/login.page';
import { PerfilPage } from './perfil/perfil.page';
import { RegistroPage } from './registro/registro.page';
import { PushNotifications } from '@capacitor/push-notifications';
import { FCM } from "@capacitor-community/fcm";

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

  ngOnInit() {
    console.log('IT HAS BEGUN');

    const addListeners = async () => {
      await PushNotifications.addListener('registration', token => {
        console.info('Registration token: ', token.value);
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

      FCM.subscribeTo({ topic: "laroca" })
      .then((r) => alert(`subscribed to topic`))
      .catch((err) => console.log(err));
    }
    
    const getDeliveredNotifications = async () => {
      const notificationList = await PushNotifications.getDeliveredNotifications();
      console.log('delivered notifications', notificationList);
    }
    PushNotifications.createChannel({
      id: "laroca", // (required)
      name: "LaRoca", // (required)
      description: "No se si es lo mismo que los topicos, pero ahi va", // (optional) default: undefined.
      sound: "default", // (optional) See `soundName` parameter of `localNotification` function
      importance: 4, // (optional) default: 4. Int value of the Android notification importance
      vibration: true, // (optional) default: true. Creates the default vibration patten if true.
    })
    addListeners();
    registerNotifications();
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


