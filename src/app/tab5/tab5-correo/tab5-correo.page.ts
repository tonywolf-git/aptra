import { Component, OnInit } from '@angular/core';
import { RecServiceService } from 'src/app/rec-service.service';
import moment from 'moment';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab5-correo',
  templateUrl: './tab5-correo.page.html',
  styleUrls: ['./tab5-correo.page.scss'],
})
export class Tab5CorreoPage implements OnInit {

  constructor(public recService: RecServiceService,
    public navCtrl: NavController) { }

  correo: any;
  correo_recibidoPor = '';

  ngOnInit() {
    console.log(this.recService.selectedCorreo)
    this.correo = this.recService.selectedCorreo;
    if (this.correo["recibidoPor"]) {
      this.correo_recibidoPor = JSON.parse(this.correo["recibidoPor"])["nombre"];
    } else {
      this.correo_recibidoPor = '"NO DISPONIBLE"';
    }
    console.log(this.recService.userInfo['permisos']['barrido'])
  }
  
  func_convertDate(str:any) {
    if (str != "") {
      return moment(str, 'DD MMMM YYYY').format("DD [de] MMMM, YYYY");
    } else {
      return 'Sin Fecha'
    }
  }

  func_convertDateRecepcion(str:any, strIni:any) {
    if (str != "" ) {
      if (str == undefined) {
        return moment.utc(strIni, 'DD MMMM YYYY').format("DD [de] MMMM");
      } else {
        return moment.utc(str).format("DD [de] MMMM, [a las] LT") + ' horas';
      }
    } else {
      return 'Sin Fecha'
    }
  }

  func_getPermiso(tipo:any) {
    switch (tipo) {
      case 'turnar':
        if (this.recService.userInfo['permisos']['barrido'].includes("permisorecepcionar")) {
          return true;
        } else {
          return false;
        }
      default:
        return false;
    }
  }

  func_abrirAnexo(anexo:any) {
    console.log(anexo);
    window.open(anexo, '_blank');
  }

  getLetra(nombre:any) {
    return nombre[0];
  }

  func_goBack() {
    this.navCtrl.back();
  }

  func_goBitacora() {
    this.navCtrl.navigateForward('tab5-correo-bitacora');
    // this.navCtrl.navigateForward('tabs/tab5/correo/bitacora');
  }

  func_goTurnado() {
    this.navCtrl.navigateForward('tab5-correo-turnado');
    // this.navCtrl.navigateForward('tabs/tab5/correo/turnado');
  }
}