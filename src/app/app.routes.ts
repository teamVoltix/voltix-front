import { Routes } from '@angular/router';
import { RegisterComponent } from './auth/components/register/register.component';

export const routes: Routes = [ 
    {path:'register', title:'user-register', component:RegisterComponent}
];
