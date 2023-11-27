import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tab5BitacoraPageRoutingModule } from './tab5-bitacora-routing.module';

import { Tab5BitacoraPage } from './tab5-bitacora.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tab5BitacoraPageRoutingModule
  ],
  declarations: [Tab5BitacoraPage]
})
export class Tab5BitacoraPageModule {}
