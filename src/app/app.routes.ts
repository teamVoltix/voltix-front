import { Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { AuthEntryComponent } from './auth/components/AuthEntry/AuthEntry.component';
import { ProfileComponent } from './profile/components/profile/profile.component';
import { ForgotPasswordComponent } from './auth/components/recover/forgot-password/forgot-password.component';
import { NewPasswordComponent } from './auth/components/recover/new-password/new-password.component';
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
import { InvoiceUploadComponent } from './invoice-measurements/invoice/components/invoice-upload/invoice-upload.component';
import { ComparisonComponent } from './comparison/comparison.component';
import { NotificationsComponent } from './notifications/components/notifications.component';
import { NotificationsSettingsComponent } from './notifications-settings/notifications-settings.component';
import { saveSettingsGuard } from './guards/save-settings.guard';


export const routes: Routes = [
  { path: '', redirectTo: 'start', pathMatch: 'full' },
  {
    path: 'start',
    title: 'Descrubre Voltix',
    component: StartComponent,
  },
  {
    //cambiar en AuthEntry
    path: 'inicio',
    title: 'Bienvenido en Voltix',
    component: AuthEntryComponent,
  },
  {
    path: 'login',
    title: 'Acceso Voltix',
    component: LoginComponent,
  },
  {
    path: 'profile',
    title: 'Mi Perfil de Voltix',
    component: ProfileComponent,
    canActivate: [authGuard],
  },
  {
    path: 'forgot-password',
    title: 'Contraseña olvidada',
    component: ForgotPasswordComponent,
  },
  {
    path: 'password/reset/:uidb64/:token',
    title: 'Nueva Contraseña',
    component: NewPasswordComponent,
  },
  {
    path: 'register',
    title: 'Registro',
    component: RegisterComponent,
  },
  {
    path: 'home',
    title: 'Bienvenido en Voltix homepage',
    component: HomePageComponent,
    canActivate: [authGuard],
  },
  {
    path: 'invoice',
    title: 'Mis factura',
    component: InvoiceListingComponent,
    canActivate: [authGuard],
  },
  {
    path: 'measurement-search',
    title: 'Mis mediciones',
    component: MeasurementSearchComponent,
    canActivate: [authGuard],
  },
  {
    path: 'measurement-search/:id',
    title: 'Measurement Detail',
    component: MeasurementDetailComponent,
    canActivate: [authGuard],
  },
  {
    path: 'measurement-compare/:comparisonId',
    title: 'Measurement compare',
    component: MeasurementCompareComponent,
    canActivate: [authGuard],
  },
  {
    path: 'invoice-details/:id',
    title: 'Invoice Details',
    component: InvoiceDetailsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'invoice-upload',
    title: 'Upload Invoice',
    component: InvoiceUploadComponent,
    canActivate: [authGuard],
  },
  {
    path: 'comparison/:comparisonId',
    title: 'Comparison Details',
    component: ComparisonComponent,
    canActivate: [authGuard],
  },
  {
    path: 'notifications',
    title: 'Notificaciones',
    component: NotificationsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'notification-settings',
    component: NotificationsSettingsComponent,
    canDeactivate: [authGuard, saveSettingsGuard],
  },
  {
    path: '**',
    title: '',
    component: StartComponent,
  },
];
