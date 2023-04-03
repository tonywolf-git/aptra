import { Component, OnInit, ViewChild } from '@angular/core';
// import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, Zoom, SwiperOptions } from 'swiper';
import { AlertController, IonModal, MenuController, ModalController, NavController, ToastController } from '@ionic/angular';
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
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public navCtrl: NavController) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.menuCtrl.enable(false);
    this.menuCtrl.swipeGesture(false);
  }

  async func_doLogin() {
    let _res = await this.mainService.func_doLogin(this.loginData['email'], this.loginData['password']);
    if (typeof _res == "number") {
      if (_res == 0) {
        this.mainService.alertThis('Error', 'Datos incorrectos, porfavor intenta de nuevo.')
      }
    } else {
      if (_res.includes("NOVERIFICADO_")) {
        let _elId = _res.split('_')[1];
        this.mainService.func_reenviarCodigo(_elId).then(async succ => {
          const alert = await this.alertCtrl.create({
            header: 'Alerta',
            message: 'Tu correo aun no ha sido verificado, se envió un código de 6 dígitos al correo electrónico para que lo hagas, escríbelo aquí:',
            buttons: [
              {
                text: 'OK',
                role: 'ok',
                handler: async (input) => {
                  let _response = await this.mainService.func_validaCodigo(_elId, input[0]);

                  if (_response == 1 || _response == '1') {
                    this.modalCtrl.dismiss();
                      const toast = await this.toastCtrl.create({
                        message: '¡Se ha validado el código correctamente, ya puedes iniciar sesión!',
                        duration: 5000,
                        position: 'top'
                      });
                  
                      await toast.present();
                  } else {
                    if (_response == 0 || _response == "0") {
                      // NO VALIDADO
                      this.func_codigoErroneo(_elId)
                    } else {
                      //ERROR GENERICO
                      // alert('AL SERVIDOR LE DIO LA AMNSIEDA');
                      this.mainService.alertThis('Error', 'Ha ocurrido un error, por favor intente más tarde.');
                    }
                  }
                }
              },
            ],
            inputs: [
              {
                placeholder: 'Código de verificación',
                attributes: {
                  maxlength: 6,
                },
              }
            ]
          });
      
          await alert.present();
        });

        
      } else {
        if (_res == 'error') {
          this.mainService.alertThis('Error', 'Hubo un error, por favor intenta nuevamente.')
        } else {
          // console.log('ASUMO QUE EL LOGIN EStÁ BIEN')
          console.log(_res);
          this.mainService.userCurp = _res;
          this.mainService.url_GET_recursos_humanos = "https://sitam.tamaulipas.gob.mx/api/obtenEmpleadoCURP/" + this.mainService.userCurp;
          this.navCtrl.navigateRoot('tabs');
          localStorage.setItem('userCurp', _res);
        }
      }
    }
  }

  async func_codigoErroneo(_elId: any) {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: 'Código no valido, intenta nuevamente:',
      buttons: [
        {
          text: 'OK',
          role: 'ok',
          handler: async (input) => {
            let _response = await this.mainService.func_validaCodigo(_elId, input[0]);

            if (_response == 1 || _response == '1') {
                const toast = await this.toastCtrl.create({
                  message: '¡Se ha validado el código correctamente, ya puedes iniciar sesión!',
                  duration: 5000,
                  position: 'top'
                });
            
                await toast.present();
            } else {
              if (_response == 0 || _response == "0") {
                // NO VALIDADO
                this.func_codigoErroneo(_elId)
              } else {
                //ERROR GENERICO
                // alert('AL SERVIDOR LE DIO LA AMNSIEDA');
                this.mainService.alertThis('Error', 'Ha ocurrido un error, por favor intente más tarde.');
              }
            }
          }
        },
      ],
      inputs: [
        {
          placeholder: 'Código de verificación',
          attributes: {
            maxlength: 6,
          },
        }
      ]
    });

    await alert.present();
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