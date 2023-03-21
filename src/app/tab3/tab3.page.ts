import { Component } from '@angular/core';
import { CalendarMode, NgCalendarModule } from 'ionic6-calendar';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor() {}

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
