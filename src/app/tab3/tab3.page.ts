import { Component } from '@angular/core';
import { MainService } from '../main.service';
import moment from 'moment';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  constructor(public mainService: MainService) {}

  calendarioEventosPre = [];
  calendarioEventosPost: any;
  calendarDate: any;
  elPerrito = 'Holi'

  async ngOnInit() {
    this.calendarioEventosPost = [];
    this.calendarioEventosPre = await this.mainService.func_getCalendario();
    for (let x = 0; x < this.calendarioEventosPre.length; x++) {
      let _fechaConvertida = moment(this.calendarioEventosPre[x]['fecha']).format('DD').replace('.', '');
      // var randomColor = "#" + Math.floor(Math.random()*16777215).toString(16);

      // NUEVA FORMA DE DEFINIR LOS COLORES -- INI --
      // #A1193E
      // #BC936C
      console.log();
      var randomColor = '';
      if (this.calendarioEventosPre[x]['titulo'] == "Periodo Vacacional") {
        randomColor = '#A1193E';
      } else {
        randomColor = '#BC936C';
      }
      // NUEVA FORMA DE DEFINIR LOS COLORES -- END --


      this.calendarioEventosPost.push({
        title: this.calendarioEventosPre[x]['titulo'],
        date: this.calendarioEventosPre[x]['fecha'],
        fechaConvertida: _fechaConvertida,
        textColor: 'white',
        backgroundColor: randomColor,
        valido: false
      })
    }
    var datetime = document.querySelector('ion-datetime');
    datetime?.reset();

    this.filtrarEventos(moment().format('YYYY-MM-DD'));

    //OBSERVA LOS CAMBIOS DEL CALENDARIO POR MES/AÑO NO TOCAR A MENOS QUE QUIERAS PROBLEMAS --INI--
    let _elPerrito = document.querySelector('#elPerritoCalendario')?.shadowRoot;
    // let _elPerrito = document.querySelector('#elPerritoCalendario')?.shadowRoot?.querySelector('div.calendar-header')?.querySelector('div.calendar-month-year')?.querySelector('ion-label.sc-ion-label-md-h')!;
    let elObserver = new MutationObserver(async () => {
      let _elPerritoTexto = document.querySelector('#elPerritoCalendario')?.shadowRoot?.querySelector('div.calendar-header')?.querySelector('div.calendar-month-year')?.querySelector('ion-label.sc-ion-label-md-h')?.textContent;
      let _elMes = await this.calendarioGetMonth(_elPerritoTexto!).then(() => {

      });
    });
    elObserver.observe(_elPerrito!, {characterData: true, attributes: true, childList: true, subtree: true, characterDataOldValue: true})
    //OBSERVA LOS CAMBIOS DEL CALENDARIO POR MES/AÑO NO TOCAR A MENOS QUE QUIERAS PROBLEMAS --END--
  }

  filtrarEventos(_date: any) {
    for (let x = 0; x < this.calendarioEventosPost.length; x++) {
      if (moment(moment(this.calendarioEventosPost[x]['date'])).isSame(_date, 'month')) {
        this.calendarioEventosPost[x]['valido'] = true;
      } else {
        this.calendarioEventosPost[x]['valido'] = false;
      }
    }
  }

  calendarioChange(_event: any) {
    let _fecha = _event["detail"]["value"];
    let _fechaMoment = moment(_fecha).format('YYYY-MM-DD')
    // console.log(_fecha, _fechaMoment)
    this.filtrarEventos(_fechaMoment)
  }

  async calendarioGetMonth(_string: any) {
    let _elMes = _string;
    _elMes = _elMes.replaceAll(/[0-9]/g, '');
    _elMes = _elMes.replace(/de/g, "");
    _elMes = _elMes.replace(/ /g, "");

    let _elAno = _string;
    _elAno = _elAno.replaceAll(/ /g, "");
    _elAno = _elAno.replace(/[a-z]/g, '');

    switch (_elMes) {
      case 'enero':
        this.filtrarEventos(moment(_elAno + '-01-01').format('YYYY-MM-DD'))
        break;
      case 'febrero':
        this.filtrarEventos(moment(_elAno + '-02-01').format('YYYY-MM-DD'))
        break;
      case 'marzo':
        this.filtrarEventos(moment(_elAno + '-03-01').format('YYYY-MM-DD'))
        break;
      case 'abril':
        this.filtrarEventos(moment(_elAno + '-04-01').format('YYYY-MM-DD'))
        break;
      case 'mayo':
        this.filtrarEventos(moment(_elAno + '-05-01').format('YYYY-MM-DD'))
        break;
      case 'junio':
        this.filtrarEventos(moment(_elAno + '-06-01').format('YYYY-MM-DD'))
        break;
      case 'julio':
        this.filtrarEventos(moment(_elAno + '-07-01').format('YYYY-MM-DD'))
        break;
      case 'agosto':
        this.filtrarEventos(moment(_elAno + '-08-01').format('YYYY-MM-DD'))
        break;
      case 'septiembre':
        this.filtrarEventos(moment(_elAno + '-09-01').format('YYYY-MM-DD'))
        break;
      case 'octubre':
        this.filtrarEventos(moment(_elAno + '-10-01').format('YYYY-MM-DD'))
        break;
      case 'noviembre':
        this.filtrarEventos(moment(_elAno + '-11-01').format('YYYY-MM-DD'))
        break;
      case 'diciembre':
        this.filtrarEventos(moment(_elAno + '-12-01').format('YYYY-MM-DD'))
        break;
    
      default:
        break;
    }
  }
}
