import { Injectable } from '@angular/core';
import { AlertController, LoadingController, MenuController, NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import axios from 'axios';
import { Http } from '@capacitor-community/http';


@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(public navCtrl: NavController,
    public menuCtrl: MenuController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public loadCtrl: LoadingController) { }

  userCurp = '';

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

  // url_GET_recursos_humanos = "https://sitam.tamaulipas.gob.mx/api/obtenEmpleadoCURP/";
  url_GET_recursos_humanos = "https://sitam.tamaulipas.gob.mx/api/obtenEmpleadoCURP/" + this.userCurp;

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

  async getSemana() {
    let url = 'https://sitam.tamaulipas.gob.mx/aptranotificaciones/calendario';
    let _res: any;
    await fetch(url).then(function(response) {
      return response.json();
    }).then(data => {
      console.log(data.reverse());
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
    const loading = await this.loadCtrl.create({
      message: 'Confirmando datos...',
    });

    loading.present();

    const options = {
      url: _theUrl,
      data: {
        "email": datos.correo,
        "password": datos.pass,
        "NumEmpleado": datos.numEmpleado,
        "rfc": datos.rfc,
        "curp": datos.curp,
      },
      headers: { 'Content-Type': 'application/json' },
    };

    console.log(options)

    try {
      // await Http.post(options)
      _elRes = await Http.post(options).then(data => {
        console.log(JSON.parse(data.data))
        loading.dismiss();
        return JSON.parse(data.data);
      })
      return _elRes;
    } catch (error) {
      console.log(error),
      _elRes = 'error';
      loading.dismiss();
      return _elRes;
    }
  }

  async func_validaCodigo(id: any, codigo: any) {
    let _elRes: any;
    let _theUrl = 'https://sitam.tamaulipas.gob.mx/aptranotificaciones/verificarCodigo';

    const loading = await this.loadCtrl.create({
      message: 'Validando código...',
    });

    loading.present();

    const options = {
      url: _theUrl,
      data: {
        id: id,
        codigo: codigo,
      },
      headers: { 'Content-Type': 'application/json' },
    };

    try {
      _elRes = await Http.post(options).then(response => response.data)
      .then((data) => {
        loading.dismiss();
        return JSON.parse(data);
      })
      return JSON.parse(_elRes);
    } catch (error) {
      loading.dismiss();
      _elRes = 'error';
      return _elRes;
    }
  }

  async func_doLogin(email: any, password: any) {
    let _elRes: any;
    let _theUrl = 'https://sitam.tamaulipas.gob.mx/aptranotificaciones/loginAptra';
    const loading = await this.loadCtrl.create({
      message: 'Iniciando sesión...',
    });
    loading.present();

    const options = {
      url: _theUrl,
      data: {
        email: email,
        password: password,
      },
      headers: { 'Content-Type': 'application/json' },
    };

    try {
      _elRes = await Http.post(options).then(response => response.data)
      .then((data) => {
        data = JSON.parse(data)
        console.log('RESPONSE DE LOGIN:', data);
        loading.dismiss();
        return data;
      })
      return _elRes;
    } catch (error) {
      loading.dismiss();
      _elRes = 'error';
      return _elRes;
    }
  }

  async func_reenviarCodigo(idUser: any) {
    let _elRes: any;
    let _theUrl = 'https://sitam.tamaulipas.gob.mx/aptranotificaciones/resetVerificacion';

    const loading = await this.loadCtrl.create({
      message: 'Reenviando código...',
    });

    loading.present();
    
    const options = {
      url: _theUrl,
      data: {
        id_usuario: idUser,
      },
      headers: { 'Content-Type': 'application/json' },
    };

    try {
      _elRes = await Http.post(options).then(response => response.data)
      .then(async (data) => {
        // console.log('RESPONSE DE reenviacion:', data);
        loading.dismiss();

        const toast = await this.toastCtrl.create({
          message: '¡Se ha enviado el código nuevamente!',
          duration: 5000,
          position: 'top'
        });

        await toast.present();
        return JSON.parse(data);
      })
      loading.dismiss();
      return JSON.parse(_elRes);
    } catch (error) {
      _elRes = 'error';
      return _elRes;
    }
  }

  async func_doLogOut() {
    this.menuCtrl.close().then(msg => {
      this.credencialInfo = {
        laFoto: "",
        elNumEmpleado: 1007,
        laDependencia: "",
        elPuesto: "",
        elNombre: "",
        elCURP: "",
        elAlergia: '',
        elTipoSangre: '',
      };
      this.navCtrl.navigateRoot('');
      localStorage.removeItem('userCurp');
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

  setCURP() {
    localStorage.setItem('userCurp', "SASG910725HTSRRN02");
  }
















  /// OLD FUNCTIONS INI
  async OLD_func_doLogin(email: any, password: any) {
    let _elRes: any;
    let _theUrl = 'https://sitam.tamaulipas.gob.mx/aptranotificaciones/loginAptra';
    const loading = await this.loadCtrl.create({
      message: 'Iniciando sesión...',
    });

    loading.present();
    try {
      _elRes = await axios.post(_theUrl, {
        email: email,
        password: password,
      }).then(response => response.data)
      .then((data) => {
        console.log('RESPONSE DE LOGIN:', data);
        loading.dismiss();
        return data;
      })
      return _elRes;
    } catch (error) {
      loading.dismiss();
      _elRes = 'error';
      return _elRes;
    }
  }

  async OLD_func_reenviarCodigo(idUser: any) {
    let _elRes: any;
    let _theUrl = 'https://sitam.tamaulipas.gob.mx/aptranotificaciones/resetVerificacion';

    const loading = await this.loadCtrl.create({
      message: 'Reenviando código...',
    });

    loading.present();

    try {
      _elRes = await axios.post(_theUrl, {
        id_usuario: idUser,
      }).then(response => response.data)
      .then(async (data) => {
        // console.log('RESPONSE DE reenviacion:', data);
        loading.dismiss();

        const toast = await this.toastCtrl.create({
          message: '¡Se ha enviado el código nuevamente!',
          duration: 5000,
          position: 'top'
        });

    
        await toast.present();
        return data;
      })
      loading.dismiss();
      return _elRes;
    } catch (error) {
      _elRes = 'error';
      return _elRes;
    }
  }

  async OLD_func_validaCodigo(id: any, codigo: any) {
    let _elRes: any;
    let _theUrl = 'https://sitam.tamaulipas.gob.mx/aptranotificaciones/verificarCodigo';

    const loading = await this.loadCtrl.create({
      message: 'Validando código...',
    });

    loading.present();

    try {
      _elRes = await axios.post(_theUrl, {
        id: id,
        codigo: codigo,
      }).then(response => response.data)
      .then((data) => {
        loading.dismiss();
        return data;
      })
      return _elRes;
    } catch (error) {
      loading.dismiss();
      _elRes = 'error';
      return _elRes;
    }
  }

  async OLD_func_doRegistro(datos: any) {
    let _elRes: any;
    let _theUrl = 'https://sitam.tamaulipas.gob.mx/aptranotificaciones/registrar';
    const loading = await this.loadCtrl.create({
      message: 'Confirmando datos...',
    });

    loading.present();
    try {
      _elRes = await axios.post(_theUrl, {
        // email: "genaro.sarno@tamaulipas.gob.mx",
        // password: "laroca88",
        // NumEmpleado: "43623",
        // rfc: "SASG910725H78",
        // curp: "SASG910725HTSRRN02",
        email: datos['correo'],
        password: datos['pass'],
        NumEmpleado: datos['numEmpleado'],
        rfc: datos['rfc'],
        curp: datos['curp'],
      }).then(response => response.data)
      .then((data) => {
        loading.dismiss();
        return data;
      })
      return _elRes;
    } catch (error) {
      _elRes = 'error';
      loading.dismiss();
      return _elRes;
    }
  }
  /// OLD FUNCTIONS END
}
