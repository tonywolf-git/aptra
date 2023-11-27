import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';

@Component({
  selector: 'app-avisos-desc',
  templateUrl: './avisos-desc.page.html',
  styleUrls: ['./avisos-desc.page.scss'],
})
export class AvisosDescPage implements OnInit {

  constructor(public mainService: MainService) { }

  aviso: any = [];

  ngOnInit() {
    this.aviso = this.mainService.avisos_selected_aviso;
  }

}
