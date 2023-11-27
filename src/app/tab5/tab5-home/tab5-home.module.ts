import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tab5HomePageRoutingModule } from './tab5-home-routing.module';

import { Tab5HomePage } from './tab5-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tab5HomePageRoutingModule
  ],
  declarations: [Tab5HomePage]
})
export class Tab5HomePageModule {}
