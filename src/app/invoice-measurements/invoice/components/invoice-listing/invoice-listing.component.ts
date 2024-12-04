import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {InvMesHeaderComponent } from '../../../shared/header/inv-mes-header.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invoice-listing',
  standalone: true,
  imports: [CommonModule, InvMesHeaderComponent],
  templateUrl: './invoice-listing.component.html',
  styleUrls: ['./invoice-listing.component.css'],
})
export class InvoiceListingComponent {
  // Lista estática de facturas

  invoices = [
    { id: '664705', date: '08/09/2024', selected: false },
    { id: '565644', date: '08/10/2024', selected: false },
    { id: '584846', date: '08/11/2024', selected: false },
    { id: '565656', date: '08/12/2024', selected: false },
    { id: '565544', date: '08/11/2024', selected: false },
    { id: '664705', date: '08/09/2024', selected: false },
    { id: '565644', date: '08/10/2024', selected: false },
    { id: '584846', date: '08/11/2024', selected: false },
    { id: '664705', date: '08/09/2024', selected: false },
    { id: '565644', date: '08/10/2024', selected: false },
    { id: '584846', date: '08/11/2024', selected: false },
    { id: '565656', date: '08/12/2024', selected: false },
    { id: '565544', date: '08/11/2024', selected: false },
    { id: '664705', date: '08/09/2024', selected: false },
    { id: '565644', date: '08/10/2024', selected: false },
    { id: '584846', date: '08/11/2024', selected: false },
  ];

  hasSelectedInvoices(): boolean {
    return this.invoices.some((invoice) => invoice.selected);
  }

  // Variables para el paginador
  currentPage = 1; // Página actual
  invoicesPerPage = 5; // Número de facturas por página
  totalPages = Math.ceil(this.invoices.length / this.invoicesPerPage); // Total de páginas
  pageNumbers = Array.from({ length: this.totalPages }, (_, i) => i + 1); // Números de página

  // Método para obtener las facturas de la página actual
  get paginatedInvoices() {
    const startIndex = (this.currentPage - 1) * this.invoicesPerPage;
    return this.invoices.slice(startIndex, startIndex + this.invoicesPerPage);
  }

  // Variables para efectos hover
  isHoverPrevious = false;
  isHoverNext = false;

  // Método para marcar o desmarcar todas las facturas
  selectAll() {
    const allSelected = this.invoices.every((invoice) => invoice.selected);
    this.invoices.forEach((invoice) => (invoice.selected = !allSelected));
  }

  // Método para alternar selección individual de una factura
  toggleSelection(invoice: any) {
    invoice.selected = !invoice.selected;
  }

  // Método para cargar más facturas (simulación)
  openFileUploader() {
    const fileUploader: HTMLElement | null =
      document.getElementById('fileUploader');
    if (fileUploader) {
      fileUploader.click();
    }
  }

  // Método para manejar la carga de archivos PDF
  handleFileUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const files = Array.from(input.files);
      console.log('Archivos seleccionados:', files);

      // Validar y procesar los archivos cargados
      files.forEach((file) => {
        if (file.type === 'application/pdf') {
          console.log(`Cargando archivo: ${file.name}`);
          // Implementa la lógica para subir o procesar el archivo
        } else {
          console.warn(`El archivo ${file.name} no es un PDF válido.`);
        }
      });
    }
  }

  // Método para visualizar los detalles de una factura
  viewInvoice(id: string) {
    console.log(`Ver detalles de la factura con ID: ${id}`);
  }

  // Método para eliminar las facturas seleccionadas
  deleteSelectedInvoices() {
    this.invoices = this.invoices.filter((invoice) => !invoice.selected);
    this.totalPages = Math.ceil(this.invoices.length / this.invoicesPerPage); // Actualiza el total de páginas
    this.pageNumbers = Array.from({ length: this.totalPages }, (_, i) => i + 1); // Actualiza los números de página
    console.log('Facturas eliminadas');
  }

  // Método para cambiar de página en el paginador
  goToPage(event: Event, page: number) {
    event.preventDefault();
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    console.log(`Cambiando a la página ${page}`);
  }

  // Método para identificar elementos únicos en el *ngFor (mejora el rendimiento)
  trackById(index: number, invoice: any) {
    return invoice.id;
  }

  // Método para identificar páginas únicas en el paginador (opcional)
  trackByIndex(index: number): number {
    return index;
  }
}