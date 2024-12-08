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
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.router.navigate(['/login']);
  }
  profile(): Observable<User> {
    return this.http.get<User>(this.url + 'api/profile/');
  }
  editUser(userData: any): Observable<any> {
    console.log('Usuario en servicio:', userData);
    return this.http.patch<any>(this.url + 'api/profile/update/', userData);
  }
  editPassword(
    old_password: string,
    new_password: string,
    confirm_password: string
  ): Observable<any> {
    let editedPassword = { old_password, new_password, confirm_password };
    console.log('Contraseña en servicio' + editedPassword);
    return this.http.post(this.url + 'api/auth/profile/change-password/', {
      old_password,
      new_password,
      confirm_password,
    });
  }

  //uploadphoto
  uploadPhoto(file: File): Observable<{ photo_url: string }> {
    const formData = new FormData();
    formData.append('photo', file);
    return this.http.post<{ photo_url: string }>(
      this.url + 'api/profile/upload-photo/',
      formData
    );
  }
}
