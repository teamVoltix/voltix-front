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
import { StateService } from '../../core/state/state.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private url = environment.API_URL;
  private stateService = inject(StateService);

  /* auth/email-verification/request/ */
  /*
    {
      "email": "string"
    } 
   */
  /* tiene que enviar solo la email */

  /* auth/email-verification/validate/ */
  /* 
    {
      email: "string",
      code: "string"
    }
  */
  /* enviar email ty codigo por confirmacion */

  /* auth/email-verification/register/ */
  /* campo de registracione normale */
  /* si la mail es verificada permite registrar */

  login(credentials: Credentials): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      this.url + 'api/auth/login/',
      credentials
    );
  }

  register(userData: RegisterUser): Observable<RegisterUser> {
    return this.http.post<RegisterUser>(
      /* this.url + 'api/auth/register/', */
      this.url + 'api/auth/email-verification/register/',
      userData
    );
  }

  profile(): Observable<User> {
    return this.http.get<User>(this.url + 'api/profile/');
  }

  isAuthenticated(): boolean {
    return this.stateService.isAuthenticated();
  }

  sendVerificationCode(email: string) {
    return this.http.post<any>(
      this.url + 'api/auth/email-verification/request/',
      {
        email,
      }
    );
  }

  verifyCode(email: string, code: string) {
    return this.http.post<any>(
      this.url + 'api/auth/email-verification/validate/',
      {
        email,
        code,
      }
    );
  }
}
