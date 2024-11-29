import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../core/service/apiService/api-service.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private service = inject(ApiService);
  private router = inject(Router);

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
  profile() {
    return this.service.profile();
  }
  // editUser(photo: String, fullname: String , birth_date: String, email: String, password: String, password2: String, address: String){
  //   let editedUser = {photo, fullname, birth_date, email, password, address}
}
