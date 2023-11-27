import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { RecServiceService } from '../rec-service.service';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {

  constructor(public navCtrl: NavController,
    public recService: RecServiceService) { }

  elKeyUp = '';

  loginData = {
    username: '',
    pass: ''
    // username: 'appmovil',
    // pass: '4ppm0v1l'
  }

  passType = "password";

  ngOnInit() {
    this.recService.func_doAuth();
  }

  func_doLogin() {
    this.recService.func_doLogin(this.loginData);
  }

  keyPress(event:Event, input: any) {
    if (input['key'] == 'Enter') {
      event.stopPropagation();
    }
  }

  passwordType() {
    if (this.passType == "password") {
      this.passType = "text";
    } else {
      this.passType = "password";
    }
  }

}
