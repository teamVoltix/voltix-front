import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  url = 'http://localhost:3000/user';
  constructor(private http: HttpClient) {}

  getUser() {
    return this.http.get(this.url);
  }
}
