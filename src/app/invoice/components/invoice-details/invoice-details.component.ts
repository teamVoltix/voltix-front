import { Component } from '@angular/core';
import { Invoice } from '../../../model/invoice'

@Component({
  selector: 'app-invoice-details',
  standalone: true,
  imports: [],
  templateUrl: './invoice-details.component.html',
  styleUrl: './invoice-details.component.css'
})
export class InvoiceDetailsComponent {
  public editar:Boolean = false;
  public factura: Invoice;
  constructor(){
    this.factura = {
      id:"12",
      fecha: "12/02/2024",
      periodo:"20/01/2024 al 20/03/2024",
      consumo:"33",
      importe:"25",
      imagen:'https://www.ocu.org/-/media/ocu/images/home/vivienda%20y%20energia/gas%20y%20luz/factura%20luz%202021/iberdrola_1/imagen%20factura.png',
      }
    }
}
