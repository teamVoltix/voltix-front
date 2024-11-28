import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../core/service/apiService/api-service.service';
import { Router } from '@angular/router';
import { Login } from '../../model/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private service = inject(ApiService);
  private router = inject(Router);

  getUserAll() {
    return this.service.getAllUser();
  }

  login(credentials: Login) {
    return this.service.login(credentials);
  }
  
  profile() {
    return this.service.profile();
  }
}
