import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, Platform, ToastController } from '@ionic/angular';
import { MainService } from '../main.service';
import { CambiaPassPage } from '../cambia-pass/cambia-pass.page';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  constructor(public modalCtrl: ModalController,
    public mainService: MainService,
    public platformCtrl: Platform,
    public alertCtrl: AlertController,
    public tosteCtrl: ToastController) { }

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
  userPass = '';

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

  async OLD_func_cambia_pass() {
    // console.log('Si, ya funca.')

    const alert = await this.alertCtrl.create({
      header: 'Cambio de contraseña',
      message: 'Por favor, escribe la nueva contraseña que deseas utilizar:',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: async (input) => {
            // console.log('Ya no quiero nada! >:(');
          }
        },
        {
          text: 'Aceptar',
          role: 'ok',
          handler: async (input) => {
            // console.log(input)
            if (input[0] == input[1]) {
              // console.log('Si concuerdan, buen pedo.');
              let _passResponse = await this.mainService.func_cambiaPass(input[0]);
              if (_passResponse == true) {
                // console.log(_passResponse)
                this.userPass = ""; // SE BORRA PARA QUE YA NO VUELVA A SALIR
                this.func_show_toste('¡Tu contraseña ha sido actualizada!')
              } else {
                this.func_show_toste('Hubo un error al cambiar la contraseña. Por favor, intenta de nuevo.')
              }
            } else {
              this.userPass = input[0];
              this.func_show_toste('AVISO: Las contraseñas no son iguales, intenta de nuevo.')
              this.func_cambia_pass();
            }
            // let _response = await this.mainService.func_validaCodigo(_elId, input[0]);

            // if (_response == 1 || _response == '1') {
            //   // this.modalCtrl.dismiss();
            //     const toast = await this.toastCtrl.create({
            //       message: '¡Se ha validado el código correctamente, ya puedes iniciar sesión!',
            //       duration: 5000,
            //       position: 'top'
            //     });
            
            //     await toast.present();
            // } else {
            //   if (_response == 0 || _response == "0") {
            //     // NO VALIDADO
            //     this.func_codigoErroneo(_elId)
            //   } else {
            //     //ERROR GENERICO
            //     // alert('AL SERVIDOR LE DIO LA AMNSIEDA');
            //     this.mainService.alertThis('Error', 'Ha ocurrido un error, por favor intente más tarde.');
            //   }
            // }
          }
        },
      ],
      inputs: [
        {
          placeholder: 'Contraseña',
          type: 'password',
          value: this.userPass
        },
        {
          placeholder: 'Repite la Contraseña',
          type: 'password',
        },
      ]
    });

    await alert.present();
  }

  func_dismissModal() {
    this.modalCtrl.dismiss();
  }

  async func_cambia_pass() {
    this.modalCtrl.dismiss().then(async (succ:any) => {
      const modal = await this.modalCtrl.create({
        component: CambiaPassPage,
      });
      modal.present();
    })
  }

  async func_show_toste(msg: string) {
    const toast = await this.tosteCtrl.create({
      message: msg,
      buttons: [
        {
          text: 'Aceptar',
          role: 'cancel',
        }
      ],
      duration: 5000,
      position: 'top'
    });
    await toast.present();
  }
}
