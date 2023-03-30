import { Injectable } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(public navCtrl: NavController,
    public menuCtrl: MenuController) { }

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

  async func_doRegistro() {
    let _theUrl = 'https://sitam.tamaulipas.gob.mx/aptranotificaciones/registrar';
    axios.post(_theUrl, {
      email: "hector.vargas@tamaulipas.gob.mx",
      password: ".hector.vargas.",
      NumEmpleado: "47553",
      rfc: "VAAH8903163I4",
      curp: "VAAH890316HTSRCC09",
    }).then(response => response.data)
    .then((data) => {
      console.log(data);
     })
  }

  async func_doLogin() {
    this.navCtrl.navigateRoot('tabs').then(msg => {
      this.menuCtrl.enable(true);
      this.menuCtrl.swipeGesture(true);
    });
  }

  async func_doLogOut() {
    this.menuCtrl.close().then(msg => {
      console.log('imma wreck this shit');
      this.navCtrl.navigateRoot('');
      this.menuCtrl.enable(false);
      this.menuCtrl.swipeGesture(false);
    })
  }
}
