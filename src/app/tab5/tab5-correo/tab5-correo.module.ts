import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tab5CorreoPageRoutingModule } from './tab5-correo-routing.module';

import { Tab5CorreoPage } from './tab5-correo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tab5CorreoPageRoutingModule
  ],
  declarations: [Tab5CorreoPage]
})
export class Tab5CorreoPageModule {}
