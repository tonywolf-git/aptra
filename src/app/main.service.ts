import { Injectable } from '@angular/core';
import { AlertController, LoadingController, MenuController, NavController, Platform } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import axios from 'axios';
import { Http } from '@capacitor-community/http';
import { FCM } from "@capacitor-community/fcm";
import moment from 'moment';

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
    ios: 37,
    android: 37
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

  url_GET_recursos_humanos = "https://sitam.tamaulipas.gob.mx/api/obtenEmpleadoCURP/";
  // url_GET_recursos_humanos = "https://testsitam.tamaulipas.gob.mx/api/obtenEmpleadoCURP/" + this.userCurp;
  // url_GET_recursos_humanos = "https://testsitam.tamaulipas.gob.mx/api/obtenEmpleadoCURP/ROHF780714HTSCRR03";
  url_LOGIN_qr = "";

  url_POST_existeTelefono = "https://sitam.tamaulipas.gob.mx/aptranotificaciones/ExisteTelefono";
  url_POST_agregaTelefono = "https://sitam.tamaulipas.gob.mx/aptranotificaciones/AgregarTelefono";

  avisos_selected_aviso: any = [];

  checador_passed_data: any = [];

  service_efemerides: any = [];
  serive_selected_efemeride: any = [];

  service_bool_telefono = true;

  async func_get(url: string) {
    let _res: any;
    await fetch(url).then(function(response) {
      // console.log(response);
      return response.json();
    }).then(data => {
      // console.log(data);
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

        // console.log('empleadonumbercoosa - ', _res.res.datDatosGenerales.DatosGenerales[0].NumeroEmpleado);

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

  async func_get_efemerides() {
    let url = 'https://sitam.tamaulipas.gob.mx/aptranotificaciones/efemerides';
    let _res: any;
    await fetch(url).then(function(response) {
      return response.json();
    }).then(data => {
      let _elRes = [
        {
          titulo: 'Papa Benedicto XVI confirmado como nueva especie de Dilofosaurio.',
          fecha: '2023-10-18' /*CON FORMATO "Viernes, 28 Octubre 2023",*/,
          img_url: 'https://desdelafe.mx/wp-content/uploads/2020/08/benedicto-xvi-2.jpg',
          donde: 'Secretaria de Administración',
          content: 'loremipsum'
        },
        {
          titulo: 'Papa Benedicto XVI confirmado como nueva especie de Dilofosaurio.',
          fecha: '2023-10-19' /*CON FORMATO "Viernes, 28 Octubre 2023",*/,
          img_url: 'https://th.bing.com/th/id/OIP.5PcM8rxiGjkVVOcqGPqxEwAAAA?pid=ImgDet&rs=1',
          donde: 'Secretaria de Administración',
          content: 'loremipsum'
        },
        {
          titulo: 'Papa Benedicto XVI confirmado como nueva especie de Dilofosaurio.',
          fecha: '2023-10-26' /*CON FORMATO "Viernes, 28 Octubre 2023",*/,
          img_url: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/0a1ce236075791.570e573f9448f.jpg',
          donde: 'Secretaria de Administración',
          content: 'loremipsum'
        },
        {
          titulo: 'Papa Benedicto XVI confirmado como nueva especie de Dilofosaurio.',
          fecha: '2023-10-28' /*CON FORMATO "Viernes, 28 Octubre 2023",*/,
          img_url: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/11b9f177439649.5c87cde115093.jpg',
          donde: 'Secretaria de Administración',
          content: 'loremipsum'
        },
        {
          titulo: 'HALLOWEEN',
          fecha: '2023-10-31' /*CON FORMATO "Viernes, 28 Octubre 2023",*/,
          img_url: 'https://i.pinimg.com/originals/25/d8/e9/25d8e9f5390d4e1e58cb578b2cba6110.jpg',
          donde: 'Secretaria de Administración',
          content: 'loremipsum'
        },
        {
          titulo: 'Papa Benedicto XVI confirmado como nueva especie de Dilofosaurio.',
          fecha: '2023-11-02' /*CON FORMATO "Viernes, 28 Octubre 2023",*/,
          img_url: 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/cf47bb107493989.5fa8bc50129a5.jpg',
          donde: 'Secretaria de Administración',
          content: 'loremipsum'
        },
        {
          titulo: '"Los sombreritos de Raiden ya no son cool". Afirma granjero de arroz en el bello Nippon.',
          fecha: '2023-11-03' /*CON FORMATO "Viernes, 28 Octubre 2023",*/,
          img_url: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/7dea4d95203801.5eef583a8640c.jpg',
          donde: 'Secretaria de Administración',
          content: 'loremipsum'
        },
        {
          titulo: 'Baracka Obama se clona y se premia por haber sido el primer Ex-Presidente en clonarse y darse una ceremonia para el mismo.',
          fecha: '2023-11-06' /*CON FORMATO "Viernes, 28 Octubre 2023",*/,
          img_url: 'https://th.bing.com/th/id/R.15ac900ff15a07e91cbadf9f4113d405?rik=2%2bKAAgKiBEIkNA&pid=ImgRaw&r=0',
          donde: 'Secretaria de Administración',
          content: 'loremipsum'
        },
        {
          titulo: 'Una china koreana cantó, no se sabe quien es, pero testigos afirman que canta feo.',
          fecha: '2023-11-11' /*CON FORMATO "Viernes, 28 Octubre 2023",*/,
          img_url: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/8aa74052645961.591bf6e593ed3.jpg',
          donde: 'Secretaria de Administración',
          content: 'loremipsum'
        },
        {
          titulo: 'Hoy no tenemos nada que recordar, pero encontramos una imagen de lo que parecen ser iPods Nano™.',
          fecha: '2023-11-18' /*CON FORMATO "Viernes, 28 Octubre 2023",*/,
          img_url: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/0a47da11401269.560317ee8cfd0.jpg',
          donde: 'Secretaria de Administración',
          content: 'loremipsum'
        },
        {
          titulo: 'Hoy recomendamos: No usar tachuelas en tu calendario, porque los dias de los posteriores meses se van a ver feo.',
          fecha: '2023-11-19' /*CON FORMATO "Viernes, 28 Octubre 2023",*/,
          img_url: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/b425f953251691.592dc987b9a00.jpg',
          donde: 'Secretaria de Administración',
          content: 'loremipsum'
        },
        {
          titulo: 'El día de hoy recordemos como hace millones de años se inventaron las parrilladas, en ese tiempo llamadas "dinollamaradas".',
          fecha: '2023-11-22' /*CON FORMATO "Viernes, 28 Octubre 2023",*/,
          img_url: 'https://www.thoughtco.com/thmb/MpSuCpt-jLtfIsH34H138Tlq2Vg=/5957x3971/filters:fill(auto,1)/fun-colourful-toy-dinosaurs-conceptual-scene---bbq-meat-eaters-1039964660-5c8ffdafc9e77c0001eb1c9a.jpg',
          donde: 'Secretaria de Administración',
          content: 'loremipsum'
        },
        {
          titulo: 'Gaspar Noé está perdido y nadie recuerda quien es (Nosotros tampoco).',
          fecha: '2023-11-25' /*CON FORMATO "Viernes, 28 Octubre 2023",*/,
          img_url: 'https://mir-s3-cdn-cf.behance.net/project_modules/fs/5a9f7f83957261.5d4c487697d7d.png',
          donde: 'Secretaria de Administración',
          content: 'loremipsum'
        },
        {
          titulo: 'En este día, Shrek presenta un dolor testicular, haciendo enfasis en la condición "Torsión Testicular".',
          fecha: '2023-11-28' /*CON FORMATO "Viernes, 28 Octubre 2023",*/,
          img_url: 'https://imgix.bustle.com/rehost/2016/9/13/71d4e4ba-5d86-4570-9b42-f4dec1780614.jpg?w=1200&h=630&q=70&fit=crop&crop=faces&fm=jpg',
          donde: 'Secretaria de Administración',
          content: 'loremipsum'
        },
        {
          titulo: 'Perrito se sienta en un gato, se le presenta orden de arresto.',
          fecha: '2023-12-25' /*CON FORMATO "Viernes, 28 Octubre 2023",*/,
          img_url: 'https://i.ytimg.com/vi/1rTfv82g9a4/maxresdefault.jpg',
          donde: 'Secretaria de Administración',
          content: 'loremipsum'
        },
      ];

      _elRes = [];

      for (let i = 0; i < data.length; i++) {
        _elRes.push({
          titulo: data[i]['nombre'],
          fecha: data[i]['fecha'],
          img_url: data[i]['imagen'],
          donde: 'Secretaria de Administración',
          content: data[i]['descripcion']
        })
      }

      this.service_efemerides = _elRes;
      return _elRes;
      // PRUEBAS END
    }).catch(function(err) {
      _res = [];
      console.log('Fetch Error :-S', err);
    });
    return _res;
  }

  func_selectEfemeride(_efemeride:any) {
    this.serive_selected_efemeride = _efemeride;
    this.func_push_to('efemerides-desc', null)
  }

  async func_doRegistro(datos: any) {
    console.log('hola, soy el registro NORMAL');
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

    try {
      _elRes = await Http.post(options).then(data => {
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
        "email": datos['celular'],
        "password": datos.pass,
        "NumEmpleado": datos.numEmpleado,
        "rfc": datos.rfc,
        "curp": datos.curp,
        "tipo_gobierno" : datos.tipo_gobierno,
        // "numero": tel[0]
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
    // console.log('ESTE ES EL LOGIN CON CORREO')
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

  async func_doLoginTel(email: any, password: any) {
    // console.log('ESTE ES EL LOGIN CON CORREO')
    let _elRes: any;
    let _theUrl = 'https://sitam.tamaulipas.gob.mx/aptranotificaciones/loginAptraTel';
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

  async func_doRAL(_fecha: any) {
    // https://sac.tamaulipas.gob.mx/api/employee/empleado/fecha/
    let _elRes: any;
    // let _theUrl = 'https://sac.tamaulipas.gob.mx/api/employee/' + this.credencialInfo["elNumEmpleado"] + '/2023-10-18';
    // let _theUrl = 'https://sac.tamaulipas.gob.mx/api/employee/' + '43623' + '/2023-10-18';
    // let _theUrl = 'https://sac.tamaulipas.gob.mx/api/employee/' + '43623' + '/' + _fecha;
    let _theUrl = 'https://sac.tamaulipas.gob.mx/api/employee/' + this.credencialInfo["elNumEmpleado"] + '/' + _fecha;


    const loading = await this.loadCtrl.create({
      message: 'Consultando datos...',
    });

    loading.present();

    const options = {
      url: _theUrl,
      headers: { 'Content-Type': 'application/json' },
    };

    try {
      _elRes = await Http.get(options).then(data => {
        // console.log(data)
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

  async func_toggleMenu() {
    this.menuCtrl.toggle();
  }

  async func_checkTelefono() {
    let _elRes: any;
    let _elReturn: any;
    
    const loading = await this.loadCtrl.create({
      message: 'Confirmando datos...',
    });

    loading.present();

    const options = {
      url: this.url_POST_existeTelefono,
      headers: { 'Content-Type': 'application/json' },
      data: {
        'curp': this.credencialInfo.elCURP
      }
    };

    try {
      _elRes = await Http.post(options).then(data => {
        if (data['data'] != undefined) {
          if (data['data'] == 'AA') {
            _elReturn = false;
          } else {
            _elReturn = true;
          }
        } else { _elReturn = 'error' }
        loading.dismiss();
        return _elReturn;
      })
      return _elRes;
    } catch (error) {
      _elRes = 'error';
      loading.dismiss();
      return _elRes;
    }
  }

  async func_agregarTelefono(_tel: any) {
    let _elRes: any;
    let _elReturn: any;
    
    const loading = await this.loadCtrl.create({
      message: 'Agregando teléfono celular...',
    });

    loading.present();

    console.log(_tel)

    const options = {
      url: this.url_POST_agregaTelefono,
      headers: { 'Content-Type': 'application/json' },
      data: {
        'curp': this.credencialInfo.elCURP,
        'numero': _tel
        // num_tel
      }
    };

    try {
      _elRes = await Http.post(options).then(data => {
        console.log(data['data'])
        loading.dismiss();
        return data['data'];
      })
    } catch {
      this.alertThis('Error', 'Hubo un error, por favor intenta nuevamente.');
    }
    console.log(_elRes)
    return _elRes;
  }

  async func_alertNoTelefono() {
    const alert = await this.alertCtrl.create({
      header: 'Aviso Importante',
      message: 'Para completar tu perfil en APTRA™ es necesario tu teléfono celular, por favor introducelo aquí:',
      backdropDismiss: false,
      cssClass: "la-plebe",
      inputs: [
        {
          type: 'tel',
          placeholder: '834 0000000',
          min: 10,
          attributes: {
            maxlength: 10,
            minlength: 10
          }
        }
      ],
      buttons: [
        {
          text: 'Aceptar',
          role: 'confirm',
          handler: async (tel) => {
            let _elTel = tel[0];

            if (_elTel.length == 10) {
              let _response = await this.func_agregarTelefono(_elTel)
              switch (_response) {
                case 'VA':
                  let toastButtons = [
                    {
                      text: 'Aceptar',
                      role: 'confirm',
                      handler: () => { /* NADA REALMENTE */ }
                    },
                  ];
  
                  const toast = await this.toasteCtrl.create({
                    message: '¡Se ha agregado tu teléfono! Puedes seguir usando APTRA™',
                    duration: 3000,
                    position: 'top',
                    buttons: toastButtons
                  });
              
                  await toast.present();
  
                  this.service_bool_telefono = true;
                  
                  break;
  
                case 'SABESCUANTAGENTETENGODETRASDEMI': // NO ENCONTRÉ EL CURP
                  this.alertThis('Aviso Importante', 'No se ha podido agregar el teléfono a la base de datos, por favor intenta mas tarde.');
                  break;
                  
                case 'error':
                  this.alertThis('Error', 'Ha ocurrido un error, por favor intente más tarde.');
                  break;
                  
                default:
                  break;
              }
              return true;
            } else {
              alert.message = 'Para completar tu perfil en APTRA™ es necesario tu teléfono celular, por favor introducelo aquí:<br><b class="plebe-error">*Por favor, introduce el teléfono correctamente.</b>'
              return false;
            }
          }
        }
      ]
    });

    alert.present();
  }

  func_convertDate(date:string, format:string) {
    let _convertedDate = moment(date, format).format('dddd[,] DD [de] MMMM [de] YYYY');
    return _convertedDate.charAt(0).toUpperCase() + _convertedDate.slice(1);
  }

  func_convertFormatDate(date:string, format:string, conversion:string) {
    let _convertedDate: any;
    switch (conversion) {
      case 'shortday':
        _convertedDate = moment(date, format).format('ddd');
        return _convertedDate.toUpperCase();

      case 'daynum':
        _convertedDate = moment(date, format).format('DD');
        return _convertedDate;
    
      default:
        break;
    }
  }

  setCURP() {
    localStorage.setItem('userCurp', "SASG910725HTSRRN02");
  }

  func_moment_getDif(fecha: any) {
    //var date1 = moment("2022-10-30");
    //var date2 = moment("2022-12-30");
    // var days = date1.diff(date2, 'days');

    let _ahorita = moment()
    let _ayeres = moment(fecha, 'YYYY-MM-DD HH:mm:SS')
    let _laDif = _ahorita.diff(_ayeres,'days');
    let _elReturn = 'hace ' + moment.duration(_ahorita.diff(_ayeres)).humanize();
    return _elReturn;
  }

  func_push_to(page:string, data:any) {
    this.navCtrl.navigateForward(page);
    
    switch (page) {
      case 'avisos-desc':
        this.avisos_selected_aviso = data;
        break;
    
      default:
        break;
    }
  }

  func_nav_go_back() {
    this.navCtrl.pop();
  }

  func_service_openURL(_url: any) {
    window.open(_url, '_blank')
  }

  async func_service_openCall(_telParam: any) {
    const alert = await this.alertCtrl.create({
      header: '¡Atención!',
      message: '¿Seguro que deseas llamar a este número?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Usuario canceló.')
          },
        },
        {
          text: 'Llamar',
          role: 'ok',
          handler: () => {
            // console.log('Usuario desea realizar llamada.', numero)
            let _tel = 'tel:' + _telParam
            window.open(_tel);
          },
        },
      ],
    });

    await alert.present();
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
