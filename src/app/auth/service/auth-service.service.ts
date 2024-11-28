import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../core/service/apiService/api-service.service';
import { Credentials } from '../../model/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private service = inject(ApiService);

  login(credentials: Credentials) {
    return this.service.login(credentials);
  }
  register(userData: any) {
    return this.service.register(userData);
  }

  profile() {
    return this.service.profile();
  }
}
