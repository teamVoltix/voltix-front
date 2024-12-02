import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import {
  BehaviorSubject,
  catchError,
  interval,
  Observable,
  Subscription,
  switchMap,
  tap,
} from 'rxjs';
import { LoginResponse } from '../model/user';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
@Injectable({
  providedIn: 'root',
})
export class StateService {
  private router = inject(Router);
  private http = inject(HttpClient);

  private url = environment.API_URL;
  private refreshTokenInterval: Subscription | null = null;
  private tokenSubject = new BehaviorSubject<string | null>(
    this.getAccessToken()
  );

  constructor() {
    if (this.isAuthenticated()) {
      this.startTokenRefresh();
    }
  }

  setLogin(access_token: string, refresh_token: string) {
    console.log('Setting login tokens');
    console.log('Access Token:', access_token);
    console.log('Refresh Token:', refresh_token);
    localStorage.setItem('access_token', JSON.stringify({ access_token }));
    localStorage.setItem('refresh_token', JSON.stringify({ refresh_token }));
    this.tokenSubject.next(access_token);
    this.startTokenRefresh();
  }

  getAccessToken(): string | null {
    const accessToken = localStorage.getItem('access_token');
    return accessToken ? JSON.parse(accessToken).access_token : null;
  }

  getRefreshToken(): string | null {
    const refreshToken = localStorage.getItem('refresh_token');
    return refreshToken ? JSON.parse(refreshToken).refresh_token : null;
  }

  isAuthenticated(): boolean {
    const token = this.getAccessToken();
    if (token) {
      const decoded: any = jwtDecode(token);

      return decoded.exp * 1000 > Date.now();
    }
    return false;
  }

  getLogged() {
    if (this.isAuthenticated()) {
      console.log('Token found, navigating to /home');
      this.router.navigate(['/home']);
    } else {
      console.log('No token found');
      this.router.navigate(['/login']);
    }
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.tokenSubject.next(null);
    if (this.refreshTokenInterval) {
      this.refreshTokenInterval.unsubscribe();
    }
    this.router.navigate(['/login']);
  }

  /*  refreshToken(): Observable<LoginResponse> {
    const refresh = this.getRefreshToken();
    if (!refresh) {
      throw new Error('Refresh token is missing');
    }

    return this.http
      .post<any>(this.url + 'api/auth/token/refresh/', { refresh }) // Enviar el refresh_token correctamente como 'refresh'
      .pipe(
        tap((tokens: any) => {
          this.setLogin(tokens.access, tokens.refresh); // Usar los tokens de la respuesta
        })
      );
  } */

  refreshToken(): Observable<LoginResponse> {
    const refresh = this.getRefreshToken();
    if (!refresh) {
      throw new Error('Refresh token is missing');
    }
    return this.http
      .post<any>(this.url + 'api/auth/token/refresh/', {
        refresh_token: refresh,
      })
      .pipe(
        tap((tokens: any) => {
          console.log('Received tokens:', tokens);
          this.setLogin(tokens.access_token, tokens.refresh_token);
        }),
        catchError((error) => {
          if (error.status === 401) {
            // Token expired or invalid, redirect to login
            this.router.navigate(['/login']);
          }
          throw error;
        })
      );
  }

  startTokenRefresh(): void {
    const refreshInterval = 13 * 60 * 1000; // Rinnova ogni 13 minuti */

    if (this.refreshTokenInterval) {
      this.refreshTokenInterval.unsubscribe();
    }
    this.refreshTokenInterval = interval(refreshInterval)
      .pipe(switchMap(() => this.refreshToken()))
      .subscribe();
  }
}
