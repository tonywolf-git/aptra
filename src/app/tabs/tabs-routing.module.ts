import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: 'tab4',
        loadChildren: () => import('../tab4/tab4.module').then(m => m.Tab4PageModule)
      },
      {
        path: 'tab5',
        children: [
          {
            path: '',
            loadChildren: () => import('../tab5/tab5.module').then(m => m.Tab5PageModule)
          },
          {
            path: 'home',
            loadChildren: () => import('../tab5/tab5-home/tab5-home-routing.module').then(m => m.Tab5HomePageRoutingModule)
          },
          {
            path: 'correo',
            loadChildren: () => import('../tab5/tab5-correo/tab5-correo-routing.module').then(m => m.Tab5CorreoPageRoutingModule)
          },
          {
            path: 'correo/bitacora',
            loadChildren: () => import('../tab5/tab5-bitacora/tab5-bitacora-routing.module').then(m => m.Tab5BitacoraPageRoutingModule)
          },
          {
            path: 'correo/turnado',
            loadChildren: () => import('../tab5/tab5-turnado/tab5-turnado-routing.module').then(m => m.Tab5TurnadoPageRoutingModule)
          },
        ],
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
