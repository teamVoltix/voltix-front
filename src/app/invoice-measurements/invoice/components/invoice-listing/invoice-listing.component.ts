import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { InvMesHeaderComponent } from '../../../shared/header/inv-mes-header.component';
import { Invoice } from '../../../../core/model/invoice';
import { InvoiceService } from '../../service/invoice.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invoice-listing',
  standalone: true,
  imports: [CommonModule, InvMesHeaderComponent, FormsModule],
  templateUrl: './invoice-listing.component.html',
  styleUrls: ['./invoice-listing.component.css'],
})
export class InvoiceListingComponent {
  // Lista estática de facturas
  private router = inject(Router);

  
  public invoiceService = inject(InvoiceService);
  invoices: Invoice[] = [];
  filteredInvoices = [...this.invoices];
  searchMessage: string | null = '';
  searchTerm: string = '';
  // hasSelectedInvoices(): boolean {
  //   return this.invoices.some((invoice) => invoice.selected);
  // }
  currentPage = 1;
  invoicesPerPage = 5;
  totalPages: number = 10; //da acabar de definir

  ngOnInit() {
    this.getInvoices();
  }

  goToUploadInvoice(): void {
    this.router.navigate(['/invoice-upload']);
  }

  getInvoices(): void {
    this.invoiceService.getInvoices().subscribe({
      next: (data) => {
        console.log(data);
        this.invoices = data.invoices;
      },
      error: (err) => {
        console.error('Error al obtener las mediciones:', err);
      },
    });
  }

  searchInvoice(): void {
    const term = this.searchTerm.trim();

    if (term) {
      this.filteredInvoices = this.invoices.filter(
        (invoice) =>
          invoice.id.toString() === term || invoice.id.toString().includes(term)
      );

      if (this.filteredInvoices.length === 0) {
        this.searchMessage =
          'No se ha encontrado la factura que buscas, intenta nuevamente';
      } else {
        this.searchMessage = null;
      }
    } else {
      this.filteredInvoices = [...this.invoices];
      this.searchMessage = null;
    }
  }
  // Variables para el paginador
  // currentPage = 1; // Página actual
  // invoicesPerPage = 5; // Número de facturas por página
  // totalPages = Math.ceil(this.invoices?.length / this.invoicesPerPage); // Total de páginas
  // pageNumbers = Array.from({ length: this.totalPages }, (_, i) => i + 1); // Números de página

  // Método para obtener las facturas de la página actual
  paginatedInvoices() {
    const startIndex = (this.currentPage - 1) * this.invoicesPerPage;
    return this.invoices.slice(startIndex, startIndex + this.invoicesPerPage);
  }

  // Variables para efectos hover
  isHoverPrevious = false;
  isHoverNext = false;

  // Método para marcar o desmarcar todas las facturas
  selectAll() {
    const allSelected = this.filteredInvoices.every(
      (invoice) => invoice.selected
    );
    this.filteredInvoices.forEach(
      (invoice) => (invoice.selected = !allSelected)
    );
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

  // Método para visualizar los detalles de una factura
  viewInvoice(id: number) {
    this.router.navigate([`/invoice-details/${id}/`]);
  }

  // Método para eliminar las facturas seleccionadas
  // deleteSelectedInvoices() {
  //   this.invoices = this.invoices.filter((invoice) => !invoice.selected);
  //   this.totalPages = Math.ceil(this.invoices.length / this.invoicesPerPage); // Actualiza el total de páginas
  //   this.pageNumbers = Array.from({ length: this.totalPages }, (_, i) => i + 1); // Actualiza los números de página
  //   console.log('Facturas eliminadas');
  // }

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

  openFileUploader() {
    const fileUploader: HTMLElement | null =
      document.getElementById('fileUploader');
    if (fileUploader) {
      fileUploader.click(); // Simula el clic en el input de archivo
    }
  }
}
