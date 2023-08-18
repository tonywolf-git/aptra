import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CambiaPassPage } from './cambia-pass.page';

const routes: Routes = [
  {
    path: '',
    component: CambiaPassPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CambiaPassPageRoutingModule {}
