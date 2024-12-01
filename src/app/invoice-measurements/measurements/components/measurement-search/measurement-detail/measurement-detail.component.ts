import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MeasurementService } from '../../../services/measurement-service/measurement.service';
import { InvMesHeaderComponent } from '../../../../shared/header/inv-mes-header.component';
import { Measurement } from '../../../../../core/model/measurement';

@Component({
  selector: 'app-measurement-detail',
  standalone: true,
  imports: [CommonModule,InvMesHeaderComponent],
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

  get buttonText() {
    return this.measurement?.compare === 'Sin comparar'
      ? 'Comparar'
      : 'Ver comparación';
  }
}
