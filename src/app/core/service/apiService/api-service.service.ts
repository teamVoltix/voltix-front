import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import {
  Credentials,
  LoginResponse,
  RegisterUser,
  User,
} from '../../../model/user';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
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
}
