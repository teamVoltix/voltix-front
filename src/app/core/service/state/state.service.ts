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

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
