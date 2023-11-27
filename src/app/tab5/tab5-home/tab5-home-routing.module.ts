import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Tab5HomePage } from './tab5-home.page';

const routes: Routes = [
  {
    path: '',
    component: Tab5HomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tab5HomePageRoutingModule {}
