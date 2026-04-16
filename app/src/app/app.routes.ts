import { Routes } from '@angular/router';

export const routes: Routes = [
  {path: '', redirectTo: 'beer', pathMatch: 'full'},
  {path: 'beer', loadComponent: () => import('./beer/beer').then(m => m.Beer)},
  {path: 'discussion', loadComponent: () => import('./discussion/discussion').then(m => m.Discussion)},
  {path: 'sake', loadComponent: () => import('./sake/sake').then(m => m.Sake)},
  {path: 'recommend', loadComponent: () => import('./recommend/recommend').then(m => m.Recommend)},
  {path: 'todo', loadComponent: () => import('./todo/todo').then(m => m.Todo)},
];
