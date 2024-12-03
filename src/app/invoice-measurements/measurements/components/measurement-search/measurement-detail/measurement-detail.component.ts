import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MeasurementService } from '../../../services/measurement-service/measurement.service';
import { Measurement } from '../../../../../core/model/measurement';
import { InvMesHeaderComponent } from '../../../../shared/header/inv-mes-header.component';


@Component({
  selector: 'app-measurement-detail',
  standalone: true,
  imports: [CommonModule, InvMesHeaderComponent],
  templateUrl: './measurement-detail.component.html',
  styleUrl: './measurement-detail.component.css',
})
export class MeasurementDetailComponent {
  measurement: Measurement | undefined;

  route = inject(ActivatedRoute);
  measurementService = inject(MeasurementService);

  ngOnInit() {
    this.getMeasurementDetail();
  }

  get measurementId(){
    return this.route.snapshot.paramMap.get('id') || '';
  }

  getMeasurementDetail(){
    this.measurementService.getMeasurementById(this.measurementId).subscribe({
      next: (data) => {
        this.measurement = data;
      },
      error: (err) => {
        console.error('Error al obtener el detalle de la medición:', err);
      },
    });
  }

  calculateDaysBetweenDates(start: string, end: string): number {
    if (!start || !end) {
      return 0;
    }

    const startDate = new Date(start);
    const endDate = new Date(end);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      console.error('Fechas no válidas:', startDate, endDate);
      return 0;
    }

    const diffTime = endDate.getTime() - startDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    return diffDays;
  }


  //TODO: calculo de la cantidad a pagar, no viene en los datos del api¿?
  get estimatedAmount(){
    return '42';
  }

  get buttonText() {
    return this.measurement?.comparison_status === 'Sin comparacion'
      ? 'Comparar'
      : 'Ver comparación';
  }
}
