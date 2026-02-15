import { Routes } from '@angular/router';

export const routes: Routes = [
  {path: '', redirectTo: 'beer', pathMatch: 'full'},
  {path: 'beer', loadComponent: () => import('./beer/beer').then(m => m.Beer)}
];
