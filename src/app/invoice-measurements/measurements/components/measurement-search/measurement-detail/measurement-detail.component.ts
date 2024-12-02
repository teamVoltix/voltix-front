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
  measurementId!: number;
  measurement: Measurement | undefined;

  route = inject(ActivatedRoute);
  measurementService = inject(MeasurementService);

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.measurementId = +params['id']; // Obtener el id de la URL
      this.measurementService
        .getMeasurementById(this.measurementId)
        .subscribe((measurement) => {
          this.measurement = measurement;
        });
    });
  }

  calculateDaysBetweenDates(start: string, end: string): number {
    if (!start || !end) {
      console.error('Las fechas de inicio o fin son inválidas:', start, end);
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


  //TODO: calculo de la cantidad a pagar¿?
  get estimatedAmount(){
    return '42';
  }

  get buttonText() {
    return this.measurement?.comparison_status === 'Sin comparar'
      ? 'Comparar'
      : 'Ver comparación';
  }
}
