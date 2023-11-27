import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChecadorDescPageRoutingModule } from './checador-desc-routing.module';

import { ChecadorDescPage } from './checador-desc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChecadorDescPageRoutingModule
  ],
  declarations: [ChecadorDescPage]
})
export class ChecadorDescPageModule {}
