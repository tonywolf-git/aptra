import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tramites',
  templateUrl: './tramites.page.html',
  styleUrls: ['./tramites.page.scss'],
})
export class TramitesPage implements OnInit {

  constructor(public mainService: MainService, public modalCtrl: ModalController) { }

  current_segment = 'desc';
  selectedTramite = 0;

  async ngOnInit() {
  }

  tramitesArray = [
    {
      titulo: 'Bono de Útiles Escolares',
      desc: {
        texto: 'Casos en los que debe o puede realizarse el Trámite:',
        bullet_points: [
          'Cuando la antigüedad laboral sea mayor a 6 meses.',
          'Cuando el servidor publico tenga al menos a uno de sus hijos inscrito en una institución educativa del sistema educativo nacional a partir de nivel básico.',
        ]
      },
      info: {
        url: 'https://tramites.tamaulipas.gob.mx/ciudadano/#',
        telefono: 'Tel. (834) 107 8719 ',
        extension: 'Ext. 44022',
      }
    },
    
    {
      titulo: 'Bono del dia del niño, madre y padre',
      desc: {
        texto: 'Casos en los que debe o puede realizarse el Trámite:',
        bullet_points: [
          'Cuando el servidor público sea de nuevo ingreso.',
          'Cuando tengan hijos nacidos despúes del 27 de Febrero del 2023 al 24 de Marzo del 2023.',
          'Que núnca haya entregado documentación y no hayan recibido este beneficio.',
          'En caso del bono del día del niño el benficiario deberá ser menor de 12 años.'
        ]
      },
      info: {
        url: 'https://tramites.tamaulipas.gob.mx/ciudadano/#',
        telefono: 'Tel. (834) 107 8719',
        telefono_raw: '8341078719',
        extension: 'Ext. 44022',
      }
    },

    {
      titulo: 'Beca para hijos de servidores públicos',
      desc: {
        texto: 'Casos en los que debe o puede realizarse el Trámite:',
        bullet_points: [
          'Cuando el hijo del servidor público sea estudiante de una institución del Sistema Educativo Nacional.',
          'Cuando tenga promedio superior de 8 en el año anterior inmediato.',
          'Cuando la antigüedad sea mayor a 6 meses.',
          'Cuando el servidor público tenga al menos a uno de sus hijos inscrito en una institución educativa del Sistema Educativo Nacional a partir del Nivel Básico.'
        ]
      },
      info: {
        url: 'https://tramites.tamaulipas.gob.mx/ciudadano/#',
        telefono: 'Tel. (834) 107 8719',
        telefono_raw: '8341078719',
        extension: 'Ext. 44022',
      }
    },

    {
      titulo: 'Beca para servidores públicos',
      desc: {
        texto: 'Casos en los que debe o puede realizarse el Trámite:',
        bullet_points: [
          'Cuando el Servidor Publico sea estudiante en una Institución del Sistema Educativo Nacional.',
          'Cuando la antigüedad laboral sea mayor a 6 meses.',
        ]
      },
      info: {
        url: 'https://tramites.tamaulipas.gob.mx/ciudadano/#',
        telefono: 'Tel. (834) 107 8719',
        telefono_raw: '8341078719',
        extension: 'Ext. 44022',
      }
    },

    {
      titulo: 'Bono de nivel académico',
      desc: {
        texto: 'Casos en los que debe o puede realizarse el Trámite:',
        bullet_points: [
          'Cuando el servidor publico cuente con la documentación probatoria.',
        ]
      },
      info: {
        url: 'https://tramites.tamaulipas.gob.mx/ciudadano/#',
        telefono: 'Tel. (834) 107 8719',
        telefono_raw: '8341078719',
        extension: 'Ext. 44022',
      }
    },
  ];

  async func_selectTramite(_id:any) {
    // console.log(this.tramitesArray[_id]);
    this.selectedTramite = _id;
  }

  func_openURL(_url: any) {
    window.open(_url, '_blank');
  }
}