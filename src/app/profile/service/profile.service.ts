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
  editUser(userData: any): Observable<any>{
    console.log('Usuario en servicio:' + userData)
    return this.http.patch<any>(this.url + 'api/profile/update/', userData);
  }
  // editPassword(currentPassword:string, newPassword:string){
  //   let editedPassword ={currentPassword, newPassword}
  //   console.log('Contraseña en servicio' + editedPassword)
  //   return this.http.post<any>(this.url + 'api/auth/profile/change-password/');
  // }
  
  // (this.url + 'api/profile/upload-photo/' + url)

}

