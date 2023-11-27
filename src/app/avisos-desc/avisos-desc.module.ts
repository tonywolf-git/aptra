import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AvisosDescPageRoutingModule } from './avisos-desc-routing.module';

import { AvisosDescPage } from './avisos-desc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AvisosDescPageRoutingModule
  ],
  declarations: [AvisosDescPage]
})
export class AvisosDescPageModule {}
