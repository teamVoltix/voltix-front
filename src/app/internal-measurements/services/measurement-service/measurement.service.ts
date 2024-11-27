import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Measurement } from '../../../model/measurement';

@Injectable({
  providedIn: 'root'
})
export class MeasurementService {

  constructor() { }
  // TODO: quitar los datos estáticos cuando venga del backend
  measurementList: Measurement [] = [
    {
      checked: true,
      id: 664705,
      date: '08/05/2024',
      compare: 'Sin comparar',
      initialDate: '01/05/2024',
      endDate: '31/05/2024',
      measuredDays: 31,
      consumption: 266,
      estimatedAmount: 48
    },
    {
      checked: false,
      id: 565644,
      date: '09/05/2024',
      compare: 'Con discrepancias',
      initialDate: '01/05/2024',
      endDate: '31/05/2024',
      measuredDays: 31,
      consumption: 356,
      estimatedAmount: 75
    },
    {
      checked: true,
      id: 584846,
      date: '10/05/2024',
      compare: 'Sin discrepancias',
      initialDate: '01/05/2024',
      endDate: '31/05/2024',
      measuredDays: 31,
      consumption: 266,
      estimatedAmount: 48
    },
    {
      checked: false,
      id: 565656,
      date: '11/05/2024',
      compare: 'Sin comparar',
      initialDate: '01/05/2024',
      endDate: '31/05/2024',
      measuredDays: 31,
      consumption: 266,
      estimatedAmount: 48
    },
    {
      checked: true,
      id: 565644,
      date: '12/05/2024',
      compare: 'Con discrepancias',
      initialDate: '01/05/2024',
      endDate: '31/05/2024',
      measuredDays: 31,
      consumption: 266,
      estimatedAmount: 48
    },
    {
      checked: true,
      id: 664705,
      date: '08/05/2024',
      compare: 'Sin comparar',
      initialDate: '01/05/2024',
      endDate: '31/05/2024',
      measuredDays: 31,
      consumption: 266,
      estimatedAmount: 48
    },
    {
      checked: false,
      id: 565644,
      date: '09/05/2024',
      compare: 'Con discrepancias',
      initialDate: '01/05/2024',
      endDate: '31/05/2024',
      measuredDays: 31,
      consumption: 266,
      estimatedAmount: 48
    },
    {
      checked: true,
      id: 584846,
      date: '10/05/2024',
      compare: 'Sin discrepancias',
      initialDate: '01/05/2024',
      endDate: '31/05/2024',
      measuredDays: 31,
      consumption: 266,
      estimatedAmount: 48
    },
    {
      checked: false,
      id: 565656,
      date: '11/05/2024',
      compare: 'Sin comparar',
      initialDate: '01/05/2024',
      endDate: '31/05/2024',
      measuredDays: 31,
      consumption: 266,
      estimatedAmount: 48
    },
    {
      checked: true,
      id: 565644,
      date: '12/05/2024',
      compare: 'Con discrepancias',
      initialDate: '01/05/2024',
      endDate: '31/05/2024',
      measuredDays: 31,
      consumption: 266,
      estimatedAmount: 48
    },
    {
      checked: true,
      id: 664705,
      date: '08/05/2024',
      compare: 'Sin comparar',
      initialDate: '01/05/2024',
      endDate: '31/05/2024',
      measuredDays: 31,
      consumption: 266,
      estimatedAmount: 48
    },
    {
      checked: false,
      id: 565644,
      date: '09/05/2024',
      compare: 'Con discrepancias',
      initialDate: '01/05/2024',
      endDate: '31/05/2024',
      measuredDays: 31,
      consumption: 266,
      estimatedAmount: 48
    },
    {
      checked: true,
      id: 584846,
      date: '10/05/2024',
      compare: 'Sin discrepancias',
      initialDate: '01/05/2024',
      endDate: '31/05/2024',
      measuredDays: 31,
      consumption: 266,
      estimatedAmount: 48
    },
    {
      checked: false,
      id: 565656,
      date: '11/05/2024',
      compare: 'Sin comparar',
      initialDate: '01/05/2024',
      endDate: '31/05/2024',
      measuredDays: 31,
      consumption: 266,
      estimatedAmount: 48
    },
    {
      checked: true,
      id: 565644,
      date: '12/05/2024',
      compare: 'Con discrepancias',
      initialDate: '01/05/2024',
      endDate: '31/05/2024',
      measuredDays: 31,
      consumption: 266,
      estimatedAmount: 48
    },
  ];

  // Obtiene todas las mediciones
  getAllMeasurements(): Observable<Measurement[]> {
    return of(this.measurementList);
  }

  // Obtiene una medición por ID
  getMeasurementById(id: number): Observable<Measurement | undefined> {
    const measurement = this.measurementList.find(m => m.id === id);
    return of(measurement);
  }
}
