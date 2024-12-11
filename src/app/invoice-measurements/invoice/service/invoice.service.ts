import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Invoice, InvoiceResponse } from '../../../core/model/invoice';
import { InvoiceDetailsComponent } from '../components/invoice-details/invoice-details.component';
import { User } from '../../../core/model/user';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  private http = inject(HttpClient);
  private url = environment.API_URL;
  private router = inject(Router);

  constructor() {}

  getInvoices(): Observable<InvoiceResponse> {
    return this.http.get<InvoiceResponse>(this.url + 'api/invoices/');
  }
  getInvoiceById(id: string): Observable<Invoice> {
    return this.http.get<Invoice>(this.url + 'api/invoices/' + id + '/');
  }
  compareInvoice(payload: { invoice: string }) {
    return this.http.post<any>(this.url + 'comparations/compare/', payload);
  }
  profile(): Observable<User> {
    return this.http.get<User>(this.url + 'api/profile/');
  }

  uploadInvoice(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post<any>(this.url + 'api/invoices/upload/', formData, {
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    });
  }
  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.router.navigate(['/login']);
  }
}
