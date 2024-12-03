import { Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { AuthEntryComponent } from './auth/components/AuthEntry/AuthEntry.component';
import { ProfileComponent } from './profile/components/profile/profile.component';
import { ForgotPasswordComponent } from './auth/components/recover/forgot-password/forgot-password.component';
import { NewPasswordComponent } from './auth/components/recover/new-password/new-password.component';
import { ProfileSettingsComponent } from './profile/components/profile-settings/profile-settings.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { HomePageComponent } from './home-page/components/home-page.component';
import { StartComponent } from './auth/components/start/start.component';
import { authGuard } from './auth/components/core/guard/auth.guard';
import { InvoiceListingComponent } from './invoice-measurements/invoice/components/invoice-listing/invoice-listing.component';
import { InvMesHeaderComponent } from './invoice-measurements/shared/header/inv-mes-header.component';
import { MeasurementSearchComponent } from './invoice-measurements/measurements/components/measurement-search/measurement-search.component';
import { MeasurementDetailComponent } from './invoice-measurements/measurements/components/measurement-search/measurement-detail/measurement-detail.component';
import { MeasurementCompareComponent } from './invoice-measurements/measurements/components/measurement-compare/measurement-compare.component';
import { InvoiceDetailsComponent } from './invoice-measurements/invoice/components/invoice-details/invoice-details.component';
import { InvoiceImageComponent } from './invoice-measurements/invoice/components/invoice-image/invoice-image.component';
import { InvoiceUploadComponent } from './invoice-measurements/invoice/components/invoice-upload/invoice-upload.component';

export const routes: Routes = [
  { path: '', redirectTo: 'start', pathMatch: 'full' },
  {
    path: 'start',
    title: 'My Start Page',
    component: StartComponent,
  },
  {
    //cambiar en AuthEntry
    path: 'inicio',
    title: 'Welcome to Voltix',
    component: AuthEntryComponent,
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
    canActivate: [authGuard],
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
    path: 'home',
    title: 'Welcome to Voltix Home Page',
    component: HomePageComponent,
    canActivate: [authGuard],
  },
  {
    path: 'invoice-listing',
    title: 'invoice listing',
    component: InvoiceListingComponent,
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
    path: 'invoice-details',
    title: 'Invoice Details',
    component: InvoiceDetailsComponent,
  },
  {
    path: 'invoice-image',
    title: 'Invoice Image',
    component: InvoiceImageComponent,
  },
  {
    path: 'invoice-upload',
    title: 'Upload Invoice',
    component: InvoiceUploadComponent,
  },
  {
    path: '**',
    title: '',
    component: StartComponent,
  },
];
