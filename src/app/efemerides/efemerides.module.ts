import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EfemeridesPageRoutingModule } from './efemerides-routing.module';

import { EfemeridesPage } from './efemerides.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EfemeridesPageRoutingModule
  ],
  declarations: [EfemeridesPage]
})
export class EfemeridesPageModule {}
