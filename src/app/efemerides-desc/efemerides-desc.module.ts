import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EfemeridesDescPageRoutingModule } from './efemerides-desc-routing.module';

import { EfemeridesDescPage } from './efemerides-desc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EfemeridesDescPageRoutingModule
  ],
  declarations: [EfemeridesDescPage]
})
export class EfemeridesDescPageModule {}
