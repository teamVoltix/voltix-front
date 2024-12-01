import { Component } from '@angular/core';
import { Invoice } from '../../../../core/model/invoice';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-invoice-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './invoice-details.component.html',
  styleUrl: './invoice-details.component.css',
})
export class InvoiceDetailsComponent {
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
      image:
        'https://www.google.com/url?sa=i&url=https%3A%2F%2Feleiaenergia.com%2Fentiende-factura-luz%2F&psig=AOvVaw1p_mwKtxB4pbg3WFHBhq3O&ust=1732811266787000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCPiq_ZL3_IkDFQAAAAAdAAAAABAE',
    };
  }
}
