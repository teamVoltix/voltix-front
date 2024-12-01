import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class StateService {
  private router = inject(Router);

  setLogin(token: string) {
    localStorage.setItem('token', JSON.stringify({ token }));
  }
  //if have token go to home
  getLogged() {
    if (localStorage.getItem('token')) {
      console.log('Token found, navigating to /home');
      this.router.navigate(['/home']);
    } else {
      console.log('No token found');
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
