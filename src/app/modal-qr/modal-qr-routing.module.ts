import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalQRPage } from './modal-qr.page';

const routes: Routes = [
  {
    path: '',
    component: ModalQRPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalQRPageRoutingModule {}
