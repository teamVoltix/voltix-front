import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/service/auth-service.service';
import { Observable } from 'rxjs';
import { User } from '../../core/model/user';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private http = inject(HttpClient);
  private url = environment.API_URL;
  private router = inject(Router);

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
  profile(): Observable<User> {
    return this.http.get<User>(this.url + 'api/profile/');
  }
  // editUser(photo: String, fullname: String , birth_date: String, email: String, password: String, password2: String, address: String){
  //   let editedUser = {photo, fullname, birth_date, email, password, address}
}
