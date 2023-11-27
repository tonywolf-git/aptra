import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { MainService } from '../main.service';

@Component({
  selector: 'app-cambia-pass',
  templateUrl: './cambia-pass.page.html',
  styleUrls: ['./cambia-pass.page.scss'],
})
export class CambiaPassPage implements OnInit {

  constructor(public modalCtrl: ModalController,
    public mainService: MainService,
    public tosteCtrl: ToastController) { }

  pass  = '';
  passRepeat = '';

  passType = 'password';
  passTypeRepeat = 'password'

  ngOnInit() {
  }

  passwordType(type: any) {
    if (type == 'normal') {
      if (this.passType == "password") {
        this.passType = "text";
        this.passTypeRepeat = "text";
      } else {
        this.passType = "password";
        this.passTypeRepeat = "password";
      }
    } else {
      if (this.passTypeRepeat == "password") {
        this.passTypeRepeat = "text";
      } else {
        this.passTypeRepeat = "password";
      }
    }
  }

  async func_cambiarPass() {
    if (this.pass == this.passRepeat) {
      if (this.pass.length == 0) {
        this.func_show_toste('Tu contraseña NO puede estar vacía. Intenta nuevamente.');
      } else {
        let _passResponse = await this.mainService.func_cambiaPass(this.pass);
        if (_passResponse == true) {
          // console.log(_passResponse)
          this.pass = ""; // SE BORRA PARA QUE YA NO VUELVA A SALIR
          this.passRepeat = ""; // SE BORRA PARA QUE YA NO VUELVA A SALIR
          this.modalCtrl.dismiss().then((succ:any)=> {
            this.func_show_toste('¡Tu contraseña ha sido actualizada!')
          })
        } else {
          this.func_show_toste('Hubo un error al cambiar la contraseña. Por favor, intenta de nuevo.');
        }
      }
    } else {
      this.func_show_toste('Las contraseñas no son iguales, intenta nuevamente.');
    }
  }

  func_dismissModal() {
    this.modalCtrl.dismiss();
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
