import { Routes } from '@angular/router';
import { ProfileComponent } from './profile/components/profile/profile.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'profile',
    title: 'My Profile Page',
    component: ProfileComponent
  },
  {
    path: 'forgot-password',
    title: 'Forgot Password Page',
    component: ForgotPasswordComponent,
  },
  {
    path: 'new-password',
    title: 'New Password Page',
    component: NewPasswordComponent,
  },
  {
    path: 'forgot-password',
    title: 'Forgot Password Page',
    component: ForgotPasswordComponent,
  },
  {
    path: 'new-password',
    title: 'New Password Page',
    component: NewPasswordComponent,
  },
];
