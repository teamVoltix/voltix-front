import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Measurement,
  MeasurementsResponse,
} from '../../../../core/model/measurement';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment.development';
import {
  ComparisonResponse,
  ComparisonResults,
} from '../../../../core/model/comparison';
import { User } from '../../../../core/model/user';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class MeasurementService {
  private router = inject(Router);
  http = inject(HttpClient);

  getMeasurements(): Observable<MeasurementsResponse> {
    return this.http.get<MeasurementsResponse>(
      `${environment.API_URL}api/measurements/`
    );
  }

  getMeasurementById(id: string): Observable<Measurement> {
    return this.http.get<Measurement>(
      `${environment.API_URL}api/measurements/${id}/`
    );
  }

  /**
   * @param invoiceId
   * @returns POST para la comparación medición/factura
   */
  // compareInvoice(invoiceId: number): Observable<ComparisonResults> {
  //   const body = { invoice: invoiceId };
  //   return this.http.post<ComparisonResults>(
  //     `${environment.API_URL}comparations/compare/`,
  //     body
  //   );
  // }
  
  // compareCurrentMeasurement(route: ActivatedRoute): Observable<ComparisonResults> {
  //   const measurementId = Number(route.snapshot.paramMap.get('measurementId')); // Retrieve measurement ID from route
  //   if (!measurementId) {
  //     throw new Error('Measurement ID not found in the route parameters.');
  //   }
  
  //   const body = { invoice: measurementId }; // Send the measurement ID directly
  //   return this.http.post<ComparisonResults>(
  //     `${environment.API_URL}comparations/compare/`,
  //     body
  //   );
  // }
  
  compareCurrentMeasurement(measurementId: number): Observable<ComparisonResults> {
    const body = { invoice: measurementId }; // Send the measurement ID directly in the body
    return this.http.post<ComparisonResults>(
      `${environment.API_URL}comparations/compare/`,
      body
    );
  }
  
  

  getComparisonDetails(comparisonId: number): Observable<ComparisonResponse> {
    return this.http.get<ComparisonResponse>(
      `${environment.API_URL}comparations/comparisons/${comparisonId}/`
    );
  }
  profile(): Observable<User> {
    return this.http.get<User>(`${environment.API_URL}api/profile/`);
  }
  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
