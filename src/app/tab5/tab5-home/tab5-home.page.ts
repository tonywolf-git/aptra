import { Component, OnInit } from '@angular/core';
import { RecServiceService } from 'src/app/rec-service.service';
import moment from 'moment';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab5-home',
  templateUrl: './tab5-home.page.html',
  styleUrls: ['./tab5-home.page.scss'],
})
export class Tab5HomePage implements OnInit {

  constructor(public recService: RecServiceService,
    public navCtrl: NavController) { }

  correos = [];
  correosFiltro = [];

  show = 50;

  async ngOnInit() {
    if (Object.keys(this.recService.userInfo.permisos).length != 0) {
      this.correos = await this.recService.func_getCorreos();
      // console.log(this.correos);
      this.correosFiltro = this.correos.slice();
    } else {
      console.error('No tiene permisos');
      // this.errorPermisos();
    }
  }

  async func_refresh(event:any) {
    if (Object.keys(this.recService.userInfo.permisos).length != 0) {
      this.correos = await this.recService.func_getCorreos();
      this.correosFiltro = this.correos.slice();
      event.target.complete();
    } else {
      console.error('No tiene permisos');
      // this.errorPermisos();
      event.target.complete();
    }
  }

  func_onSearchTerm(ev:any) {
    this.correosFiltro = this.correos.slice();
    const val = ev.detail.value;
    if (val.length >= 4) {
    this.correosFiltro = this.correos;
      if (val.trim() !== '') {
        this.correosFiltro = this.correosFiltro.filter((term:any) => {
          return term["documento"]["nombrefirmante"].toLowerCase().indexOf(val.trim().toLowerCase()) > -1;
        });
      }
    }
    // console.log(this.correosFiltro)
  }

  func_getLetra(nombre:any) {
    return nombre[0];
  }

  func_convertDate(str:any) {
    if (str != "") {
      return moment(str, 'DD MMMM YYYY').format("DD MMMM");
    } else {
      return 'Sin Fecha'
    }
  }

  func_goCorreo(correo:any) {
    this.recService.selectedCorreo = correo;
    // this.navCtrl.navigateForward('tabs/tab5/correo')
    this.navCtrl.navigateForward('tab5-correo')
  }

  func_cargarMas() {
    this.show = this.show + 10;
  }

  func_loadData(event:any) {
    setTimeout(() => {
      event.target.complete();

      this.func_cargarMas();
      if (this.show == this.correosFiltro.length) {
        event.target.disabled = true;
      }
    }, 500);
  }
}