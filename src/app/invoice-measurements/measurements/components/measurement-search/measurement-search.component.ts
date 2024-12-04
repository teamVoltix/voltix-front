import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';

import { Router } from '@angular/router';
import { MeasurementService } from '../../services/measurement-service/measurement.service';
import { ReportService } from '../../services/report-service/report.service';
import { ReportDownloadComponent } from '../report-download/report-download.component';
import { FormsModule } from '@angular/forms';
import { InvMesHeaderComponent } from '../../../shared/header/inv-mes-header.component';
import { Measurement } from '../../../../core/model/measurement';

@Component({
  selector: 'app-measurement-search',
  standalone: true,
  imports: [
    CommonModule,
    ReportDownloadComponent,
    InvMesHeaderComponent,
    FormsModule,
  ],
  providers: [DatePipe],
  templateUrl: './measurement-search.component.html',
  styleUrl: './measurement-search.component.css',
})
export class MeasurementSearchComponent {
  isHoverPrevious = false;
  isHoverNext = false;
  measurementList: Measurement[] = [];
  searchQuery: string = '';
  filteredMeasurements: Measurement[] = [];
  timeout: any;

  router = inject(Router);
  measurementService = inject(MeasurementService);
  reportService = inject(ReportService);
  datePipe = inject(DatePipe);

  ngOnInit() {
    this.getMeasurements();
  }

  getMeasurements(): void {
    this.measurementService.getMeasurements().subscribe({
      next: (data) => {
        this.measurementList = data.measurements;
        this.measurementList = this.measurementList.map(
          (measurement: Measurement) => ({
            ...measurement,
            checked: false,
          })
        );

        this.filteredMeasurements = [...this.measurementList];
      },
      error: (err) => {
        console.error('Error al obtener las mediciones:', err);
      },
    });
  }

  isAllChecked(): boolean {
    return this.measurementList.every((measurement) => measurement.checked);
  }

  checkedAll() {
    const newCheckedState = !this.isAllChecked();
    this.measurementList.forEach((measurement) => {
      measurement.checked = newCheckedState;
    });
  }

  toggleChecked(measurement: any): void {
    measurement.checked = !measurement.checked;
  }

  itemsPerPage = 6; // Número de elementos por página
  currentPage = 1; // Página actual

  get totalPages() {
    return Math.ceil(this.filteredMeasurements.length / this.itemsPerPage);
  }

  // Obtener los elementos de la página actual
  get paginatedItems() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredMeasurements.slice(start, end);
  }

  // Números de las páginas
  get pageNumbers() {
    const pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  // Ir a una página específica
  goToPage(event: any, page: number) {
    event.preventDefault();
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

  onSearchChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const trimmedValue = input.value.trim(); // Eliminar los espacios antes y después

    this.searchQuery = trimmedValue;

    // Limpiar el timeout anterior, si existe
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    // Establecer un nuevo timeout para ejecutar la búsqueda después de 500ms
    this.timeout = setTimeout(() => {
      this.filterMeasurements(trimmedValue);
    }, 500);
  }

  filterMeasurements(query: string) {
    if (!query) {
      this.filteredMeasurements = [...this.measurementList];
    } else {
      const match = query.match(/^(\d{2})\/(\d{4})$/);
      if (!match) {
        this.filteredMeasurements = [];
      } else {
        const [, searchMonth, searchYear] = match.map(Number);

        // Filtrar las mediciones por mes y año
        this.filteredMeasurements = this.measurementList.filter(
          (measurement) => {
            const measurementDate = new Date(measurement.measurement_start);
            const measurementMonth = measurementDate.getMonth() + 1;
            const measurementYear = measurementDate.getFullYear();

            return (
              measurementMonth === searchMonth && measurementYear === searchYear
            );
          }
        );
      }
    }

    // Resetear a la primera página después del filtrado
    this.currentPage = 1;
  }

  measurementDateStart(measurementStart: string) {
    return measurementStart
      ? this.datePipe.transform(measurementStart, 'dd/MM/YYYY')
      : '-';
  }

  goToDetail(measurementId: number) {
    this.router.navigate([`measurement-search/${measurementId.toString()}`]);
  }

  showModal() {
    this.reportService.showModal();
  }
}
