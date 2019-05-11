import { Routes } from '@angular/router';
import { PersonalAddComponent } from './personal-add/personal-add.component';
import { PersonalListComponent } from './personal-list/personal-list.component';

export const personalesRouting: Routes = [
  { path: '', component: PersonalListComponent },
  { path: 'add', component: PersonalAddComponent },
  { path: ':id', component: PersonalAddComponent },
  { path: '**', redirectTo: 'personales', pathMatch: 'full' }
];
