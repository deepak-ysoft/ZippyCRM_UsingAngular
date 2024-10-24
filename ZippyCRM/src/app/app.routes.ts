import { Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { LayoutComponent } from './Components/layout/layout.component';
import { IndexComponent } from './Components/index/index.component';
import { UserRegisterComponent } from './Components/User/user-register/user-register.component';
import { UserProfileComponent } from './Components/User/user-profile/user-profile.component';
import { UserProfileNeedHelpComponent } from './Components/User/user-profile-need-help/user-profile-need-help.component';
import { UserForgotPasswordComponent } from './Components/User/user-forgot-password/user-forgot-password.component';
import { UserResetPasswordComponent } from './Components/User/user-reset-password/user-reset-password.component';
import { CustomerRegisterComponent } from './Components/Customer/customer-register/customer-register.component';
import { CustomerListComponent } from './Components/Customer/customer-list/customer-list.component';
import { CustomerProfileComponent } from './Components/Customer/CustomerProfile/customer-profile/customer-profile.component';
import { CusContactComponent } from './Components/Customer/CustomerProfile/cus-contact/cus-contact.component';
import { CustomerDetailsComponent } from './Components/Customer/customer-details/customer-details.component';

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
    path: 'user-forgot-password',
    component: UserForgotPasswordComponent,
  },
  {
    path: 'user-reset-password',
    component: UserResetPasswordComponent,
  },
  {
    path: 'user-register',
    component: UserRegisterComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'index',
        component: IndexComponent,
      },
      {
        path: 'user-profile',
        component: UserProfileComponent,
      },
      {
        path: 'user-profile-need-help',
        component: UserProfileNeedHelpComponent,
      },
      {
        path: 'customer-register',
        component: CustomerRegisterComponent,
      },
      {
        path: 'customer-list',
        component: CustomerListComponent,
      },
      {
        path: 'customer-details',
        component: CustomerDetailsComponent,
      },
      {
        path: 'customer-profile',
        component: CustomerProfileComponent,
      },
      {
        path: 'customer-contact',
        component: CusContactComponent,
      },
    ],
  },
];
