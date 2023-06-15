import { Injectable } from '@angular/core';
import { AlertController, LoadingController, MenuController, NavController, Platform } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import axios from 'axios';
import { Http } from '@capacitor-community/http';
import { FCM } from "@capacitor-community/fcm";
import * as moment from 'moment';


@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(public navCtrl: NavController,
    public menuCtrl: MenuController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public loadCtrl: LoadingController,
    public platformCtrl: Platform,
    public toasteCtrl: ToastController) { }

  appVersion = {
    ios: 24,
    android: 24
  };

  serverVersion = {
    ios: 0,
    android: 0
  }

  userCurp = '';
  tipo_gobierno = 0;

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
  url_LOGIN_qr = "";

  async func_get(url: string) {
    let _res: any;
    await fetch(url).then(function(response) {
      return response.json();
    }).then(data => {
      // console.log(data.foto);
      _res = data;

      // console.log('HOLA SI ES AQUI POR FAVOR', _res.foto)

      if (this.tipo_gobierno == 1) {
        /// TIPO_GOBIERNO == 1 (GOBIERNO CENTRAL)  INI ///
        this.credencialInfo.laFoto = _res.foto;
        this.credencialInfo.laFoto = this.credencialInfo.laFoto.replace('data:image/jpg;base64,','');
        if (this.credencialInfo.laFoto[0] == "P") {
          this.credencialInfo.laFoto = 'data:image/svg+xml;base64,' + this.credencialInfo.laFoto;      
        } else {
          this.credencialInfo.laFoto = 'data:image/jpg;base64,' + this.credencialInfo.laFoto; 
        }
        this.credencialInfo.elNumEmpleado = Number(_res.res.datDatosGenerales.DatosGenerales[0].NumeroEmpleado);
        this.credencialInfo.laDependencia = _res.res.datDatosGenerales.DatosGenerales[0].Dependencia;
        this.credencialInfo.elPuesto = _res.res.datDatosGenerales.DatosGenerales[0].puesto;
        this.credencialInfo.elNombre = _res.res.datDatosGenerales.DatosGenerales[0].Nombres + ' ' + _res.res.datDatosGenerales.DatosGenerales[0].ApellidoPaterno + ' ' + _res.res.datDatosGenerales.DatosGenerales[0].ApellidoMaterno;
        this.credencialInfo.elCURP = _res.res.datDatosGenerales.DatosGenerales[0].curp;
  
        this.credencialInfo.elAlergia = _res.credencial["datos"]["alergias"];
        this.credencialInfo.elTipoSangre = _res.credencial["datos"]["tipo_sangre"];
        /// TIPO_GOBIERNO == 1 (GOBIERNO CENTRAL)  END ///
      }

      if (this.tipo_gobierno == 2) {
        // console.log(_res);
        /// TIPO_GOBIERNO == 2 (OPD)  INI ///
        // this.credencialInfo.laFoto = "https://cogumelolouco.com/wp-content/uploads/2012/07/filhote-de-golden-retriever.jpg"
        this.credencialInfo.laFoto = _res.imagen;
        // this.credencialInfo.laFoto = this.credencialInfo.laFoto.replace('data:image/jpg;base64,','');
        // if (this.credencialInfo.laFoto[0] == "P") {
        //   this.credencialInfo.laFoto = 'data:image/svg+xml;base64,' + this.credencialInfo.laFoto;      
        // } else {
        //   this.credencialInfo.laFoto = 'data:image/jpg;base64,' + this.credencialInfo.laFoto; 
        // }
        this.credencialInfo.elNumEmpleado = _res.cve_emp;
        this.credencialInfo.laDependencia = _res.secretaria
        this.credencialInfo.elPuesto = _res.puesto;
        this.credencialInfo.elNombre = _res.nombre + ' ' + _res.ape_pat + ' ' + _res.ape_mat;
        this.credencialInfo.elCURP = _res.curp;

        this.credencialInfo.elAlergia = _res.alergias;
        this.credencialInfo.elTipoSangre = _res.tipo_sangre;
        /// TIPO_GOBIERNO == 2 (OPD)  END ///
      }
    }).catch(function(err) {
      console.log('Fetch Error :-S', err);
    });
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
      // console.log(data.reverse());
      _res = data.reverse();
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
        "tipo_gobierno" : datos.tipo_gobierno
      },
      headers: { 'Content-Type': 'application/json' },
    };

    // console.log(options)

    try {
      // await Http.post(options)
      _elRes = await Http.post(options).then(data => {
        console.log(JSON.parse(data.data))
        loading.dismiss();
        return JSON.parse(data.data);
      })
      return _elRes;
    } catch (error) {
      // console.log(error),
      _elRes = 'error';
      loading.dismiss();
      return _elRes;
    }
  }

  async func_doRegistroWasa(datos: any, tel: any) {
    let _elRes: any;
    let _theUrl = 'https://sitam.tamaulipas.gob.mx/aptranotificaciones/avit';
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
        "tipo_gobierno" : datos.tipo_gobierno,
        "numero": tel[0]
      },
      headers: { 'Content-Type': 'application/json' },
    };

    try {
      // await Http.post(options)
      _elRes = await Http.post(options).then(data => {
        // console.log(JSON.parse(data.data))
        loading.dismiss();
        return JSON.parse(data.data);
      })
      return _elRes;
    } catch (error) {
      // console.log(error),
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

  async func_cambiaPass(pass:any) {
    // console.log('Si funca:', this.credencialInfo.elCURP, pass);

    let _elRes: any;
    let _theUrl = 'https://sitam.tamaulipas.gob.mx/aptranotificaciones/CambioContrasena?curp=' + this.credencialInfo.elCURP + '&password=' + pass;
    // let _theUrl = 'https://sitam.tamaulipas.gob.mx/aptranotificaciones/CambioContrasena?curp=VAAH890316HTSRCC09&password=hector89';

    const loading = await this.loadCtrl.create({
      message: 'Cambiando tu contraseña...',
    });

    loading.present();

    const options = {
      url: _theUrl,
      // data: {
      //   curp: this.credencialInfo.elCURP,
      //   password: pass,
      // },
      // headers: { 'Content-Type': 'application/json' },
    };
    try {
      _elRes = await Http.post(options).then(response => {
        // console.log(response["data"])
        if (response["data"] == 'FUNCIONO') {
          loading.dismiss();
          return true
        } else {
          loading.dismiss();
          return false
        }
      });
      loading.dismiss();
      return _elRes;
    } catch (error) {
      loading.dismiss();
      return false;
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
        // console.log('RESPONSE DE LOGIN:', data);
        loading.dismiss();

        // --- SUSCRIBIRSE AL TOPICO GENERAL INI ---
        FCM.subscribeTo({ topic: "laroca" })
        .then((r) => {
          // console.log('YA ERES PARTE DE TEST');
        }).catch((err) => console.log(err));
        return data;
      })
      // --- SUSCRIBIRSE AL TOPICO GENERAL END ---
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

  async func_reenviarCodigoW(idUser: any) {
    let _elRes: any;
    let _theUrl = 'https://sitam.tamaulipas.gob.mx/aptranotificaciones/resetVerificacionW';

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

  async func_resetPass(correo: any) {
    let _elRes: any;
    let _theUrl = 'https://sitam.tamaulipas.gob.mx/aptranotificaciones/resetContrasena';

    const loading = await this.loadCtrl.create({
      message: 'Enviando contraseña...',
    });

    loading.present();
    
    const options = {
      url: _theUrl,
      data: {
        email: correo,
      },
      headers: { 'Content-Type': 'application/json' },
    };

    try {
      _elRes = await Http.post(options).then(response => response.data)
      .then(async (data) => {
        // console.log('RESPONSE DE reenviacion:', data);
        loading.dismiss();

        // "NOEXISTE"
        // "ERROR"
        // 1

        let _msg = '';
        let _laDataParse = JSON.parse(data);

        switch (_laDataParse) {
          case 1:
            _msg = "¡Se ha enviado la contraseña!";
            break;

          case "NOEXISTE":
            _msg = "El correo electrónico no está registrado en el sistema.";
            break;

          case "ERROR":
            _msg = "Ha ocurrido un error, por favor intenta de nuevo.";
            break;
        
          default:
            break;
        }

        const toast = await this.toastCtrl.create({
          message: _msg,
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
      localStorage.removeItem('userQR');
      this.menuCtrl.enable(false);
      this.menuCtrl.swipeGesture(false);

      FCM.unsubscribeFrom({ topic: "laroca" })
      .then((r) => {
        // console.log('YA NO ERES PARTE DE TEST');
      }).catch((err) => console.log(err));
    });
  }

  async alertThis(title: any, msg: any) {
    const alert = await this.alertCtrl.create({
      header: title,
      message: msg,
      buttons: ['Aceptar'],
    });

    await alert.present();
  }

  async checkVersion() {
    let _theUrl = "https://sitam.tamaulipas.gob.mx/aptranotificaciones/versiones";
    let _storeUrl = '';

    let toastButtons = [
      {
        text: 'Actualizar',
        role: 'info',
        handler: () => {
          // console.log('More Info clicked')
          window.open(_storeUrl, '_blank')
        }
      },
    ];

    const toast = await this.toasteCtrl.create({
      message: '¡Tu aplicación no está actualizada! Descargala aquí:',
      duration: 5500,
      position: 'top',
      buttons: toastButtons
    });

    const options = {
      url: _theUrl,
      headers: { 'Content-Type': 'application/json' },
    };

    try {
      await Http.get(options).then(response => response.data)
      .then(async (data) => {
        // console.log(JSON.parse(data)[0]["version"]);
        // console.log(JSON.parse(data)[0]["version_ios"]);
        // loading.dismiss();
        this.serverVersion["android"] = JSON.parse(data)[0]["version"];
        this.serverVersion["ios"] = JSON.parse(data)[0]["version_ios"];
        return JSON.parse(data)[0];
      });
      // loading.dismiss();
    } catch (error) {
      // _elRes = 'error';
      // return _elRes;
      console.error('ERROR');
    }

    console.log("SERVER VERSION IS:", this.serverVersion)

    if (this.platformCtrl.is('android')) {
      _storeUrl = "https://play.google.com/store/apps/details?id=gob.tamaulipas.aptra&hl=es_MX";
      if (this.serverVersion["android"] > this.appVersion["android"]) {
        await toast.present();
      }
    } else {
      if (this.platformCtrl.is('ios')) {
        _storeUrl = "https://apps.apple.com/us/app/aptra/id6447215714";
        if (this.serverVersion["ios"] > this.appVersion["ios"]) {
          await toast.present();
        }
      }
    }
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
        // console.log('RESPONSE DE LOGIN:', data);
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
