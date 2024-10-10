import { Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { LayoutComponent } from './Components/layout/layout.component';
import { IndexComponent } from './Components/index/index.component';

export const routes: Routes = [
  //defualt route
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'index',
        component:  IndexComponent,
      },
    ],
  },
];
