import { Routes } from '@angular/router';
import { ProfileComponent } from './profile/components/profile/profile.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'profile',
    title: 'My Profile Page',
    component: ProfileComponent,
  },
];
