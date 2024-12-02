import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invoice-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inv-mes-header.component.html',
  styleUrl: './inv-mes-header.component.css',
})
export class InvMesHeaderComponent implements OnInit {
  router = inject(Router);
  selectedTab: string = '';

  ngOnInit() {
    if (this.currentRoute.includes('invoce-listing')) {
      this.selectedTab = 'facturas';
    } else if (this.currentRoute.includes('measurement')) {
      this.selectedTab = 'mediciones';
    }
  }

  get currentRoute() {
    return this.router.url;
  }

  get showBackArrow(): boolean {
    return (
      this.currentRoute === '/measurement-compare' ||
      this.currentRoute.match(/^\/measurement-search\/\d+$/) !== null
    );
  }

  selectTab(tab: string): void {
    this.selectedTab = tab;
    const route =
      tab === 'facturas' ? '/invoce-listing' : '/measurement-search';
    this.router.navigate([route]);
  }

  goToMeasurementSearch() {
    this.router.navigate(['/measurement-search']);
  }

}
