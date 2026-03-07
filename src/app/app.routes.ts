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
    path: '**',
    redirectTo: ''
  }
];
