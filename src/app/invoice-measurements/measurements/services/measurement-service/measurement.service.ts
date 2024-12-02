import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Measurement, MeasurementsResponse } from '../../../../core/model/measurement';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class MeasurementService {
  constructor() {}
  // TODO: quitar los datos estáticos cuando venga del backend
  measurementList: Measurement[] = [
    {
      id: 1,
      comparison_status: "Con discrepancia",
      measurement_start: "2023-03-01T00:00:00Z",
      measurement_end: "2023-03-31T00:00:00Z",
      data: {
        consumo_total: 213,
        periodo_medicion: {
          inicio: "2023-03-01",
          fin: "2023-03-31",
        },
        tension_promedio: 230,
        corriente_promedio: {
          punta: 23.9,
          valle: 13.0,
        },
        eventos_registrados: {
          interrupciones: 0,
          caidas_de_tension: 2,
        },
        potencia_maxima_demandada: {
          punta: 5.5,
          valle: 3.0,
        },
        consumo_por_franja_horaria: {
          punta: 146.0,
          valle: 67.0,
        },
        factor_de_potencia_promedio: 0.95,
      },
      created_at: "2024-11-30T08:36:18.639039Z",
      updated_at: "2024-11-30T08:36:18.639039Z",
      user: 2,
    },
    {
      id: 2,
      comparison_status: "Sin discrepancia",
      measurement_start: "2021-06-01T00:00:00Z",
      measurement_end: "2021-06-30T00:00:00Z",
      data: {
        consumo_total: 195,
        periodo_medicion: {
          inicio: "2021-06-01",
          fin: "2021-06-30",
        },
        tension_promedio: 230,
        corriente_promedio: {
          punta: 24.1,
          valle: 12.8,
        },
        eventos_registrados: {
          interrupciones: 1,
          caidas_de_tension: 3,
        },
        potencia_maxima_demandada: {
          punta: 5.2,
          valle: 2.9,
        },
        consumo_por_franja_horaria: {
          punta: 140.0,
          valle: 55.0,
        },
        factor_de_potencia_promedio: 0.96,
      },
      created_at: "2024-11-30T08:36:18.639039Z",
      updated_at: "2024-11-30T08:36:18.639039Z",
      user: 2,
    },
    {
      id: 3,
      comparison_status: "Con discrepancia",
      measurement_start: "2022-05-01T00:00:00Z",
      measurement_end: "2022-05-31T00:00:00Z",
      data: {
        consumo_total: 220,
        periodo_medicion: {
          inicio: "2022-05-01",
          fin: "2022-05-31",
        },
        tension_promedio: 229,
        corriente_promedio: {
          punta: 23.0,
          valle: 13.5,
        },
        eventos_registrados: {
          interrupciones: 0,
          caidas_de_tension: 1,
        },
        potencia_maxima_demandada: {
          punta: 5.6,
          valle: 3.1,
        },
        consumo_por_franja_horaria: {
          punta: 150.0,
          valle: 70.0,
        },
        factor_de_potencia_promedio: 0.94,
      },
      created_at: "2024-11-30T08:36:18.639039Z",
      updated_at: "2024-11-30T08:36:18.639039Z",
      user: 2,
    },
    {
      id: 4,
      comparison_status: "Sin discrepancia",
      measurement_start: "2023-01-01T00:00:00Z",
      measurement_end: "2023-01-31T00:00:00Z",
      data: {
        consumo_total: 205,
        periodo_medicion: {
          inicio: "2023-01-01",
          fin: "2023-01-31",
        },
        tension_promedio: 231,
        corriente_promedio: {
          punta: 22.8,
          valle: 14.1,
        },
        eventos_registrados: {
          interrupciones: 2,
          caidas_de_tension: 2,
        },
        potencia_maxima_demandada: {
          punta: 5.3,
          valle: 3.2,
        },
        consumo_por_franja_horaria: {
          punta: 148.0,
          valle: 57.0,
        },
        factor_de_potencia_promedio: 0.97,
      },
      created_at: "2024-11-30T08:36:18.639039Z",
      updated_at: "2024-11-30T08:36:18.639039Z",
      user: 2,
    },
    {
      id: 5,
      comparison_status: "Sin comparar",
      measurement_start: "2024-07-01T00:00:00Z",
      measurement_end: "2024-07-31T00:00:00Z",
      data: {
        consumo_total: 205,
        periodo_medicion: {
          inicio: "2024-07-01",
          fin: "2024-07-31",
        },
        tension_promedio: 230,
        corriente_promedio: {
          punta: 23.7,
          valle: 13.2,
        },
        eventos_registrados: {
          interrupciones: 1,
          caidas_de_tension: 0,
        },
        potencia_maxima_demandada: {
          punta: 5.4,
          valle: 3.0,
        },
        consumo_por_franja_horaria: {
          punta: 147.0,
          valle: 58.0,
        },
        factor_de_potencia_promedio: 0.95,
      },
      created_at: "2024-11-30T08:36:18.639039Z",
      updated_at: "2024-11-30T08:36:18.639039Z",
      user: 2,
    },
    {
      id: 6,
      comparison_status: "Sin comparar",
      measurement_start: "2024-08-01T00:00:00Z",
      measurement_end: "2024-08-31T00:00:00Z",
      data: {
        consumo_total: 210,
        periodo_medicion: {
          inicio: "2024-08-01",
          fin: "2024-08-31",
        },
        tension_promedio: 231,
        corriente_promedio: {
          punta: 22.5,
          valle: 13.3,
        },
        eventos_registrados: {
          interrupciones: 0,
          caidas_de_tension: 1,
        },
        potencia_maxima_demandada: {
          punta: 5.8,
          valle: 3.2,
        },
        consumo_por_franja_horaria: {
          punta: 145.0,
          valle: 65.0,
        },
        factor_de_potencia_promedio: 0.98,
      },
      created_at: "2024-11-30T08:36:18.639039Z",
      updated_at: "2024-11-30T08:36:18.639039Z",
      user: 2,
    },
    {
      id: 7,
      comparison_status: "Con discrepancia",
      measurement_start: "2024-09-01T00:00:00Z",
      measurement_end: "2024-09-30T00:00:00Z",
      data: {
        consumo_total: 210,
        periodo_medicion: {
          inicio: "2024-09-01",
          fin: "2024-09-30",
        },
        tension_promedio: 230,
        corriente_promedio: {
          punta: 23.8,
          valle: 13.4,
        },
        eventos_registrados: {
          interrupciones: 0,
          caidas_de_tension: 1,
        },
        potencia_maxima_demandada: {
          punta: 5.7,
          valle: 3.1,
        },
        consumo_por_franja_horaria: {
          punta: 144.0,
          valle: 61.0,
        },
        factor_de_potencia_promedio: 0.96,
      },
      created_at: "2024-11-30T08:36:18.639039Z",
      updated_at: "2024-11-30T08:36:18.639039Z",
      user: 2,
    },
    {
      id: 8,
      comparison_status: "Sin comparar",
      measurement_start: "2024-10-01T00:00:00Z",
      measurement_end: "2024-10-31T00:00:00Z",
      data: {
        consumo_total: 220,
        periodo_medicion: {
          inicio: "2024-10-01",
          fin: "2024-10-31",
        },
        tension_promedio: 229,
        corriente_promedio: {
          punta: 23.3,
          valle: 13.5,
        },
        eventos_registrados: {
          interrupciones: 1,
          caidas_de_tension: 2,
        },
        potencia_maxima_demandada: {
          punta: 5.9,
          valle: 3.3,
        },
        consumo_por_franja_horaria: {
          punta: 143.0,
          valle: 77.0,
        },
        factor_de_potencia_promedio: 0.94,
      },
      created_at: "2024-11-30T08:36:18.639039Z",
      updated_at: "2024-11-30T08:36:18.639039Z",
      user: 2,
    },
    {
      id: 9,
      comparison_status: "Sin comparar",
      measurement_start: "2024-11-01T00:00:00Z",
      measurement_end: "2024-11-30T00:00:00Z",
      data: {
        consumo_total: 225,
        periodo_medicion: {
          inicio: "2024-11-01",
          fin: "2024-11-30",
        },
        tension_promedio: 230,
        corriente_promedio: {
          punta: 24.0,
          valle: 13.9,
        },
        eventos_registrados: {
          interrupciones: 0,
          caidas_de_tension: 1,
        },
        potencia_maxima_demandada: {
          punta: 6.0,
          valle: 3.5,
        },
        consumo_por_franja_horaria: {
          punta: 145.0,
          valle: 80.0,
        },
        factor_de_potencia_promedio: 0.95,
      },
      created_at: "2024-11-30T08:36:18.639039Z",
      updated_at: "2024-11-30T08:36:18.639039Z",
      user: 2,
    },
    {
      id: 10,
      comparison_status: "Con discrepancia",
      measurement_start: "2024-12-01T00:00:00Z",
      measurement_end: "2024-12-31T00:00:00Z",
      data: {
        consumo_total: 200,
        periodo_medicion: {
          inicio: "2024-12-01",
          fin: "2024-12-31",
        },
        tension_promedio: 230,
        corriente_promedio: {
          punta: 23.0,
          valle: 14.0,
        },
        eventos_registrados: {
          interrupciones: 1,
          caidas_de_tension: 2,
        },
        potencia_maxima_demandada: {
          punta: 5.5,
          valle: 3.4,
        },
        consumo_por_franja_horaria: {
          punta: 130.0,
          valle: 70.0,
        },
        factor_de_potencia_promedio: 0.97,
      },
      created_at: "2024-11-30T08:36:18.639039Z",
      updated_at: "2024-11-30T08:36:18.639039Z",
      user: 2,
    },
    {
      id: 11,
      comparison_status: "Sin comparar",
      measurement_start: "2024-07-01T00:00:00Z",
      measurement_end: "2024-07-31T00:00:00Z",
      data: {
        consumo_total: 225,
        periodo_medicion: {
          inicio: "2024-07-01",
          fin: "2024-07-31",
        },
        tension_promedio: 230,
        corriente_promedio: {
          punta: 23.5,
          valle: 13.6,
        },
        eventos_registrados: {
          interrupciones: 0,
          caidas_de_tension: 2,
        },
        potencia_maxima_demandada: {
          punta: 5.5,
          valle: 3.2,
        },
        consumo_por_franja_horaria: {
          punta: 138.0,
          valle: 87.0,
        },
        factor_de_potencia_promedio: 0.97,
      },
      created_at: "2024-11-30T08:36:18.639039Z",
      updated_at: "2024-11-30T08:36:18.639039Z",
      user: 2,
    },
    {
      id: 12,
      comparison_status: "Con discrepancia",
      measurement_start: "2024-06-01T00:00:00Z",
      measurement_end: "2024-06-30T00:00:00Z",
      data: {
        consumo_total: 195,
        periodo_medicion: {
          inicio: "2024-06-01",
          fin: "2024-06-30",
        },
        tension_promedio: 229,
        corriente_promedio: {
          punta: 22.8,
          valle: 14.0,
        },
        eventos_registrados: {
          interrupciones: 0,
          caidas_de_tension: 1,
        },
        potencia_maxima_demandada: {
          punta: 5.4,
          valle: 3.0,
        },
        consumo_por_franja_horaria: {
          punta: 142.0,
          valle: 53.0,
        },
        factor_de_potencia_promedio: 0.98,
      },
      created_at: "2024-11-30T08:36:18.639039Z",
      updated_at: "2024-11-30T08:36:18.639039Z",
      user: 2,
    },
    {
      id: 13,
      comparison_status: "Sin comparar",
      measurement_start: "2024-06-01T00:00:00Z",
      measurement_end: "2024-06-30T00:00:00Z",
      data: {
        consumo_total: 210,
        periodo_medicion: {
          inicio: "2024-06-01",
          fin: "2024-06-30",
        },
        tension_promedio: 230,
        corriente_promedio: {
          punta: 23.1,
          valle: 12.9,
        },
        eventos_registrados: {
          interrupciones: 0,
          caidas_de_tension: 0,
        },
        potencia_maxima_demandada: {
          punta: 5.6,
          valle: 3.2,
        },
        consumo_por_franja_horaria: {
          punta: 146.0,
          valle: 64.0,
        },
        factor_de_potencia_promedio: 0.94,
      },
      created_at: "2024-11-30T08:36:18.639039Z",
      updated_at: "2024-11-30T08:36:18.639039Z",
      user: 2,
    },
    {
      id: 14,
      comparison_status: "Sin comparar",
      measurement_start: "2024-05-01T00:00:00Z",
      measurement_end: "2024-05-31T00:00:00Z",
      data: {
        consumo_total: 215,
        periodo_medicion: {
          inicio: "2024-05-01",
          fin: "2024-05-31",
        },
        tension_promedio: 230,
        corriente_promedio: {
          punta: 23.3,
          valle: 13.1,
        },
        eventos_registrados: {
          interrupciones: 1,
          caidas_de_tension: 0,
        },
        potencia_maxima_demandada: {
          punta: 5.7,
          valle: 3.3,
        },
        consumo_por_franja_horaria: {
          punta: 140.0,
          valle: 75.0,
        },
        factor_de_potencia_promedio: 0.96,
      },
      created_at: "2024-11-30T08:36:18.639039Z",
      updated_at: "2024-11-30T08:36:18.639039Z",
      user: 2,
    },
    {
      id: 15,
      comparison_status: "Sin comparar",
      measurement_start: "2024-04-01T00:00:00Z",
      measurement_end: "2024-04-30T00:00:00Z",
      data: {
        consumo_total: 225,
        periodo_medicion: {
          inicio: "2024-04-01",
          fin: "2024-04-30",
        },
        tension_promedio: 230,
        corriente_promedio: {
          punta: 23.0,
          valle: 12.8,
        },
        eventos_registrados: {
          interrupciones: 0,
          caidas_de_tension: 1,
        },
        potencia_maxima_demandada: {
          punta: 5.6,
          valle: 3.4,
        },
        consumo_por_franja_horaria: {
          punta: 141.0,
          valle: 79.0,
        },
        factor_de_potencia_promedio: 0.95,
      },
      created_at: "2024-11-30T08:36:18.639039Z",
      updated_at: "2024-11-30T08:36:18.639039Z",
      user: 2,
    }
  ]

  http = inject(HttpClient);

  //se usa para pruebas con la lista estática de mediciones
  getAllMeasurements(): Observable<Measurement[]> {
    return of(this.measurementList);
  }

  // pruebas: obtiene una medición por ID
  getMeasurementById(id: number): Observable<Measurement | undefined> {
    const measurement = this.measurementList.find((m) => m.id === id);
    return of(measurement);
  }

  getMeasurements(): Observable<MeasurementsResponse> {
    return this.http.get<MeasurementsResponse>(`${environment.API_URL}api/measurements/`);
  }

}
