import { Component, OnInit } from '@angular/core';
import { RecServiceService } from 'src/app/rec-service.service';
import { LoadingController, NavController, Platform, ToastController } from '@ionic/angular';
import moment from 'moment';
import jquery from 'jquery';
import { Http } from '@capacitor-community/http';


@Component({
  selector: 'app-tab5-bitacora',
  templateUrl: './tab5-bitacora.page.html',
  styleUrls: ['./tab5-bitacora.page.scss'],
})
export class Tab5BitacoraPage implements OnInit {

  constructor(public recService: RecServiceService,
    public platform: Platform,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController) { }

  correo: any;
  bitacora: any;
  selectedFile: any;
  contenido = '';
  data = {
    anexoBitacora: "",
    envio: '',            //59cw4389ry9834tooo
    contenido: '',        //TEXTAREA
    fecha: '',            //18 Mayo 2020
    hora: '',             //4:49 PM
    usuario: ''           //ID de Usuario?
  };

  isiOS = false;

  ngOnInit() {
    this.correo = this.recService['selectedCorreo'];
    this.bitacora = this.correo.bitacora;

    this.isiOS = this.platform.platforms().includes("ios");
  }
  
  func_toProperCase(str:any) {
    return str.replace(/\w\S*/g, function(txt:any){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  };


  async func_toast_bitacoraOK() {
    const toast = await this.toastCtrl.create({
      message: 'Bitácora actualizada con éxito..',
      duration: 2000
    });
    toast.present();
  }

  async func_toast_bitacoraError() {
    const toast = await this.toastCtrl.create({
      message: 'Hubo un error al actualizar, intenta más tarde.',
      duration: 2000
    });
    toast.present();
  }

  quitaTags(texto:any) {
    if (texto != undefined) {
      // console.log(texto)
      let newText = '';
      newText = texto.replace(/(<([^>]+)>)/gi, "");
      return newText
    } else {
      return 'No hay descripción.'
    }
  }

  func_convertDate(str:any) {
    if (str === undefined) {
      return 'Sin Fecha'
    } else {
      if (str != "" || str != undefined) {
        return moment(str, 'DD MMMM YYYY').format("DD [de] MMMM, YYYY");
      } else {
        return 'Sin Fecha'
      }
    }
  }

  async agregarBitacora() {
    let _elRes: any
    this.data = {
      anexoBitacora: "",
      envio: '',
      contenido: '',
      fecha: '',
      hora: '',
      usuario: ''
    };

    this.data.envio = this.correo._id;
    this.data.contenido = this.contenido;
    this.data.fecha = this.func_toProperCase(moment().format('DD MMMM YYYY'));
    this.data.hora = moment().format('hh[:]mm A');
    this.data.usuario = this.recService["userInfo"]["_id"];

    var form = jquery('#form')[0] as HTMLFormElement;
    var formData= new FormData(form);

    formData.append('anexoBitacora', this.data.anexoBitacora);
    formData.append('envio', this.data.envio);
    formData.append('contenido', this.data.contenido);
    formData.append('fecha', this.data.fecha);
    formData.append('hora', this.data.hora);
    formData.append('usuario', this.data.usuario);

    const loading = await this.loadingCtrl.create({
      message: 'Agregando a la bitácora...',
    });
    await loading.present();

    const options = {
      url: this.recService.postbitacora,
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data', 'access-token': this.recService["activeToken"] },
    };

    // formData.forEach((value,key) => {
    //   console.log(key+" "+value)
    // });

    try {
      _elRes = await Http.post(options).then(data => {
        if (data.data.exito == true) {        
          this.recService.selectedCorreo = data.data.envio;
          this.correo = this.recService.selectedCorreo;
          this.bitacora = this.correo.bitacora;
          this.contenido = '';
          loading.dismiss();
          this.func_toast_bitacoraOK();
        } else {
          loading.dismiss();
          this.func_toast_bitacoraError();
        }
        loading.dismiss();
      })
      return _elRes;
    } catch (error) {
      console.error(error);
      loading.dismiss();
      this.func_toast_bitacoraError();
      return _elRes;
    }
  }

  goBack() {
    this.navCtrl.back();
  }
}