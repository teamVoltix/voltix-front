import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private http = inject(HttpClient);
  private url = environment.API_URL;

  constructor() {}

  // Obtener las notificaciones del servicio
  getServiceNotifications(): Observable<any[]> {
    return this.http.get<any[]>(this.url + 'api/notifications/service/');
  }
  
  // Obtener configuracion de notificaciones
  getGeneralNotifications(): Observable<any[]> {
    return this.http.get<any[]>(this.url + 'api/notifications/settings/');
  }

  // Get all general notification settings for the user
  getNotificationSettings(): Observable<any> {
    return this.http.get<any>(`${this.url}api/notifications/settings/`);
  }

  // Update notification settings for the user
  updateNotificationSettings(payload: any): Observable<any> {
    return this.http.post<any>(`${this.url}api/notifications/settings/update/`, payload);
  }

}
