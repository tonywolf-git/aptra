import { Component } from '@angular/core';
import { MainService } from '../main.service';
import * as moment from 'moment';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(public mainService: MainService) {}

  calendarioEventosPre = [];
  calendarioEventosPost: any;

  async ngOnInit() {
    this.calendarioEventosPost = [];
    this.calendarioEventosPre = await this.mainService.func_getCalendario();
    for (let x = 0; x < this.calendarioEventosPre.length; x++) {
      var randomColor = "#" + Math.floor(Math.random()*16777215).toString(16);
      this.calendarioEventosPost.push({
        title: this.calendarioEventosPre[x]['titulo'],
        date: this.calendarioEventosPre[x]['fecha'],
        textColor: 'white',
        backgroundColor: randomColor
      })
    }
    var datetime = document.querySelector('ion-datetime');
    datetime?.reset();
  }

  pushToDates() {
    this.calendarioEventosPost.push({
      title: 'PRU PRU PRUEBA',
      date: '2023-05-25',
      textColor: 'white',
      backgroundColor: '#A1193E'
    })
  }

  highlightedDates = [
    {
      date: '2023-03-14',
      textColor: 'white',
      backgroundColor: '#BC936C',
    },
    {
      date: '2023-03-21',
      textColor: 'white',
      backgroundColor: '#A1193E',
    },
    {
      date: '2023-03-31',
      textColor: 'white',
      backgroundColor: '#BC936C',
    },
  ];
}
