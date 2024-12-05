import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MeasurementService } from '../../../services/measurement-service/measurement.service';
import { Measurement } from '../../../../../core/model/measurement';
import { InvMesHeaderComponent } from '../../../../shared/header/inv-mes-header.component';
import { User } from '../../../../../core/model/user';

@Component({
  selector: 'app-measurement-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './measurement-detail.component.html',
  styleUrl: './measurement-detail.component.css',
})
export class MeasurementDetailComponent implements OnInit {
  measurement: Measurement | undefined;
  modalDataNotFound: boolean = false;
  route = inject(ActivatedRoute);
  measurementService = inject(MeasurementService);
  router = inject(Router);
  user: User = {
    address: '',
    birth_date: '',
    phone_number: '',
    photo: '',
    email: '',
    fullname: '',
    dni: '',
  };
  ngOnInit() {
    this.getMeasurementDetail();
    this.measurementService.profile().subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (err) => {
        console.error('Error al obtener el perfil', err);
      },
    });
  }

  get measurementId() {
    return this.route.snapshot.paramMap.get('id') || '';
  }

  getMeasurementDetail() {
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
  get estimatedAmount() {
    return '42';
  }

  get buttonText() {
    return this.measurement?.comparison_status === 'Sin comparacion'
      ? 'Comparar'
      : 'Ver comparación';
  }

  compareInvoice() {
    if (this.measurement?.id) {
      this.measurementService.compareInvoice(this.measurement?.id).subscribe({
        next: (response) => {
          console.log('Comparison Result:', response);
        },
        error: (error) => {
          this.openModalDataNotFound();
          console.error('Error comparing:', error);
        },
      });
    } else {
      console.log('Please enter a valid id');
    }
  }

  goToComparisonDetail(id: number) {
    this.router.navigate([`measurement-compare/${id.toString()}`]);
  }

  compareOrGoToDetail() {
    return this.measurement?.comparison_status === 'Sin comparacion'
      ? this.compareInvoice()
      : this.goToComparisonDetail(this.measurement?.id!);
  }

  openModalDataNotFound() {
    this.modalDataNotFound = true;
  }

  closeModalDataNotFound() {
    this.modalDataNotFound = false;
  }
  goToInvoice() {
    this.router.navigate(['/invoice']);
  }
  goToMeasurements() {
    this.router.navigate(['measurement-search']);
  }
  goToHome() {
    this.router.navigate(['/home']);
  }
}
