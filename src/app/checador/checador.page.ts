import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import moment from 'moment';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-checador',
  templateUrl: './checador.page.html',
  styleUrls: ['./checador.page.scss'],
})
export class ChecadorPage implements OnInit {

  constructor(public mainService: MainService,
    public navCtrl: NavController) { }

  checadorDate: any;

  dependencias = [
    "Palacio de Gobierno",
    "Edificio Miguel Alemán",
    "Torre Gubernamental",
    "Tiempo Nuevo",
    "17 Allende",
    "Dirección del Trabajo",
    "Edificio Lic. Rodolfo Resendez",
    "El Peñón",
    "Dirección de Catastro",
    "Secretaría de Desarrollo Rural y Pesca",
    "Dirección General de Pesca y Acuacultura",
    "Dirección de Patrimonio",
    "Secretaría de Obras Públicas y Desarrollo Urbano",
    "Unidad Deportiva Siglo XXI",
    "Edificio de Registro Civil",
    "Edificio de Oficina Fiscal",
    "Edificio del Supremo Tribunal",
    "Torre Bicentenario",
    "Transporte",
    "Centro Cívico",
    "Edificio de Conservación de Caminos",
    "Laboratorio Ambiental"
  ]

  ngOnInit() {
    const datetime = document.querySelector('ion-datetime')!;
    datetime.isDateEnabled = (dateString) => {
      const date = new Date(dateString);
      const utcDay = date.getUTCDay();

      /**
       * Date will be enabled if it is not
       * Sunday or Saturday
       */
      return utcDay !== 0 && utcDay !== 6;
    };
    this.dependencias = this.dependencias.sort();
  }

  func_checadorDateChanged(_event: any) {
    let _fecha = _event["detail"]["value"];
    let _fechaMoment = moment(_fecha).format('YYYY-MM-DD');
    this.checadorDate = _fechaMoment;
  }

  func_checadorDateHumanizer(_fecha:any) {
    return moment(_fecha).format('DD [de] MMMM [de] YYYY');
  }

  async func_postChecador() {
    if (this.checadorDate == undefined || this.checadorDate == null) {
      this.checadorDate = moment().format('YYYY-MM-DD');
    }
    
    let _Res = await this.mainService.func_doRAL(this.checadorDate);

    if (_Res['status'] == 200) {

      if (_Res['data']['success'] == false) {
        this.mainService.alertThis(_Res['data']['title'], _Res['data']['message'])
      } else {
        this.mainService.checador_passed_data = _Res['data']
        this.navCtrl.navigateForward('checador-desc');
      }
    } else {
      this.mainService.alertThis('Aviso Importante', 'En este momento no se puede realizar la consulta, intenta de nuevo más tarde.')
    }
  }
}