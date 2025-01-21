import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { HomepageService } from '../home-page/service/homepage.service'; // Ajusta esta ruta si es necesario
import { User } from '../core/model/user'; // Ajusta esta ruta si es necesario
import { NotificationService } from '../notifications/service/notification.service';

@Component({
  selector: 'app-notifications-settings',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './notifications-settings.component.html',
  styleUrls: ['./notifications-settings.component.css'],
})
export class NotificationsSettingsComponent implements OnInit {
  user!: User; // Información del usuario
  notificationSettings: any = {};
  private notificationService = inject(NotificationService);
  private homepageService = inject(HomepageService); // Inyección del servicio de perfil
  private router = inject(Router);

  constructor() {}

  ngOnInit(): void {
    this.loadUserProfile();
    this.loadNotificationSettings();
  }

  // Cargar el perfil del usuario desde el servicio
  loadUserProfile(): void {
    this.homepageService.profile().subscribe({
      next: (user: User) => {
        this.user = user;
      },
      error: (error: any) => {
        console.error('Error al cargar el perfil del usuario:', error);
      },
    });
  }

  // Método para redirigir a la vista de notificaciones
  goToNotifications(): void {
    this.router.navigate(['/notifications']);
  }

  // Getter para mostrar la flecha de retroceso
  get showBackArrow(): boolean {
    return true; // Mostrar siempre la flecha de retroceso en esta vista
  }

  loadNotificationSettings(): void {
    this.notificationService.getNotificationSettings().subscribe({
      next: (settings) => {
        this.notificationSettings = settings.data; // Assuming the backend returns settings in a `data` field
      },
      error: (error: any) => {
        console.error('Error loading notification settings:', error);
      },
    });
  }

  updateNotificationSettings(): void {
    this.notificationService.updateNotificationSettings(this.notificationSettings).subscribe({
      next: (response) => {
        console.log('Notification settings updated:', response);
      },
      error: (error: any) => {
        console.error('Error updating notification settings:', error);
      },
    });
  }
  
}
