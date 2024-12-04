import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../../core/model/user';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { Invoice } from '../../core/model/invoice';
import { Measurement } from '../../core/model/measurement';

@Injectable({
  providedIn: 'root',
})
export class HomepageService {
  private http = inject(HttpClient);
  private url = environment.API_URL; 
  private router = inject(Router);

  profile(): Observable<User> {
    return this.http.get<User>(this.url + 'api/profile/');
  }

  getInvoices(): Observable<{ invoices: Invoice[] }> {
    return this.http.get<{ invoices: Invoice[] }>(this.url + 'api/invoices/');
  }

  getMeasurements(): Observable<any> { 
    return this.http.get<any>(this.url + 'api/measurements/');
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
