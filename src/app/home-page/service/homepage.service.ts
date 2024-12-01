import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../../core/model/user';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HomepageService {
  private http = inject(HttpClient);
  private url = environment.API_URL;

  profile(): Observable<User> {
    return this.http.get<User>(this.url + 'api/profile/');
  }
}
