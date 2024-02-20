import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-avisos-desc',
  templateUrl: './avisos-desc.page.html',
  styleUrls: ['./avisos-desc.page.scss'],
})
export class AvisosDescPage implements OnInit {

  constructor(public mainService: MainService,
    public sanitizeCtrl: DomSanitizer) { }

  aviso: any = [];

  ngOnInit() {
    this.aviso = this.mainService.avisos_selected_aviso;
    // let _preSanitize = "<b><p style='text-align: right !important; color: red;'>tu mamá we</b><br>Y aquí tienes mas texto pa que se</p><brb> te quite lo menso jajajacéntos raros y @@@caractereès!";
    // let _preSanitize = this.aviso['text'];
    // this.aviso['text'] = this.sanitizeCtrl.bypassSecurityTrustHtml(_preSanitize);
  }

}
