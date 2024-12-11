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

  // Obtener todas las notificaciones generales
  getGeneralNotifications(): Observable<any[]> {
    return this.http.get<any[]>(this.url + 'api/notifications/general/settings/');
  }

  // Obtener las notificaciones del servicio
  getServiceNotifications(): Observable<any[]> {
    return this.http.get<any[]>(this.url + 'api/notifications/service/');
  }
}
