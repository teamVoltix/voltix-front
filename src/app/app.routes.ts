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
import { HomePageComponent } from './auth/components/home-page/home-page.component';
import { MeasurementSearchComponent } from './internal-measurements/components/measurement-search/measurement-search.component';
import { MeasurementCompareComponent } from './internal-measurements/components/measurement-compare/measurement-compare.component';
import { MeasurementDetailComponent } from './internal-measurements/components/measurement-search/measurement-detail/measurement-detail.component';
import { InvoiceUploadComponent } from './invoice/invoice-upload/invoice-upload.component';

export const routes: Routes = [
  { path: '', redirectTo: 'start', pathMatch: 'full' },
  {
    path: 'start',
    title: 'My Start Page',
    component: StartComponent,
  },
  {
    path: 'inicio',
    title: 'Welcome to Voltix',
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
    path: 'home-page',
    title: 'Home Page',
    component: HomePageComponent,
  },
  {
    path: 'measurement-search',
    title: 'Measurement search',
    component: MeasurementSearchComponent,
  },
  {
    path: 'measurement-search/:id',
    title: 'Measurement Detail',
    component: MeasurementDetailComponent,
  },
  {
    path: 'measurement-compare',
    title: 'Measurement compare',
    component: MeasurementCompareComponent,
  },
  {
    path: 'invoice-upload',
    title: 'Upload Invoice',
    component: InvoiceUploadComponent,
  },
];
