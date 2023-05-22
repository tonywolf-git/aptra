import { Component } from '@angular/core';
import axios from 'axios';
import { MainService } from '../main.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(public mainService: MainService) {}

  splicePipe = true;

  avisosIsLoaded = false;
  avisosAxios: any;

  arrayAvisos = [
    {
      id: 0,
      titulo: 'MARZO MES DE LA MUJER',
      fecha: '2023-03-05',
      texto: 'Durante la gira del director del IMSS Zoé Robledo acompañado del gobernador Américo Villarreal Anaya por el nuevo hospital se analizaron acciones para el proyecto estructural de oi fwoeijf iowej fiow jegoij weoig joiwe jgoiwejgoi jwoieg joiwj egoiw jegoijwoegjowiejgoiwj egoij weiogj owej gowj eogjwoe go',
      splicePipe: false
    },
    {
      id: 1,
      titulo: 'MARZO MES DE LA MUJER (ACORTADO)',
      fecha: '2023-03-05',
      texto: 'Durante la gira del director del IMSS Zoé Robledo acompañado del gobernador Américo Villarreal Anaya',
      splicePipe: false
    },
    {
      id: 2,
      titulo: 'TRAMITA TU BECA',
      fecha: '2023-03-05',
      texto: 'A través del Servicio Nacional del Empleo, se recepcionarán las solicitudes de aspirantes STR-004-2023 Febrero 23 de 2023 Ciudad Victoria, Tamaulipas. A través del Servicio Nacional del Empleo, se recepcionarán las solicitudes de aspirantes STR-004-2023 Febrero 23 de 2023 Ciudad Victoria, Tamaulipas. A través del Servicio Nacional del Empleo, se recepcionarán las solicitudes de aspirantes STR-004-2023 Febrero 23 de 2023 Ciudad Victoria, Tamaulipas.A través del Servicio Nacional del Empleo, se recepcionarán las solicitudes de aspirantes STR-004-2023 Febrero 23 de 2023 Ciudad Victoria, Tamaulipas. A través del Servicio Nacional del Empleo, se recepcionarán las solicitudes de aspirantes STR-004-2023 Febrero 23 de 2023 Ciudad Victoria, Tamaulipas.',
      splicePipe: false
    },
    {
      id: 3,
      titulo: 'TRAMITA TU BECA (ACORTADO)',
      fecha: '2023-03-05',
      texto: 'A través del Servicio Nacional del Empleo, se recepcionarán las solicitudes de aspirantes STR-004-2023 Febrero 23 de 2023 Ciudad Victoria, Tamaulipas.',
      splicePipe: false
    },
  ];

  async ngOnInit() {
    this.func_getAvisos();
  }

  func_changeSlice(id: number) {
    this.arrayAvisos[id].splicePipe = true;
  }

  func_rmSlice(id: number) {
    this.arrayAvisos[id].splicePipe = false;
  }

  async func_getAvisos() {
    let _theUrl = 'https://sitam.tamaulipas.gob.mx/aptranotificaciones/notificaciones';
    axios.get(_theUrl).then(response => response.data)
    .then((data) => {
      this.avisosIsLoaded = true;
      // console.log(data, typeof data, data.length);
      this.avisosAxios = [];
      for (let x = 0; x < data.length; x++) {
        this.avisosAxios.push({title: data[x].titulo_notificacion, text: data[x].notificacion, splicePipe: false, id: x, activo: data[x].activo})
      }
      // console.log(':AXIOS:', this.avisosAxios)
      this.mainService.checkVersion();
     })
  }

  async func_getAvisos_REDDIT() {
    let _theUrl = ['https://www.reddit.com/r/all/.json', 'https://www.reddit.com/r/dogs/.json', 'https://www.reddit.com/r/dankmemes/.json'];
    let _min = Math.ceil(0);
    let _max = Math.floor(2);
    let _elRando = Math.floor(Math.random() * (_max - _min) + _min);
    axios.get(_theUrl[_elRando]).then(response => response.data)
    .then((data) => {
      this.avisosIsLoaded = true;
      // console.log(data.data.children);
      // data.data.children;
      this.avisosAxios = [];
      for (let x = 0; x < data.data.children.length; x++) {
        this.avisosAxios.push({title: data.data.children[x].data.subreddit, text:  data.data.children[x].data.title, splicePipe: false, id: x})
      }

      // console.log(this.avisosAxios)
     })
  }

  func_Axios_changeSlice(id: number) {
    this.avisosAxios[id].splicePipe = true;
  }

  func_Axios_rmSlice(id: number) {
    this.avisosAxios[id].splicePipe = false;
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      this.func_getAvisos();
      event.target.complete();
    }, 2000);
  };
}

