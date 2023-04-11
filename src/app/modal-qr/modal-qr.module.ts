import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalQRPageRoutingModule } from './modal-qr-routing.module';

import { ModalQRPage } from './modal-qr.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalQRPageRoutingModule
  ],
  declarations: [ModalQRPage]
})
export class ModalQRPageModule {}
