import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { NotificationService } from '../service/notification.service';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule], // Asegúrate de incluir CommonModule aquí
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
})
export class NotificationsComponent implements OnInit {
  generalNotifications: any[] = []; // Solo necesitamos esta propiedad

  private notificationService = inject(NotificationService);

  constructor() {}

  ngOnInit(): void {
    this.loadServiceNotifications(); // Vamos a cargar las notificaciones de servicio y fusionarlas
  }

  loadServiceNotifications(): void {
    this.notificationService.getServiceNotifications().subscribe(
      (notifications) => {
        // Añadir las notificaciones de servicio a las generales
        this.generalNotifications.push(...notifications);
      },
      (error) => {
        console.error('Error al cargar notificaciones del servicio:', error);
      }
    );
  }
}
