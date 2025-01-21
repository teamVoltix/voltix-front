import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { HomepageService } from '../home-page/service/homepage.service'; // Ajusta esta ruta si es necesario
import { User } from '../core/model/user'; // Ajusta esta ruta si es necesario

@Component({
  selector: 'app-notifications-settings',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './notifications-settings.component.html',
  styleUrls: ['./notifications-settings.component.css'],
})
export class NotificationsSettingsComponent implements OnInit {
  user!: User; // Información del usuario

  private homepageService = inject(HomepageService); // Inyección del servicio de perfil
  private router = inject(Router);

  constructor() {}

  ngOnInit(): void {
    this.loadUserProfile(); // Cargar el perfil del usuario al iniciar
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
}
