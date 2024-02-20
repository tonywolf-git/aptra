import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController, Platform, ToastController } from '@ionic/angular';
import { MainService } from '../main.service';
import { CambiaPassPage } from '../cambia-pass/cambia-pass.page';
import { Http } from '@capacitor-community/http';
import { ModalVCardPage } from '../modal-v-card/modal-v-card.page';


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
    public tosteCtrl: ToastController,
    public loadCtrl: LoadingController,
    public toastCtrl: ToastController) { }

  appVersion = 0;

  vCardURL = "ninguna";

  async ngOnInit() {
    this.userProfile = this.mainService.credencialInfo.laFoto;
    if (this.platformCtrl.is('android')) {
      this.appVersion = this.mainService.appVersion["android"];
    } else {
      if (this.platformCtrl.is('ios')) {
        this.appVersion = this.mainService.appVersion["ios"];
      }
    }
    
    await this.func_get_compartir();
  }

  userProfile = '';
  userPass = '';

  modalCompartir_datos = {
    mod_cve_usuario: '',
    mod_nombre: 'mod_nombre',
    mod_curp: 'mod_curp',
    mod_puesto: 'mod_puesto',
    mod_dependencia: 'mod_dependencia',
    mod_lugar: 'mod_lugar',
    mod_telefono: 'mod_telefono',
    mod_extension: 'mod_extension',
    mod_correo: 'mod_correo',
    check_mod_nombre: false,
    check_mod_curp: false,
    check_mod_puesto: false,
    check_mod_dependencia: false,
    check_mod_lugar: false,
    check_mod_telefono: false,
    check_mod_extension: false,
    check_mod_correo: false
  }

  async func_perfilLogOut() {
    const alert = await this.alertCtrl.create({
      // header: 'Cerrar Sesión',
      message: '¿Quieres cerrar esta sesión?',
      buttons: [
        {
          text: 'Si',
          role: 'ok',
          handler: async (input) => {
            this.modalCtrl.dismiss().then(succ => {
              this.mainService.func_doLogOut();
            })
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

  async func_get_compartir() {
    let url = 'https://sitam.tamaulipas.gob.mx/aptranotificaciones/traerdatosperfil?cve_usuario=' + this.mainService['credencialInfo']['elCURP'];
    // console.log(url)
    let _res: any;
    await fetch(url).then(function(response) {
      return response.json();
    }).then(data => {
      _res = data;
      this.modalCompartir_datos['mod_cve_usuario'] = _res["cve_usuario"];

      // DATOS
      this.modalCompartir_datos['mod_nombre'] = _res["nombre"];
      this.modalCompartir_datos['mod_curp'] = _res["curp"];
      this.modalCompartir_datos['mod_puesto'] = this.mainService['credencialInfo']['elPuesto']
      this.modalCompartir_datos['mod_dependencia'] = _res["dependencia"];
      this.modalCompartir_datos['mod_lugar'] = _res["ubicacion"];
      this.modalCompartir_datos['mod_telefono'] = _res["telefono"];
      this.modalCompartir_datos['mod_extension'] = _res["ext"];
      this.modalCompartir_datos['mod_correo'] = _res["email"];

      // CHECKS;
      this.modalCompartir_datos["check_mod_nombre"] = this.func_convertBool(_res['posicion1']);
      this.modalCompartir_datos["check_mod_curp"] = this.func_convertBool(_res['posicion2']);
      this.modalCompartir_datos["check_mod_puesto"] = this.func_convertBool(_res['posicion3']);
      this.modalCompartir_datos["check_mod_dependencia"] = this.func_convertBool(_res['posicion4']);
      this.modalCompartir_datos["check_mod_lugar"] = this.func_convertBool(_res['posicion5']);
      this.modalCompartir_datos["check_mod_telefono"] = this.func_convertBool(_res['posicion6']);
      this.modalCompartir_datos["check_mod_extension"] = this.func_convertBool(_res['posicion7']);
      this.modalCompartir_datos["check_mod_correo"] = this.func_convertBool(_res['posicion8']);

      // console.log(_res)

      // console.log(this.modalCompartir_datos)
    }).catch(function(err) {
      _res = [];
      console.log('Fetch Error :-S', err);
    });
    return _res;
  }

  async func_post_guardar_compartir() {
    // console.log(this.modalCompartir_datos)

    let _elRes: any;
    let _theUrl = 'https://sitam.tamaulipas.gob.mx/aptranotificaciones/datosperfil';

    const loading = await this.loadCtrl.create({
      message: 'Guardando preferencias...',
    });

    loading.present();
    
    const options = {
      url: _theUrl,
      data: {
        'cve_usuario': this.modalCompartir_datos['mod_cve_usuario'],

        // DATOS
        'nombre': this.modalCompartir_datos['mod_nombre'],
        'curp': this.modalCompartir_datos['mod_curp'],
        'puesto': this.modalCompartir_datos['mod_puesto'],
        'dependencia': this.modalCompartir_datos['mod_dependencia'],
        'ubicacion': this.modalCompartir_datos['mod_lugar'],
        'telefono': this.modalCompartir_datos['mod_telefono'],
        'ext': this.modalCompartir_datos['mod_extension'],
        'email':this.modalCompartir_datos['mod_correo'],

        // CHECKS
        'posicion1': this.func_convertBool(this.modalCompartir_datos["check_mod_nombre"]),
        'posicion2': this.func_convertBool(this.modalCompartir_datos["check_mod_curp"]),
        'posicion3': this.func_convertBool(this.modalCompartir_datos["check_mod_puesto"]),
        'posicion4': this.func_convertBool(this.modalCompartir_datos["check_mod_dependencia"]),
        'posicion5': this.func_convertBool(this.modalCompartir_datos["check_mod_lugar"]),
        'posicion6': this.func_convertBool(this.modalCompartir_datos["check_mod_telefono"]),
        'posicion7': this.func_convertBool(this.modalCompartir_datos["check_mod_extension"]),
        'posicion8': this.func_convertBool(this.modalCompartir_datos["check_mod_correo"])
      },
      headers: { 'Content-Type': 'application/json' },
    };

    try {
      _elRes = await Http.post(options).then(response => response.data)
      .then(async (data) => {
        // console.log('RESPONSE DE reenviacion:', data);
        loading.dismiss();

        const toast = await this.toastCtrl.create({
          message: '¡Se han guardado las preferencias correctamente!',
          duration: 5000,
          position: 'top'
        });

        this.modalCtrl.dismiss();
        await toast.present();
        this.func_get_compartir();
        return JSON.parse(data);
      })
      loading.dismiss();
      return JSON.parse(_elRes);
    } catch (error) {
      _elRes = 'error';
      return _elRes;
    }
  }

  func_gen_vCard() {
    var start = "BEGIN:VCARD\nVERSION:3.0";
    var end = "END:VCARD";
    var data = "";

    var init = function() {
        data = "";
    };

    var name = function (surname: any, lastname: any) {
        data += "N:" + lastname + ';' + surname;
        data += "\n";
    };

    var cell = function (cell: any) {
        data += "TEL;TYPE=CELL:" + cell;
        data += "\n";
    };

    var work = function (work: any) {
        data += "TEL;TYPE=WORK,VOICE:" + work;
        data += "\n";
     };

    var other = function (work: any) {
        data += "TEL;TYPE=OTHER:" + work;
        data += "\n";
    };

    var email = function (email: any) {
        data += "EMAIL;TYPE=PREF,INTERNET:" + email;
        data += "\n";
    };

    var get = function () {
        return start + '\n' + data + end;
    };

    console.log({
      init:init,
        name:name,
        cell:cell,
        work:work,
        other:other,
        email:email,
        get:get
    })

    return {
        init:init,
        name:name,
        cell:cell,
        work:work,
        other:other,
        email:email,
        get:get
    }
  }

  func_convertBool(_theBool: any) {
    let _elRes = false;

    if (_theBool == 1) {
      _elRes = true;
    } else {
      _elRes = false;
    }

    return _elRes;
  }

  func_convertBool_reverse(_theBool: any) {
    let _elRes = 0;

    if (_theBool == true) {
      _elRes = 1;
    } else {
      _elRes = 0;
    }

    return _elRes;
  }

  async func_genVcard() {
    let _elRes = '';

    const loading = await this.loadCtrl.create({
      message: 'Cargando vCard...',
    });

    loading.present();

    const options = {
      url: "https://sitam.tamaulipas.gob.mx/aptranotificaciones/apivcard",
      data: {
        'curp': this.mainService.credencialInfo["elCURP"],
      },
      headers: { 'Content-Type': 'application/json' },
    };

    try {
      await Http.post(options).then(response => response.data)
      .then(async (data) => {
        _elRes = String(data).replace('"', "");
        loading.dismiss();
      })
      loading.dismiss();
    } catch (error) {
      _elRes = 'ninguna';
      // console.log(this.vCardURL)
    }
    this.vCardURL = _elRes;

    if (this.vCardURL != 'ninguna') {
      this.func_showQR();
    } else {
      this.mainService.alertThis('Aviso importante', 'No se pudo mostrar tu vCard, por favor intenta mas tarde.')
    }
  }

  clickCheck(event:any) {
    event.preventDefault();
  }

  async func_showQR() {
    const modal = await this.modalCtrl.create({
      component: ModalVCardPage,
      cssClass: 'controllerModal',
      componentProps: {
        'vCardURL': this.vCardURL
      },
      showBackdrop: true
    });
    modal.present().then();

    const { data, role } = await modal.onWillDismiss();
  }
}