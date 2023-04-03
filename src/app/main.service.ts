import { Injectable } from '@angular/core';
import { AlertController, MenuController, NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(public navCtrl: NavController,
    public menuCtrl: MenuController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController) { }

  credencialInfo = {
    laFoto: "",
    elNumEmpleado: 1007,
    laDependencia: "",
    elPuesto: "",
    elNombre: "",
    elCURP: "",
    elAlergia: '',
    elTipoSangre: '',
  };

  url_GET_recursos_humanos = "https://sitam.tamaulipas.gob.mx/api/obtenEmpleadoCURP/SASG910725HTSRRN02";

  async func_get(url: string) {
    let _res: any;
    await fetch(url).then(function(response) {
      return response.json();
    }).then(data => {
      // console.log(data.foto);
      _res = data;

      this.credencialInfo.laFoto = _res.foto;
      this.credencialInfo.elNumEmpleado = _res.res.datDatosGenerales.DatosGenerales[0].NumeroEmpleado;
      this.credencialInfo.laDependencia = _res.res.datDatosGenerales.DatosGenerales[0].Dependencia;
      this.credencialInfo.elPuesto = _res.res.datDatosGenerales.DatosGenerales[0].puesto;
      this.credencialInfo.elNombre = _res.res.datDatosGenerales.DatosGenerales[0].Nombres + ' ' + _res.res.datDatosGenerales.DatosGenerales[0].ApellidoPaterno + ' ' + _res.res.datDatosGenerales.DatosGenerales[0].ApellidoMaterno;
      this.credencialInfo.elCURP = _res.res.datDatosGenerales.DatosGenerales[0].curp;
      this.credencialInfo.elAlergia = _res.res.datDatosGenerales.DatosGenerales[0].alergias;
      this.credencialInfo.elTipoSangre = _res.res.datDatosGenerales.DatosGenerales[0].tipo_sangre;
    }).catch(function(err) {
      console.log('Fetch Error :-S', err);
    });
    console.log(_res);
    return _res;
  }

  async func_getCalendario() {
    let url = 'https://sitam.tamaulipas.gob.mx/aptranotificaciones/calendario';
    let _res: any;
    await fetch(url).then(function(response) {
      return response.json();
    }).then(data => {
      // console.log(data.foto);
      _res = data;
    }).catch(function(err) {
      _res = [];
      console.log('Fetch Error :-S', err);
    });
    return _res;
  }

  async func_doRegistro(datos: any) {
    let _elRes: any;
    let _theUrl = 'https://sitam.tamaulipas.gob.mx/aptranotificaciones/registrar';
    try {
      _elRes = await axios.post(_theUrl, {
        email: "genaro.sarno@tamaulipas.gob.mx",
        password: "laroca88",
        NumEmpleado: "43623",
        rfc: "SASG910725H78",
        curp: "SASG910725HTSRRN02",
      }).then(response => response.data)
      .then((data) => {
        return data;
      })
      return _elRes;
    } catch (error) {
      _elRes = 'error';
      return _elRes;
    }
  }

  async func_validaCodigo(id: any, codigo: any) {
    let _elRes: any;
    let _theUrl = 'https://sitam.tamaulipas.gob.mx/aptranotificaciones/verificarCodigo';
    try {
      _elRes = await axios.post(_theUrl, {
        id: id,
        codigo: codigo,
      }).then(response => response.data)
      .then((data) => {
        return data;
      })
      return _elRes;
    } catch (error) {
      _elRes = 'error';
      return _elRes;
    }
  }

  async func_doLogin(email: any, password: any) {
    let _elRes: any;
    let _theUrl = 'https://sitam.tamaulipas.gob.mx/aptranotificaciones/loginAptra';
    try {
      _elRes = await axios.post(_theUrl, {
        email: email,
        password: password,
      }).then(response => response.data)
      .then((data) => {
        console.log('RESPONSE DE LOGIN:', data)
        return data;
      })
      return _elRes;
    } catch (error) {
      _elRes = 'error';
      return _elRes;
    }

    // this.navCtrl.navigateRoot('tabs').then(msg => {
    //   this.menuCtrl.enable(true);
    //   this.menuCtrl.swipeGesture(true);
    // });
  }

  async func_NoAxios_doLogin(email: any, password: any) {
    let _elRes: any;
    try {
      _elRes =  await fetch("https://sitam.tamaulipas.gob.mx/aptranotificaciones/loginAptra", {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    .then( (msg) => { 
      console.log(msg)
    });
      return _elRes;
    } catch (error) {
      _elRes = 'error';
      return _elRes;
    }

    
  }

  async func_reenviarCodigo(idUser: any) {
    let _elRes: any;
    let _theUrl = 'https://sitam.tamaulipas.gob.mx/aptranotificaciones/resetVerificacion';
    try {
      _elRes = await axios.post(_theUrl, {
        id_usuario: idUser,
      }).then(response => response.data)
      .then(async (data) => {
        // console.log('RESPONSE DE reenviacion:', data);
        const toast = await this.toastCtrl.create({
          message: '¡Se ha enviado el código nuevamente!',
          duration: 5000,
          position: 'top'
        });
    
        await toast.present();
        return data;
      })
      return _elRes;
    } catch (error) {
      _elRes = 'error';
      return _elRes;
    }
  }

  async func_doLogOut() {
    this.menuCtrl.close().then(msg => {
      console.log('imma wreck this shit');
      this.navCtrl.navigateRoot('');
      this.menuCtrl.enable(false);
      this.menuCtrl.swipeGesture(false);
    })
  }

  async alertThis(title: any, msg: any) {
    const alert = await this.alertCtrl.create({
      header: title,
      message: msg,
      buttons: ['Aceptar'],
    });

    await alert.present();
  }
}
