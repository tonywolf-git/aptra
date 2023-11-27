import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EfemeridesDescPage } from './efemerides-desc.page';

const routes: Routes = [
  {
    path: '',
    component: EfemeridesDescPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EfemeridesDescPageRoutingModule {}
