import { Injectable } from '@angular/core';
import { Http } from '@capacitor-community/http';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class RecServiceService {

  constructor(public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public toastCtrl: ToastController) { }

  recURLS = {
    auth: ''
  }

  selectedCorreo: any;

  pruebas = 'https://testrec.tamaulipas.gob.mx/api/';
  prod = 'https://rec.tamaulipas.gob.mx/api/';
  apiurl = this.prod; // EL ACTIVO

  activeToken: any;

  autenticar = this.apiurl + 'autenticar';
  datos = this.apiurl + 'datos';
  login = this.apiurl + 'login';
  correo = this.apiurl + 'documentos';
  postbitacora = this.apiurl + 'agregarbitacora';
  areas = this.apiurl + 'areasTurnar';
  turnar = this.apiurl + 'turnar';
  registro = this.apiurl + 'registrarUsuario';

  responseDump = '';

  // userInfo = {
  //   permisos: {
  //     barrido:[]
  //   }, _id: ''};
  userInfo: any;

  async func_doAuth() {
    let _elRes: any;
    let _elReturn: boolean;
    let _theUrl = this.autenticar;
    const loading = await this.loadingCtrl.create({
      message: 'Confirmando estado de AUTH...',
    });

    loading.present();

    const options = {
      url: _theUrl,
      data: { username: 'recapp', password: '9umLNDPy9mW4GR*k' },
      headers: { 'Content-Type': 'application/json' },
    };
    try {
      _elRes = await Http.post(options).then(data => {
        if (data.data.token) { //TOKEN ES VALIDO
          // console.log(data.data.token)
          this.activeToken = data.data.token;
          _elReturn = true;
        } else { //TOKEN NO ES VALIDO
          _elReturn = false;
        }
        loading.dismiss();
        return data.data;
      })
      return _elRes;
    } catch (error) {
      _elRes = 'error';
      // console.log(error)
      loading.dismiss();
      return _elRes;
    }
  }

  async func_doLogin(user:any) {
    // console.log(user);
    let _elRes: any;
    let _elReturn: boolean;
    let _theUrl = this.login;

    const loading = await this.loadingCtrl.create({
      message: 'Iniciando sesión...',
    });
    await loading.present();

    const options = {
      url: _theUrl,
      data: { username: user.username, password: user.pass },
      headers: { 'Content-Type': 'application/json', 'access-token': this.activeToken },
    };

    try {
      _elRes = await Http.post(options).then(data => {
        // console.log(data.data);
        this.responseDump = JSON.stringify(data);
        if (data.data.exito == true) {
          this.userInfo = data.data.user;
          localStorage.setItem('userREC', JSON.stringify(this.userInfo));
          this.loadingCtrl.dismiss();
          this.navCtrl.navigateForward('tab5/tab5-home'); /// CAMBIA ESTO A NAVIGATE ROOT, AHORITA ESTÁ DE PRUEBA, PEDAZO DE ANIMAL ///
        } else {
          this.loadingCtrl.dismiss();
          alert('Datos incorrectos.');
        }
        loading.dismiss();
        return data.data;
      })
      return _elRes;
    } catch (error) {
      console.warn(error);
      this.responseDump = JSON.stringify(error);
      loading.dismiss();
      alert('Hubo un error, intenta más tarde.');
      return _elRes;
    }
  }

  async func_getCorreos() {
    let _elRes: any;
    let _elReturn: boolean;
    
    const loading = await this.loadingCtrl.create({
      message: 'Obteniendo documentos...',
    });
    await loading.present();

    const options = {
      url: this.correo,
      data: { permisos: this.userInfo.permisos },
      headers: { 'Content-Type': 'application/json', 'access-token': this.activeToken },
    };

    try {
      _elRes = await Http.post(options).then(data => {
        if (data.data.documentos) {
          // this.toast_correoOK();
          console.log('correos bien')
        } else {
          // this.toast_correoError();
          console.log('correos mal')
        }
        loading.dismiss();
        return this.func_orderDocumentos(data.data["documentos"]);
      })
      return _elRes;
    } catch (error) {
      console.warn(error);
      loading.dismiss();
      // this.toast_correoError();
      console.warn('Hubo un error, intenta más tarde.');
      return _elRes;
    }
  }

  async func_orderDocumentos(docs:any) {
    docs.sort(function(a:any,b:any){
      return Number(new Date(moment(b.fechaRecepcion, 'DD MMMM YYYY').format("MM/DD/YYYY"))) - Number(new Date(moment(a.fechaRecepcion, 'DD MMMM YYYY').format("MM/DD/YYYY")));
    });

    return docs;
  }

  async func_toast_correoOK() {
    const toast = await this.toastCtrl.create({
      message: 'Documentos cargados exitosamente.',
      duration: 2000
    });
    toast.present();
  }

  async func_toast_correoError() {
    const toast = await this.toastCtrl.create({
      message: 'Hubo un error al cargar los documentos, intenta más tarde.',
      duration: 2000
    });
    toast.present();
  }
}
