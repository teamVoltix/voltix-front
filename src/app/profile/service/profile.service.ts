import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../core/service/apiService/api-service.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private service = inject(ApiService);

  getUser() {
    return this.service.getAllUser();
  }
  // editUser(photo: String, fullname: String , birth_date: String, email: String, password: String, password2: String, address: String){
  //   let editedUser = {photo, fullname, birth_date, email, password, address}
}
