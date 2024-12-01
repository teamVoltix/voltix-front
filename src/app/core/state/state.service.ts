import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import {
  BehaviorSubject,
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

  setLogin(token: string, refreshToken: string) {
    console.log('Setting login tokens');
    console.log('Access Token:', token);
    console.log('Refresh Token:', refreshToken);
    localStorage.setItem('token', JSON.stringify({ token }));
    localStorage.setItem('refreshToken', JSON.stringify({ refreshToken }));
    this.tokenSubject.next(token);
    this.startTokenRefresh();
  }

  getAccessToken(): string | null {
    return localStorage.getItem('token');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
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
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    this.tokenSubject.next(null);
    if (this.refreshTokenInterval) {
      this.refreshTokenInterval.unsubscribe();
    }
    this.router.navigate(['/login']);
  }

  refreshToken(): Observable<LoginResponse> {
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
  }

  startTokenRefresh(): void {
    const refreshInterval = 13 * 60 * 1000; // Rinnova ogni 13 minuti
    if (this.refreshTokenInterval) {
      this.refreshTokenInterval.unsubscribe();
    }
    this.refreshTokenInterval = interval(refreshInterval)
      .pipe(switchMap(() => this.refreshToken()))
      .subscribe();
  }
}
