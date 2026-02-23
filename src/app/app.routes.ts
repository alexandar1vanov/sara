import { Routes } from '@angular/router';
import {UserPageComponent} from './user-page/user-page.component';
import {UserDetailsPageComponent} from './user-details-page/user-details-page.component';
import {UserFormPageComponent} from './user-form-page/user-form-page.component';

export const routes: Routes = [
  { path: 'users', component: UserPageComponent },
  { path: 'users/form', component: UserFormPageComponent },
  { path: 'users/form/:id', component: UserFormPageComponent },
  { path: 'users/:id', component: UserDetailsPageComponent },
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: '**', redirectTo: '/users'},
];
