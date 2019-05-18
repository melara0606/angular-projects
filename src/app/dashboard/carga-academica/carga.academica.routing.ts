import { Routes } from '@angular/router';
import { CargaEmpyComponent } from './carga-empy/carga-empy.component';
import { CargaNuevaComponent } from './carga-nueva/carga-nueva.component';

export const cargaAcademicaRouting: Routes = [
  { path: '', component: CargaEmpyComponent },
  { path: 'nueva', component: CargaNuevaComponent},
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
