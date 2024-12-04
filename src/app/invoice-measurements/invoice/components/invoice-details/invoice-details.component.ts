import { Component, OnInit, inject, Input, OnChanges, SimpleChanges, Inject } from '@angular/core';
import { Invoice } from '../../../../core/model/invoice';
import { RouterLink } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { InvMesHeaderComponent } from '../../../shared/header/inv-mes-header.component';
import { InvoiceService } from '../../service/invoice.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-invoice-details',
  standalone: true,
  imports: [RouterLink, CommonModule, InvMesHeaderComponent],
  templateUrl: './invoice-details.component.html',
  styleUrl: './invoice-details.component.css',
})
export class InvoiceDetailsComponent implements OnInit {


  public route = inject(ActivatedRoute);
  public invoiceService = inject(InvoiceService);
  @Input() invoice: any

  constructor( 
    
    public invoicePage: Boolean = true,
    public invoiceImage: Boolean = false,
    ) { }
    

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.invoiceService.getInvoiceById(this.invoice_id).subscribe((data) => {
        this.invoice = data;
      });
    }
  }
 
  get invoice_id(){
    console.log(this.invoice.id)
    return this.route.snapshot.paramMap.get('id') || '';
  }
  getInvoiceDetail(){
    this.invoiceService.getInvoiceById(this.invoice_id).subscribe({
      next: (data) => {
        this.invoice = data
      },
      error: (err) => {
        console.error('Error en detalle de factura', err)
      }
    })
  }
//Cambiar vista a Imagen 
  getImage(){
    this.invoicePage = false;
    this.invoiceImage = true;
  }
}
