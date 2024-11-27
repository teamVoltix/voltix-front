import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../../../model/user';
import { UserResponse } from '../../../model/state';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);
  private url = environment.API_URL;
  private urlprova = 'http://localhost:8800/users/get_all_users/';

  //methodo de prueba
  getAllUser(): Observable<UserResponse> {
    return this.http.get<UserResponse>(this.urlprova);
  }
  register(user: User): Observable<User> {
    return this.http.post<User>(this.url + 'users', user);
  }
  login(credentials: { dni: string; password: string }): Observable<any> {
    return this.http.post<any>(this.url + 'api/auth/login/', credentials);
  }
  profile(): Observable<User> {
    return this.http.get<User>(this.url + 'api/profile/');
  }
}
