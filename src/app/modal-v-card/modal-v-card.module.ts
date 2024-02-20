import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalVCardPageRoutingModule } from './modal-v-card-routing.module';

import { ModalVCardPage } from './modal-v-card.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalVCardPageRoutingModule
  ],
  declarations: [ModalVCardPage]
})
export class ModalVCardPageModule {}
