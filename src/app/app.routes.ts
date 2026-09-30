import { inject } from '@angular/core';
import { CanActivateFn, Router, Routes } from '@angular/router';
import { AuthService } from './services/auth.service';

// Con el código FOTOS solo se puede acceder a la galería y a subir fotos
const noFotosOnly: CanActivateFn = () =>
  inject(AuthService).isFotosOnly() ? inject(Router).parseUrl('/galeria') : true;

export const routes: Routes = [
  {
    path: '',
    canActivate: [noFotosOnly],
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
    canActivate: [noFotosOnly],
    loadComponent: () => import('./pages/admin/admin-invitados/admin-invitados').then(m => m.AdminInvitadosComponent)
  },
  {
    path: 'admin/fotos',
    canActivate: [noFotosOnly],
    loadComponent: () => import('./pages/admin/admin-fotos/admin-fotos').then(m => m.AdminFotosComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
