import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Measurement, MeasurementsResponse } from '../../../../core/model/measurement';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class MeasurementService {

  http = inject(HttpClient);


  getMeasurements(): Observable<MeasurementsResponse> {
    return this.http.get<MeasurementsResponse>(`${environment.API_URL}api/measurements/`);
  }

  getMeasurementById(id: string): Observable<Measurement> {
    return this.http.get<Measurement>(`${environment.API_URL}api/measurements/${id}/`);
  }

}
