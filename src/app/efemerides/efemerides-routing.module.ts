import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EfemeridesPage } from './efemerides.page';

const routes: Routes = [
  {
    path: '',
    component: EfemeridesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EfemeridesPageRoutingModule {}
