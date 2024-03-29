import { Component } from '@angular/core';
import { AlertController, MenuController, ModalController, NavController } from '@ionic/angular';
import { LoginPage } from './login/login.page';
import { PerfilPage } from './perfil/perfil.page';
import { RegistroPage } from './registro/registro.page';
import { PushNotifications } from '@capacitor/push-notifications';
import { FCM } from "@capacitor-community/fcm";
import { MainService } from './main.service';
import { register } from 'swiper/element/bundle';
import { Router } from '@angular/router';
import { PrivacyScreen } from '@capacitor-community/privacy-screen';
import { Platform } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Config } from '@ionic/angular';
import * as moment from 'moment';

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
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public routerCtrl: Router,
    public toasteCtrl: ToastController,
    public platformCtrl: Platform,
    public alertCtrl: AlertController,
    public configCtrl: Config) {
      let swipeBackEnabled = configCtrl.getBoolean('swipeBackEnabled')
      // console.log(configCtrl.getNumber('swipeBackEnabled'))
    }

  profilePic = 'none';

  async openedShit() {
    // console.log('OPNED');
    if (this.mainService.credencialInfo.laFoto != '') {
      this.profilePic = this.mainService.credencialInfo.laFoto;
    }
  }

  async ngOnInit() {
    console.log('IT HAS BEGUN');

    moment.locale('es-mx');

    const disable = async () => {
      await PrivacyScreen.disable();
    };
    disable();

    // console.log(this.mainService.userCurp)

    // this.navCtrl.navigateRoot('tabs');

    if (localStorage.getItem("userCurp") === null) {
      // console.log('NO CURP GUARDADO');
    } else {
      // console.log(localStorage.getItem("userCurp"));
      this.mainService.userCurp = localStorage['userCurp'];
      this.mainService.tipo_gobierno = Number(localStorage['tipo_gobierno'])

      // console.log('VALIDANDO:', this.mainService.tipo_gobierno, this.mainService.userCurp)
      
      // this.mainService.url_GET_recursos_humanos = "https://sitam.tamaulipas.gob.mx/api/obtenEmpleadoCURP/" + this.mainService.userCurp;
      switch (this.mainService.tipo_gobierno) {
        case 1:
          this.mainService.url_GET_recursos_humanos = "https://sitam.tamaulipas.gob.mx/api/obtenEmpleadoCURP/" + this.mainService.userCurp;
          // this.mainService.url_GET_recursos_humanos = "https://testsitam.tamaulipas.gob.mx/api/obtenEmpleadoCURP/" + this.mainService.userCurp;
          break;

        case 2:
          this.mainService.url_GET_recursos_humanos = "https://sitam.tamaulipas.gob.mx/aptranotificaciones/nominaOpd?curp=" + this.mainService.userCurp;
          break;
      
        default:
          break;
      }

      // console.log(this.mainService.url_GET_recursos_humanos)
      // console.log(this.mainService.userCurp);
      this.mainService.url_LOGIN_qr = localStorage['userQR']
      // this.navCtrl.navigateRoot('perfil');
      this.navCtrl.navigateRoot('tab1');
    }
    
    const addListeners = async () => {
      await PushNotifications.addListener('registration', token => {
        console.info('Registration token: ', token.value);
        // FCM.subscribeTo({ topic: "laroca" })
        // .then((r) => {
        //   console.log('ERES PARTE DE LA ROCA');
        // }).catch((err) => alert(err));
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
    const alert = await this.alertCtrl.create({
      // header: 'Cerrar Sesión',
      message: '¿Quieres cerrar esta sesión?',
      buttons: [
        {
          text: 'Si',
          role: 'ok',
          handler: async (input) => {
            this.mainService.func_doLogOut();
          }
        },
        {
          text: 'No',
          role: 'cancel',
          handler: async (input) => {
            console.log('Acción cancelada.')
          }
        },
      ],
    });

    this.menuCtrl.close().then(async succ => {
      await alert.present();
    });
  }

  async func_openHome() {
    this.menuCtrl.close().then(msg => {
      // let _where = 'tabs/' + 'tab1';
      let _where = 'tab1';
      this.routerCtrl.navigateByUrl(_where);
    });
  }

  async func_openPerfil() {
    // console.log('Hola, soy el perfil.');

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
    // console.log('Hola, soy el login.');

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
    // console.log('Hola, soy el registro.');

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


