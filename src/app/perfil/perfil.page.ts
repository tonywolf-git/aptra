import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, Platform } from '@ionic/angular';
import { MainService } from '../main.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  constructor(public modalCtrl: ModalController,
    public mainService: MainService,
    public platformCtrl: Platform,
    public alertCtrl: AlertController) { }

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
    const alert = await this.alertCtrl.create({
      header: 'Cerrar Sesión',
      message: '¿Quieres cerrar esta sesión?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: async (input) => {
            console.log('Acción cancelada.')
          }
        },
        {
          text: 'Si',
          role: 'ok',
          handler: async (input) => {
            this.modalCtrl.dismiss().then(succ => {
              this.mainService.func_doLogOut();
            })
          }
        },
      ],
    });

    await alert.present();
  }

  async func_cambia_pass() {
    console.log('Si, ya funca.')

    // const alert = await this.alertCtrl.create({
    //   header: 'Alerta',
    //   message: 'Tu correo aun no ha sido verificado, se envió un código de 6 dígitos al correo electrónico para que lo hagas, escríbelo aquí:',
    //   buttons: [
    //     {
    //       text: 'OK',
    //       role: 'ok',
    //       handler: async (input) => {
    //         let _response = await this.mainService.func_validaCodigo(_elId, input[0]);

    //         if (_response == 1 || _response == '1') {
    //           // this.modalCtrl.dismiss();
    //             const toast = await this.toastCtrl.create({
    //               message: '¡Se ha validado el código correctamente, ya puedes iniciar sesión!',
    //               duration: 5000,
    //               position: 'top'
    //             });
            
    //             await toast.present();
    //         } else {
    //           if (_response == 0 || _response == "0") {
    //             // NO VALIDADO
    //             this.func_codigoErroneo(_elId)
    //           } else {
    //             //ERROR GENERICO
    //             // alert('AL SERVIDOR LE DIO LA AMNSIEDA');
    //             this.mainService.alertThis('Error', 'Ha ocurrido un error, por favor intente más tarde.');
    //           }
    //         }
    //       }
    //     },
    //   ],
    //   inputs: [
    //     {
    //       placeholder: 'Código de verificación',
    //       attributes: {
    //         maxlength: 6,
    //       },
    //     }
    //   ]
    // });

    // await alert.present();
  }

  func_dismissModal() {
    this.modalCtrl.dismiss();
  }
}
