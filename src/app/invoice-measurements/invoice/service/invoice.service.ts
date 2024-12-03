import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InvoiceDetailsComponent } from '../components/invoice-details/invoice-details.component';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  
  private http = inject(HttpClient);
  private url = environment.API_URL;
  private router = inject(Router);

  constructor() {}

  getInvoices(): Observable<any[]> {
    return this.http.get<any[]>(this.url + 'api/invoices/');
  }

  getInvoiceById(invoice_id: string): Observable<any> {
    return this.http.get<any>(this.url + 'api/invoices/'+ invoice_id);
  }
}
