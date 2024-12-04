import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Invoice, InvoiceResponse } from '../../../core/model/invoice'
import { InvoiceDetailsComponent } from '../components/invoice-details/invoice-details.component';
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

  getInvoiceById(invoice_id: string): Observable<Invoice> {
    return this.http.get<Invoice>(this.url + 'api/invoices/'+ invoice_id);
  }

  uploadInvoice(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post<any>(this.url + 'api/invoices/upload/', formData, {
      headers: new HttpHeaders({
        'Accept': 'application/json'
      })
    });
  }
}
