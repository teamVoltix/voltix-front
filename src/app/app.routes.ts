import { Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { HomeComponent } from './auth/components/home/home.component';
import { ProfileComponent } from './profile/components/profile/profile.component';
import { ForgotPasswordComponent } from './auth/components/forgot-password/forgot-password.component';
import { NewPasswordComponent } from './auth/components/new-password/new-password.component';
import { ProfileSettingsComponent } from './profile/components/profile-settings/profile-settings.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { LogoutComponent } from './auth/components/logout/logout.component';
import { StartComponent } from './start/start.component';
import { MeasurementSearchComponent } from './internal-measurements/components/measurement-search/measurement-search.component';
import { MeasurementCompareComponent } from './internal-measurements/components/measurement-compare/measurement-compare.component';

export const routes: Routes = [
  { path: '', redirectTo: 'start', pathMatch: 'full' },
  {
    path: 'start',
    title: 'My Start Page',
    component: StartComponent,
  },

  {
    path: 'home',
    title: 'My Home Page',
    component: HomeComponent,
  },
  {
    path: 'login',
    title: 'My Login Page',
    component: LoginComponent,
  },
  {
    path: 'profile',
    title: 'My Profile Page',
    component: ProfileComponent,
  },
  {
    path: 'profile-settings',
    title: 'Profile Settings',
    component: ProfileSettingsComponent,
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
    path: 'register',
    title: 'User Register',
    component: RegisterComponent,
  },
  {
    path: 'log-out',
    title: 'logout',
    component: LogoutComponent,
  },
  {
    path: 'measurement-search',
    title: 'Measurement search',
    component: MeasurementSearchComponent,
  },
  {
    path: 'measurement-compare',
    title: 'Measurement compare',
    component: MeasurementCompareComponent,
  },
];
