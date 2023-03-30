import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { MainService } from '../main.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(public menuCtrl: MenuController) {}
}
