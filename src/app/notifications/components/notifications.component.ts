import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../service/notification.service';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
})
export class NotificationsComponent implements OnInit {
  notifications: any[] = [];  // Lista combinada de notificaciones

  private notificationService = inject(NotificationService);

  constructor() {}

  ngOnInit(): void {
    this.loadServiceNotifications();
  }

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

        // Ordenar las notificaciones por fecha (suponiendo que 'timestamp' es la propiedad que contiene la fecha de llegada)
        this.notifications.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      },
      (error) => {
        console.error('Error al cargar notificaciones del servicio:', error);
      }
    );
  }
}
