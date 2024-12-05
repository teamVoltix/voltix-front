import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../../core/model/user';
import { HomepageService } from '../../../home-page/service/homepage.service';

@Component({
  selector: 'app-invoice-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './inv-mes-header.component.html',
  styleUrl: './inv-mes-header.component.css',
})
export class InvMesHeaderComponent implements OnInit {
  router = inject(Router);
  service = inject(HomepageService);
  selectedTab: string = '';
  user!: User;

  ngOnInit() {
    this.service.profile().subscribe({
      next: (user) => {
        this.user = user;
      },
      error: (error) => {
        console.error(error);
      },
    });
    if (this.currentRoute.includes('invoice')) {
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
      this.currentRoute.match(/^\/measurement-compare\/\d+$/) !== null ||
      this.currentRoute.match(/^\/measurement-search\/\d+$/) !== null
    );
  }

  selectTab(tab: string): void {
    this.selectedTab = tab;
    const route = tab === 'facturas' ? '/invoice' : '/measurement-search';
    this.router.navigate([route]);
  }

  goToMeasurementSearch() {
    this.router.navigate(['/measurement-search']);
  }
}
