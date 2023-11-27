import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChecadorDescPage } from './checador-desc.page';

const routes: Routes = [
  {
    path: '',
    component: ChecadorDescPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChecadorDescPageRoutingModule {}
