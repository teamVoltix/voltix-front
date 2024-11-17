import { Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { HomeComponent } from './auth/components/home/home.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'login',
    title: 'My Login Page',
    component: LoginComponent,
  },
  {
    path: 'home',
    title: 'My Home Page',
    component: HomeComponent,
  }
];
