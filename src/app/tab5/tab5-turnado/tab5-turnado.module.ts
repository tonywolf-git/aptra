import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tab5TurnadoPageRoutingModule } from './tab5-turnado-routing.module';

import { Tab5TurnadoPage } from './tab5-turnado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tab5TurnadoPageRoutingModule
  ],
  declarations: [Tab5TurnadoPage]
})
export class Tab5TurnadoPageModule {}
