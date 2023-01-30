import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginRegistryComponent } from './login-registry/login-registry.component';
import { InscriptionComponent } from './inscription/inscription.component';

export const AppRoutes: Routes = [
  {
    path: 'login',
    component: LoginRegistryComponent
  },
  {
    path: 'register',
    component: InscriptionComponent
  },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
        {
      path: '',
      loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(x => x.AdminLayoutModule)
  }]},
  // {
  //   path: '**',
  //   redirectTo: 'depots'
  // }
]
