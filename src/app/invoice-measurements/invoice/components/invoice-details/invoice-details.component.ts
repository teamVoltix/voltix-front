import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Invoice } from '../../../../core/model/invoice';
import { RouterLink } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { InvMesHeaderComponent } from '../../../shared/header/inv-mes-header.component';
import { InvoiceService } from '../../service/invoice.service';

@Component({
  selector: 'app-invoice-details',
  standalone: true,
  imports: [RouterLink, CommonModule, InvMesHeaderComponent],
  templateUrl: './invoice-details.component.html',
  styleUrl: './invoice-details.component.css',
})
export class InvoiceDetailsComponent  {
  
  @Input() invoice_id: string | null = null; // Recibe el ID de la factura desde el componente padre
  invoice: any;
  

  constructor( 
    // public invoice_id: string = '2',
    public invoicePage: Boolean = true,
    public invoiceImage: Boolean = false,
    private invoiceService: InvoiceService,
    
    ) {
    
  }
  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes['invoiceId'] && this.invoiceId) {
  //     this.loadInvoiceDetails();
  //   }
  // }

  // Cargar detalles de la factura
  loadInvoiceDetails(): void {
    if (this.invoice_id) {
      this.invoiceService.getInvoiceById(this.invoice_id).subscribe(
        (data) => {
          this.invoice_id = data;
        },
        (error) => {
          console.error('Error al cargar los detalles de la factura', error);
        }
      );
    }
  }
//Cambiar vista a Imagen 
  getImage(){
    this.invoicePage = false;
    this.invoiceImage = true;
  }
}
