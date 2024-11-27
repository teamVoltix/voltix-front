import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Measurement } from '../../../model/measurement';
import { Router } from '@angular/router';
import { MeasurementService } from '../../services/measurement-service/measurement.service';
import { ReportService } from '../../services/report-service/report.service';
import { ReportDownloadComponent } from '../report-download/report-download.component';

@Component({
  selector: 'app-measurement-search',
  standalone: true,
  imports: [CommonModule, ReportDownloadComponent],
  templateUrl: './measurement-search.component.html',
  styleUrl: './measurement-search.component.css',
})
export class MeasurementSearchComponent {
  isHoverPrevious = false;
  isHoverNext = false;
  measurementList: Measurement[] = [];


  router = inject(Router);
  measurementService = inject(MeasurementService);
  reportService = inject(ReportService);

  ngOnInit() {
    this.measurementService.getAllMeasurements().subscribe(measurements => {
      this.measurementList = measurements;
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
    return Math.ceil(this.measurementList.length / this.itemsPerPage);
  }

  // Obtener los elementos de la página actual
  get paginatedItems() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.measurementList.slice(start, end);
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


  goToDetail(measurementId: number) {
    this.router.navigate([`measurement-search/${measurementId.toString()}`]);
  }


  showModal(){
    this.reportService.showModal();
  }
}
