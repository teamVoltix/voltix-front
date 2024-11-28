import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { initialState, Payload, State } from '../../../model/state';
import { jwtDecode } from 'jwt-decode';
import { User } from '../../../model/user';
import { ApiService } from '../apiService/api-service.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private router = inject(Router);
  private apiServer = inject(ApiService);
  private state$ = new BehaviorSubject<State>(initialState);
  jwt = jwtDecode;

 /*  getState(): Observable<State> {
    return this.state$.asObservable();
  }
  setState(payload: Payload) {
    this.state$.next({ ...this.state$.value, ...payload });
  }

  getCurrentUser = (): User => this.state$.value.currentUser!;

  getToken = (): string | null => this.state$.value.token; */

  setLogin(token: string) {
    localStorage.setItem('token', JSON.stringify({ token }));
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
