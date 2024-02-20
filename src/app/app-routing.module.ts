import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  // {
  //   path: '',
  //   loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  // },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'tab1',
    loadChildren: () => import('./tab1/tab1.module').then( m => m.Tab1PageModule)
  },
  {
    path: 'tab3',
    loadChildren: () => import('./tab3/tab3.module').then( m => m.Tab3PageModule)
  },
  {
    path: 'tab4',
    loadChildren: () => import('./tab4/tab4.module').then( m => m.Tab4PageModule)
  },
  {
    path: 'tab2',
    loadChildren: () => import('./tab2/tab2.module').then( m => m.Tab2PageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'modal-qr',
    loadChildren: () => import('./modal-qr/modal-qr.module').then( m => m.ModalQRPageModule)
  },
  {
    path: 'cambia-pass',
    loadChildren: () => import('./cambia-pass/cambia-pass.module').then( m => m.CambiaPassPageModule)
  },
  {
    path: 'tab5',
    loadChildren: () => import('./tab5/tab5.module').then( m => m.Tab5PageModule)
  },
  {
    path: 'tab5-home',
    loadChildren: () => import('./tab5/tab5-home/tab5-home-routing.module').then(m => m.Tab5HomePageRoutingModule)
  },
  {
    path: 'tab5-correo',
    loadChildren: () => import('./tab5/tab5-correo/tab5-correo-routing.module').then( m => m.Tab5CorreoPageRoutingModule)
  },
  {
    path: 'tab5-correo-bitacora',
    loadChildren: () => import('./tab5/tab5-bitacora/tab5-bitacora-routing.module').then(m => m.Tab5BitacoraPageRoutingModule)
  },
  {
    path: 'tab5-correo-turnado',
    loadChildren: () => import('./tab5/tab5-turnado/tab5-turnado-routing.module').then(m => m.Tab5TurnadoPageRoutingModule)
  },
  {
    path: 'avisos-desc',
    loadChildren: () => import('./avisos-desc/avisos-desc.module').then( m => m.AvisosDescPageModule)
  },
  {
    path: 'checador',
    loadChildren: () => import('./checador/checador.module').then( m => m.ChecadorPageModule)
  },
  {
    path: 'checador-desc',
    loadChildren: () => import('./checador-desc/checador-desc.module').then( m => m.ChecadorDescPageModule)
  },
  {
    path: 'tramites',
    loadChildren: () => import('./tramites/tramites.module').then( m => m.TramitesPageModule)
  },
  {
    path: 'efemerides',
    loadChildren: () => import('./efemerides/efemerides.module').then( m => m.EfemeridesPageModule)
  },
  {
    path: 'efemerides-desc',
    loadChildren: () => import('./efemerides-desc/efemerides-desc.module').then( m => m.EfemeridesDescPageModule)
  },
  {
    path: 'ayuda',
    loadChildren: () => import('./ayuda/ayuda.module').then( m => m.AyudaPageModule)
  },
  {
    path: 'modal-v-card',
    loadChildren: () => import('./modal-v-card/modal-v-card.module').then( m => m.ModalVCardPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
