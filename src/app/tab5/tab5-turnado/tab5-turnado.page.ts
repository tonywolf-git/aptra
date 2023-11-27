import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { RecServiceService } from 'src/app/rec-service.service';
import { Http } from '@capacitor-community/http';
import moment from 'moment';

@Component({
  selector: 'app-tab5-turnado',
  templateUrl: './tab5-turnado.page.html',
  styleUrls: ['./tab5-turnado.page.scss'],
})
export class Tab5TurnadoPage implements OnInit {

  constructor(public recService: RecServiceService,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController) { }
  
  correo: any;
  elTurnado = {
    nombre: '',
    _id: '',
    titular: { name: '', _id: '' },
  };
  areas = [];
  areasFiltro = [];
  finiquito: boolean;



  async ngOnInit() {
    this.correo = this.recService.selectedCorreo;
    console.log(this.recService.selectedCorreo)
    this.areas = await this.func_getAreas();
    this.areasFiltro = this.areas.slice();
    console.log(this.areasFiltro)
  }

  func_agregarTurnado(item:any) {
    this.elTurnado = item;
  }

  func_eliminarTurnado() {
    this.elTurnado = {
      nombre: '',
      _id: '',
      titular: { name: '', _id: '' }
    };
  }

  onSearchTerm(ev:any) {
    this.areasFiltro = this.areas.slice();
    const val = ev.detail.value;
    if (val.length >= 3) {
      this.areasFiltro = this.areas;
      if (val.trim() !== '') {
        this.areasFiltro = this.areasFiltro.filter((term:any) => {
          return term.nombre.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().indexOf(val.trim().toLowerCase()) > -1;
        });
      }
    }
  }

  func_toProperCase(str:any) {
    return str.replace(/\w\S*/g, function(txt:any){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  };
  
  func_checkFiniquito() {
    if (this.finiquito != true) { return 'off'} else { return 'on'}
  }

  async toast_turnadoOK() {
    const toast = await this.toastCtrl.create({
      message: 'Turnado y notificado vía correo con éxito..',
      duration: 2000
    });
    toast.present();
  }

  async toast_turnadoError() {
    const toast = await this.toastCtrl.create({
      message: 'Hubo un error al turnar, intenta más tarde.',
      duration: 2000
    });
    toast.present();
  }

  async func_doTurnado() {
    let _elRes: any;
    
    const loading = await this.loadingCtrl.create({
      message: 'Turnando...',
    });
    await loading.present();

    let _data = {
      usuario: this.recService['userInfo']['_id'],
      envio: this.correo['_id'],
      // turnonuevo: this.elTurnado["titular"]["_id"],
      turnonuevo: this.elTurnado["_id"],
      porfiniquitar: this.func_checkFiniquito(),
      fecha: this.func_toProperCase(moment().format('DD MMMM YYYY')),
      hora: moment().format('hh[:]mm A')
    }

    const options = {
      url: this.recService.turnar,
      data: _data,
      headers: { 'Content-Type': 'application/json', 'access-token': this.recService["activeToken"] },
    };

    try {
      _elRes = await Http.post(options).then((data:any) => {
        console.log(data);
        if (data.data.exito == true) {
          this.func_eliminarTurnado();
          this.loadingCtrl.dismiss();
          this.toast_turnadoOK();
          this.navCtrl.pop();
        } else {
          this.loadingCtrl.dismiss();
          this.toast_turnadoError();
        }
      })
      return _elRes;
    } catch (error) {
      this.toast_turnadoError();
      this.loadingCtrl.dismiss();
      console.error(error);
      return _elRes;
    }
  }

  async func_getAreas() {
    let _elRes: any;
    let _elReturn: boolean;

    const options = {
      url: this.recService.areas,
      data: { idEnvio: this.correo._id },
      headers: { 'Content-Type': 'application/json', 'access-token': this.recService.activeToken },
    };

    try {
      _elRes = await Http.post(options).then(data => {
        return data.data.areas;
      })
      return _elRes;
    } catch (error) {
      console.warn(error);
      return _elRes;
    }
  }

  goBack() {
    this.navCtrl.back();
  }
}
