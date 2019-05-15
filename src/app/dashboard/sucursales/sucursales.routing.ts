import { SucursalesListComponent } from './sucursales-list/sucursales-list.component';
import { Routes } from '@angular/router';

export const sucursalesRouting: Routes = [
  { path: '', component: SucursalesListComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
