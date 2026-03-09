import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then(m => m.HomeComponent)
  },
  {
    path: 'media',
    loadComponent: () => import('./pages/media/media').then(m => m.MediaComponent)
  },
  {
    path: 'galeria',
    loadComponent: () => import('./pages/galeria/galeria').then(m => m.GaleriaComponent)
  },
  {
    path: 'admin/invitados',
    loadComponent: () => import('./pages/admin/admin-invitados/admin-invitados').then(m => m.AdminInvitadosComponent)
  },
  {
    path: 'admin/fotos',
    loadComponent: () => import('./pages/admin/admin-fotos/admin-fotos').then(m => m.AdminFotosComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
