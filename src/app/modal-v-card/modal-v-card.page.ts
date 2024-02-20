import { Component, OnInit, Input } from '@angular/core';
import { MainService } from '../main.service';
import { NavParams } from '@ionic/angular';


@Component({
  selector: 'app-modal-v-card',
  templateUrl: './modal-v-card.page.html',
  styleUrls: ['./modal-v-card.page.scss'],
})
export class ModalVCardPage implements OnInit {

  // @Input("vCardURL") vCardURL: String;
  vCardURL: string;

  constructor(public mainService: MainService,
    public navParams: NavParams) {
      this.vCardURL = this.navParams.get('_vcardUrl');
    }

  ngOnInit() {
  }

}
