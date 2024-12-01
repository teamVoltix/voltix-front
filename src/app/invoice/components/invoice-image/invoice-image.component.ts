import { Component } from '@angular/core';
import { InvoiceDetailsComponent } from '../invoice-details/invoice-details.component';
import { Invoice } from '../../../core/model/invoice';

@Component({
  selector: 'app-invoice-image',
  standalone: true,
  imports: [],
  templateUrl: './invoice-image.component.html',
  styleUrl: './invoice-image.component.css',
})
export class InvoiceImageComponent {
  public invoice: Invoice;

  constructor() {
    this.invoice = {
      invoiceNumber: '4580',
      cif: '43412',
      date: '12/09/2024',
      startDate: '20/01/2024',
      endDate: '21/02/2024',
      days: '30',
      consumption: '336',
      amount: '25',
      image: 'https://cye-energia.com/wp-content/uploads/2022/09/unnamed-8.jpg',
    };
  }
}
