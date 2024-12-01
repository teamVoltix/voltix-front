import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-invoice-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './invoice-header.component.html',
  styleUrl: './invoice-header.component.css'
})
export class InvoiceHeaderComponent {
  router=inject(Router)
  selectedTab: string = 'facturas'; // Por defecto, selecciona 'Facturas'

  selectTab(tab: string): void {
    this.selectedTab = tab;
  }
  invoice(){
    this.router.navigate([`/invoce-listing`])
  }
  medicion(){
    this.router.navigate([`/start`])
  }

}
