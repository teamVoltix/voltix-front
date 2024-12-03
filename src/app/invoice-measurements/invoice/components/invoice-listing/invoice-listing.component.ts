import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { InvMesHeaderComponent } from '../../../shared/header/inv-mes-header.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-invoice-listing',
  standalone: true,
  imports: [CommonModule, InvMesHeaderComponent, FormsModule],
  templateUrl: './invoice-listing.component.html',
  styleUrls: ['./invoice-listing.component.css'],
})
export class InvoiceListingComponent {
  // Lista estática de facturas
  invoices = [
    { id: '123456', billing_period_start: '01/08/2024', billing_period_end: '31/08/2024', selected: false },
    { id: '654321', billing_period_start: '01/08/2024', billing_period_end: '31/08/2024', selected: false },
    { id: '987654', billing_period_start: '01/08/2024', billing_period_end: '31/08/2024', selected: false },
    { id: '456789', billing_period_start: '01/08/2024', billing_period_end: '31/08/2024', selected: false },
    { id: '234567', billing_period_start: '01/08/2024', billing_period_end: '31/08/2024', selected: false },
    { id: '345678', billing_period_start: '01/08/2024', billing_period_end: '31/08/2024', selected: false },
    { id: '876543', billing_period_start: '01/08/2024', billing_period_end: '31/08/2024', selected: false },
    { id: '567890', billing_period_start: '01/08/2024', billing_period_end: '31/08/2024', selected: false },
    { id: '345123', billing_period_start: '01/08/2024', billing_period_end: '31/08/2024', selected: false },
    { id: '789012', billing_period_start: '01/08/2024', billing_period_end: '31/08/2024', selected: false },
    { id: '210987', billing_period_start: '01/08/2024', billing_period_end: '31/08/2024', selected: false },
    { id: '543210', billing_period_start: '01/08/2024', billing_period_end: '31/08/2024', selected: false },
    { id: '678901', billing_period_start: '01/08/2024', billing_period_end: '31/08/2024', selected: false },
    { id: '890123', billing_period_start: '01/08/2024', billing_period_end: '31/08/2024', selected: false },
    { id: '135792', billing_period_start: '01/08/2024', billing_period_end: '31/08/2024', selected: false },
    { id: '246801', billing_period_start: '01/08/2024', billing_period_end: '31/08/2024', selected: false },

  ];

  filteredInvoices = [...this.invoices]; // Lista inicial, muestra todas las facturas
  searchTerm: string = '';
  searchMessage: string | null = null;

  // Método para buscar una factura
  searchInvoice() {
    const term = this.searchTerm.trim();

    if (term) {
      this.filteredInvoices = this.invoices.filter(invoice => invoice.id === term);

      if (this.filteredInvoices.length === 0) {
        this.searchMessage = 'No se ha encontrado la factura que buscas, intenta nuevamente';
      } else {
        this.searchMessage = null;
      }
    } else {
      this.filteredInvoices = [...this.invoices]; // Restablece la lista si no hay término
      this.searchMessage = null;
    }

    // Actualiza el total de páginas después de filtrar
    this.totalPages = Math.ceil(this.filteredInvoices.length / this.invoicesPerPage);
    this.pageNumbers = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.currentPage = 1; // Reinicia la página actual al filtrar
  }

  hasSelectedInvoices(): boolean {
    return this.filteredInvoices.some((invoice) => invoice.selected);
  }
  // Método para visualizar los detalles de una factura
  viewInvoice(id: string) {
    console.log(`Ver detalles de la factura con ID: ${id}`);
  }

  // Variables para el paginador
  currentPage = 1; // Página actual
  invoicesPerPage = 5; // Número de facturas por página
  totalPages = Math.ceil(this.invoices.length / this.invoicesPerPage); // Total de páginas
  pageNumbers = Array.from({ length: this.totalPages }, (_, i) => i + 1); // Números de página

  // Método para obtener las facturas de la página actual
  get paginatedInvoices() {
    const startIndex = (this.currentPage - 1) * this.invoicesPerPage;
    return this.filteredInvoices.slice(startIndex, startIndex + this.invoicesPerPage);
  }

  // Variables para efectos hover
  isHoverPrevious = false;
  isHoverNext = false;

  // Método para marcar o desmarcar todas las facturas
  selectAll() {
    const allSelected = this.filteredInvoices.every((invoice) => invoice.selected);
    this.filteredInvoices.forEach((invoice) => (invoice.selected = !allSelected));
  }

  // Método para alternar selección individual de una factura
  toggleSelection(invoice: any) {
    invoice.selected = !invoice.selected;
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
        } else {
          console.warn(`El archivo ${file.name} no es un PDF válido.`);
        }
      });
    }
  }

  // Método para abrir el selector de archivo
  openFileUploader() {
    const fileUploader: HTMLElement | null = document.getElementById('fileUploader');
    if (fileUploader) {
      fileUploader.click(); // Simula el clic en el input de archivo
    }
  }

  // Método para eliminar las facturas seleccionadas
  deleteSelectedInvoices() {
    this.filteredInvoices = this.filteredInvoices.filter((invoice) => !invoice.selected);
    this.totalPages = Math.ceil(this.filteredInvoices.length / this.invoicesPerPage); // Actualiza el total de páginas
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
