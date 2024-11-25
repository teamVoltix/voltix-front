import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  public url = 'http://localhost:3000/user';
  constructor(private http: HttpClient) {}

  getUser() {
    return this.http.get(this.url);
  }


  // editUser(photo: String, fullname: String , birth_date: String, email: String, password: String, password2: String, address: String){
  //   let editedUser = {photo, fullname, birth_date, email, password, address}

 
}
