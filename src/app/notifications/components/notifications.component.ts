import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { NotificationService } from '../service/notification.service';
import { HomepageService } from '../../home-page/service/homepage.service';
import { User } from '../../core/model/user';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
})
export class NotificationsComponent implements OnInit {
  notifications: any[] = []; // Lista combinada de notificaciones
  selectedTab: string = ''; // Para manejar la pestaña seleccionada (facturas o mediciones)
  user!: User; // Información del usuario

  private notificationService = inject(NotificationService);
  private homepageService = inject(HomepageService);
  private router = inject(Router);

  constructor() {}

  ngOnInit(): void {
    this.loadServiceNotifications();
    this.loadUserProfile();
    this.setSelectedTab();
  }

  // Cargar notificaciones desde el servicio
  loadServiceNotifications(): void {
    this.notificationService.getServiceNotifications().subscribe(
      (notifications) => {
        const alertNotifications = notifications.filter(
          (notification) => notification.notification_type === 'alerta'
        );
        const reminderNotifications = notifications.filter(
          (notification) => notification.notification_type === 'recordatorio'
        );

        this.notifications = [...alertNotifications, ...reminderNotifications];

        // Ordenar las notificaciones por fecha (usando la propiedad 'timestamp')
        this.notifications.sort(
          (a, b) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
      },
      (error) => {
        console.error('Error al cargar notificaciones del servicio:', error);
      }
    );
  }

  // Cargar el perfil del usuario desde el servicio
  loadUserProfile(): void {
    this.homepageService.profile().subscribe({
      next: (user) => {
        this.user = user;
      },
      error: (error) => {
        console.error('Error al cargar el perfil del usuario:', error);
      },
    });
  }

  // Determinar la pestaña seleccionada según la ruta actual
  setSelectedTab(): void {
    if (this.currentRoute.includes('invoice')) {
      this.selectedTab = 'facturas';
    } else if (this.currentRoute.includes('measurement')) {
      this.selectedTab = 'mediciones';
    }
  }

  // Getter para la ruta actual
  get currentRoute(): string {
    return this.router.url;
  }

  // Mostrar flecha de retroceso según la ruta actual
  get showBackArrow(): boolean {
    return (
      this.currentRoute.match(/^\/measurement-compare\/\d+$/) !== null ||
      this.currentRoute.match(/^\/measurement-search\/\d+$/) !== null
    );
  }

  // Seleccionar una pestaña (facturas o mediciones)
  selectTab(tab: string): void {
    this.selectedTab = tab;
    const route = tab === 'facturas' ? '/invoice' : '/measurement-search';
    this.router.navigate([route]);
  }

  // Navegar a la búsqueda de mediciones
  goToMeasurementSearch(): void {
    this.router.navigate(['/measurement-search']);
  }
}
