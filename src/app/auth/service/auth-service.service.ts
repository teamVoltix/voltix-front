import { inject, Injectable } from '@angular/core';
import {
  Credentials,
  LoginResponse,
  RegisterUser,
  User,
} from '../../core/model/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private url = environment.API_URL;

  login(credentials: Credentials): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      this.url + 'api/auth/login/',
      credentials
    );
  }

  register(userData: RegisterUser): Observable<RegisterUser> {
    return this.http.post<RegisterUser>(
      this.url + 'api/auth/register/',
      userData
    );
  }

  profile(): Observable<User> {
    return this.http.get<User>(this.url + 'api/profile/');
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    // improve more the logic for validation
    
    if (token) {
      // implement the logic for see if token is expired

      return true;
    }
    return false;
  }
}
