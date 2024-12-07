import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { InvMesHeaderComponent } from '../../../shared/header/inv-mes-header.component';
import { Invoice } from '../../../../core/model/invoice';
import { InvoiceService } from '../../service/invoice.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../../../core/model/user';

@Component({
  selector: 'app-invoice-listing',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './invoice-listing.component.html',
  styleUrls: ['./invoice-listing.component.css'],
})
export class InvoiceListingComponent {
  private router = inject(Router);
  public invoiceService = inject(InvoiceService);
  

  user: User = {
    address: '',
    birth_date: '',
    phone_number: '',
    photo: '',
    email: '',
    fullname: '',
    dni: '',
  };
  //funcion de menu
  isDropdownOpen = false;
  logout(): void {
    this.invoiceService.logout();
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown(): void {
    this.isDropdownOpen = false;
  }

  goToProfile(): void {
    this.router.navigate(['/profile']);
  }

  invoices: Invoice[] = [];
  filteredInvoices = [...this.invoices];
  searchMessage: string | null = '';
  searchTerm: string = '';
  // hasSelectedInvoices(): boolean {
  //   return this.invoices.some((invoice) => invoice.selected);
  // }
  

  ngOnInit() {
    this.getInvoices();
    this.invoiceService.profile().subscribe({
      next: (data) => {
        this.user = data;
        this.loadInvoices();
        
      },
      error: (err) => {
        console.error('Error al obtener el perfil', err);
      },
    });
  }
  loadInvoices(): void {
    this.invoiceService.getInvoices().subscribe({
      next: (data) => {
        this.invoices = data.invoices;
        this.filteredInvoices = [...this.invoices];
        this.updatePagination(); // Recalcula las páginas
      },
      error: (err) => {
        console.error('Error al cargar las facturas:', err);
      },
    });
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
      this.filteredInvoices = this.invoices.filter(invoice =>
        invoice.id.toString().includes(term)
      );
      this.searchMessage = this.filteredInvoices.length
        ? null
        : 'No se ha encontrado la factura que buscas, intenta nuevamente.';
    } else {
      // Restaurar el listado completo si el término está vacío
      this.filteredInvoices = [...this.invoices];
      this.searchMessage = null;
    }
  
    this.updatePagination(); // Recalcula las páginas
  }
  
// Recalcula el total de páginas y actualiza los números de página
updatePagination(): void {
  this.totalPages = Math.ceil(this.filteredInvoices.length / this.invoicesPerPage);
  this.pageNumbers = Array.from({ length: this.totalPages }, (_, i) => i + 1);
}



hasSelectedInvoices(): boolean {
  return this.filteredInvoices.some(invoice => invoice.selected);
}

selectAll(): void {
  const allSelected = this.filteredInvoices.every(invoice => invoice.selected);
  this.filteredInvoices.forEach(invoice => (invoice.selected = !allSelected));
}

deleteSelectedInvoices(): void {
  this.invoices = this.invoices.filter(invoice => !invoice.selected);
  this.filteredInvoices = [...this.invoices];
  this.updatePagination(); // Recalcula las páginas
  console.log('Facturas seleccionadas eliminadas');
}




  //Variables para el paginador
   currentPage = 1; // Página actual
   invoicesPerPage = 5; // Número de facturas por página
   totalPages = Math.ceil(this.invoices?.length / this.invoicesPerPage); // Total de páginas
   pageNumbers = Array.from({ length: this.totalPages }, (_, i) => i + 1); // Números de página

  // Método para obtener las facturas de la página actual
  paginatedInvoices() {
    const startIndex = (this.currentPage - 1) * this.invoicesPerPage;
    return this.invoices.slice(startIndex, startIndex + this.invoicesPerPage);
  }

  // Variables para efectos hover
  isHoverPrevious = false;
  isHoverNext = false;

  // Método para marcar o desmarcar todas las facturas


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



  // Método para cambiar de página en el paginador
  goToPage(event: Event, page: number): void {
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
