import { Component, OnInit } from '@angular/core';
import QRCode from 'easyqrcodejs';
import { AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { MainService } from '../main.service';

@Component({
  selector: 'app-modal-qr',
  templateUrl: './modal-qr.page.html',
  styleUrls: ['./modal-qr.page.scss'],
})
export class ModalQRPage implements OnInit {
  @ViewChild('extraqrcode', {static: false}) qrcode: ElementRef;

  constructor(public mainService: MainService) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    if (document.querySelector('#extraqrcode')?.childNodes[0]) {
      document.querySelector('#extraqrcode')?.removeChild(document.querySelector('#extraqrcode')?.firstChild!)
    }

     // Options
     let _elstring = this.mainService.credencialInfo.elNombre + ' ' + this.mainService.credencialInfo.elNumEmpleado + ' ' + this.mainService.credencialInfo.laDependencia + ' ' + this.mainService.credencialInfo.elPuesto;
     let _elStringURL = 'https://sitam.tamaulipas.gob.mx/registroaptraempleado/qr?' + _elstring;
     var options = {
      text: _elStringURL,
      width: 500,
      height: 500,
    }

    // Create new QRCode Object
    new QRCode(this.qrcode.nativeElement, options);
  }

}
