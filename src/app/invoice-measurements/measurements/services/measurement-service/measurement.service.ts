import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Measurement, MeasurementsResponse } from '../../../../core/model/measurement';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment.development';
import { ComparisonResponse, ComparisonResults } from '../../../../core/model/comparison';


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

  /**
   * @param invoiceId
   * @returns POST para la comparación medición/factura
   */
  compareInvoice(invoiceId: number): Observable<ComparisonResults> {
    const body = { invoice: invoiceId };
    return this.http.post<ComparisonResults>(`${environment.API_URL}comparations/compare/`, body);
  }

  getComparisonDetails(comparisonId: number): Observable<ComparisonResponse> {
    return this.http.get<ComparisonResponse>(`${environment.API_URL}comparations/comparisons/${comparisonId}/`);
  }


}
