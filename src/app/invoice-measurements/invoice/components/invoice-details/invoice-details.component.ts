import { Component, OnInit, inject, Input } from '@angular/core';
import { Invoice } from '../../../../core/model/invoice';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InvMesHeaderComponent } from '../../../shared/header/inv-mes-header.component';
import { InvoiceService } from '../../service/invoice.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../../core/model/user';

@Component({
  selector: 'app-invoice-details',
  standalone: true,
  imports: [CommonModule, InvMesHeaderComponent],
  templateUrl: './invoice-details.component.html',
  styleUrl: './invoice-details.component.css',
})
export class InvoiceDetailsComponent implements OnInit {
  public route = inject(ActivatedRoute);
  public invoiceService = inject(InvoiceService);
  public User!: User;
  @Input() invoice: Invoice | undefined;

  public invoicePage: Boolean = true;
  public invoiceImage: Boolean = false;

  ngOnInit(): void {
    this.invoice_id();
    const id = this.route.snapshot.paramMap.get('id') || '';
    this.getInvoice(id);
    this.invoiceService.profile().subscribe({
      next: (data) => {
        data = this.User;
      },
      error: (err) => {
        console.error('Error al obtener el perfil', err);
      },
    });
  }
  getInvoice(id: any) {
    this.invoiceService.getInvoiceById(id).subscribe({
      next: (data) => {
        this.invoice = data;
      },
      error: (err) => {
        console.error('Error en detalle de factura', err);
      },
    });
  }

  invoice_id() {
    console.log(this.invoice?.id);
    return this.route.snapshot.paramMap.get('id') || '';
  }

  getInvoiceDetail() {
    this.invoiceService.getInvoiceById(this.invoice_id()).subscribe({
      next: (data) => {
        this.invoice = data;
      },
      error: (err) => {
        console.error('Error en detalle de factura', err);
      },
    });
  }
  //Cambiar vista a Imagen
  getImage() {
    this.invoicePage = false;
    this.invoiceImage = true;
  }
}
