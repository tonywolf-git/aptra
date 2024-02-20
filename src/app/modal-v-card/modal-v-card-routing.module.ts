import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalVCardPage } from './modal-v-card.page';

const routes: Routes = [
  {
    path: '',
    component: ModalVCardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalVCardPageRoutingModule {}
