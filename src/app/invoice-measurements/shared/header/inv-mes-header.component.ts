import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-invoice-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inv-mes-header.component.html',
  styleUrl: './inv-mes-header.component.css'
})
export class InvMesHeaderComponent {
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
