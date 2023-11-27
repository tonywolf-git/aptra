import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { MainService } from '../main.service';
import { Tab5Page } from '../tab5/tab5.page';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(public menuCtrl: MenuController,
    public mainService: MainService) {}

  tab5Root = Tab5Page;

  ngOnInit() {
    console.log('Hola ya empecé')
  }
}
