import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-invoice-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './invoice-header.component.html',
  styleUrl: './invoice-header.component.css'
})
export class InvoiceHeaderComponent {
  selectedTab: string = 'facturas'; // Por defecto, selecciona 'Facturas'

  selectTab(tab: string): void {
    this.selectedTab = tab;
  }

}
