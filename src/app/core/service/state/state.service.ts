import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { initialState, Payload, State } from '../../../model/state';
import { jwtDecode } from 'jwt-decode';
import { User } from '../../../model/user';
import { ApiService } from '../apiService/api-service.service';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private apiServer = inject(ApiService);
  private state$ = new BehaviorSubject<State>(initialState);
  jwt = jwtDecode;

  getState(): Observable<State> {
    return this.state$.asObservable();
  }

  getCurrentUser = (): User => this.state$.value.currentUser!;

  getToken = (): string | null => this.state$.value.token;

  setLogin(token: string) {
    const currentPayload: Payload = this.jwt(token);

    localStorage.setItem('voltix', JSON.stringify({ token }));
    this.apiServer.getUserById(currentPayload.id).subscribe((data) => {
      this.state$.next({
        ...this.state$.value,
        loginState: 'logged',
        token,
        currentPayload,
        currentUser: data,
      });
    });
  }
}
