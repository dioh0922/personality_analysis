import { Routes } from '@angular/router';
import { Beer } from './beer/beer';

export const routes: Routes = [
  {path: '', redirectTo: 'beer', pathMatch: 'full'},
  {path: 'beer', component:Beer}
];
