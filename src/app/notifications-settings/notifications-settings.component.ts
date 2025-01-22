import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { HomepageService } from '../home-page/service/homepage.service'; // Ajusta esta ruta si es necesario
import { User } from '../core/model/user'; // Ajusta esta ruta si es necesario
import { NotificationService } from '../notifications/service/notification.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-notifications-settings',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './notifications-settings.component.html',
  styleUrls: ['./notifications-settings.component.css'],
})
export class NotificationsSettingsComponent implements OnInit, OnDestroy {
  user!: User; // Información del usuario
  notificationSettings: any = {};

  notificationForm!: FormGroup;
  private formSubscription!: Subscription;

  private notificationService = inject(NotificationService);
  private homepageService = inject(HomepageService); // Inyección del servicio de perfil
  private router = inject(Router);

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.notificationForm = this.fb.group({
      enable_alerts: [false],
      enable_recommendations: [false],
      enable_reminders: [false],
    });

    this.loadUserProfile();
    this.loadNotificationSettings();

    this.formSubscription = this.notificationForm.valueChanges.subscribe(
      (formValues) => {
        this.updateLocalJSON(formValues);
        // this.saveSettingsToBackend();
      }
    );
  }

  ngOnDestroy(): void {
    // Cleanup to prevent memory leaks
    if (this.formSubscription) {
      this.formSubscription.unsubscribe();
    }
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
      next: (response) => {
        if (response.status === 'success') {
          this.notificationForm.patchValue(response.data); // Update the form with fetched settings
        } else {
          console.error('Error: Unexpected response format', response.message);
        }
      },
      error: (error: any) => {
        console.error('Error loading notification settings:', error);
      },
    });
  }
  



  updateLocalJSON(formValues: any): void {
    this.notificationSettings = { ...formValues };
    console.log('Updated local JSON:', this.notificationSettings);
  }


  saveSettingsToBackend(): void {
    this.notificationService.updateNotificationSettings(this.notificationSettings).subscribe({
      next: () => {
        console.log('Settings saved to backend successfully!');
      },
      error: (error: any) => {
        console.error('Error saving settings to backend:', error);
      },
    });
  }

  handlePageLeave(): void {
    this.saveSettingsToBackend();
  }
  
}
