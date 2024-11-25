import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Measurement } from '../../../model/measurement';

@Component({
  selector: 'app-measurement-search',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './measurement-search.component.html',
  styleUrl: './measurement-search.component.css',
})
export class MeasurementSearchComponent {
  // TODO: quitarlo cuando venga del backend
  measurementList: Measurement [] = [
    {
      checked: true,
      id: 664705,
      date: '08/05/2024',
      compare: 'Sin comparar',
    },
    {
      checked: false,
      id: 565644,
      date: '09/05/2024',
      compare: 'Con discrepancias',
    },
    {
      checked: true,
      id: 584846,
      date: '10/05/2024',
      compare: 'Sin discrepancias',
    },
    {
      checked: false,
      id: 565656,
      date: '11/05/2024',
      compare: 'Sin comparar',
    },
    {
      checked: true,
      id: 565644,
      date: '12/05/2024',
      compare: 'Con discrepancias',
    },
    {
      checked: true,
      id: 664705,
      date: '08/05/2024',
      compare: 'Sin comparar',
    },
    {
      checked: false,
      id: 565644,
      date: '09/05/2024',
      compare: 'Con discrepancias',
    },
    {
      checked: true,
      id: 584846,
      date: '10/05/2024',
      compare: 'Sin discrepancias',
    },
    {
      checked: false,
      id: 565656,
      date: '11/05/2024',
      compare: 'Sin comparar',
    },
    {
      checked: true,
      id: 565644,
      date: '12/05/2024',
      compare: 'Con discrepancias',
    },
    {
      checked: true,
      id: 664705,
      date: '08/05/2024',
      compare: 'Sin comparar',
    },
    {
      checked: false,
      id: 565644,
      date: '09/05/2024',
      compare: 'Con discrepancias',
    },
    {
      checked: true,
      id: 584846,
      date: '10/05/2024',
      compare: 'Sin discrepancias',
    },
    {
      checked: false,
      id: 565656,
      date: '11/05/2024',
      compare: 'Sin comparar',
    },
    {
      checked: true,
      id: 565644,
      date: '12/05/2024',
      compare: 'Con discrepancias',
    },
  ];

  isHoverPrevious = false;
  isHoverNext = false;


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
  totalPages = Math.ceil(this.measurementList.length / this.itemsPerPage); // Total de páginas

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
}
