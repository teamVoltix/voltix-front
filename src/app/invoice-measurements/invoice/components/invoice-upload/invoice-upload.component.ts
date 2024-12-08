import { CommonModule, Location } from '@angular/common';
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InvoiceService } from '../../service/invoice.service';
import Swal from 'sweetalert2';
import { User } from '../../../../core/model/user';

@Component({
  selector: 'app-invoice-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './invoice-upload.component.html',
  styleUrls: ['./invoice-upload.component.css'],
})
export class InvoiceUploadComponent implements OnInit {
  selectedFile: File | null = null;
  isFileUploaded: boolean = false;
  isLoading: boolean = false;
  isDropdownOpen = false;
  
  user: User = {
    address: '',
    birth_date: '',
    phone_number: '',
    photo: '',
    email: '',
    fullname: '',
    dni: '',
  };
  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(
    private location: Location,
    private router: Router,
    private invoiceService: InvoiceService
  ) {}
  ngOnInit(): void {
    this.invoiceService.profile().subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (err) => {
        console.error('Error al obtener el perfil', err);
      },
    });
  }

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

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const selectedFile = input.files[0];
      // Verifica el tipo de archivo
      const validTypes = ['application/pdf', 'image/jpeg', 'image/png'];
      if (validTypes.includes(selectedFile.type)) {
        this.selectedFile = selectedFile;
        console.log('Archivo seleccionado:', this.selectedFile);
      } else {
        console.error(
          'Tipo de archivo no admitido. Solo se permiten archivos PDF, JPG y PNG.'
        );
      }
    }
  }

  resetFile() {
    this.selectedFile = null;
    this.fileInput.nativeElement.value = '';
    console.log('Archivo reseteado, listo para cargar uno nuevo');
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.selectedFile = files[0];
      console.log('Archivo soltado:', this.selectedFile);
    }
  }

  uploadFile() {
    if (this.selectedFile) {
      this.isLoading = true;
      console.log('Cargando archivo:', this.selectedFile);

      this.invoiceService.uploadInvoice(this.selectedFile).subscribe({
        next: (response) => {
          console.log('Archivo cargado con éxito:', response);

          if (response.parsed_data && response.parsed_data.error) {
            Swal.fire({
              title: 'Error',
              text: 'Documento no válido',
              icon: 'error',
              confirmButtonText: 'Aceptar',
              width: '75%',
            });
            console.log(
              'Error al subir la factura:',
              response.parsed_data.error
            );
            this.isLoading = false;
            return;
          }

          this.isFileUploaded = true;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error al cargar el archivo:', error);
          this.isLoading = false;

          if (error.status === 400 && error.error.details) {
            const errorDetails: string[] = error.error.details.file || [];
            let errorMessage = 'El documento no es válido: ';

            errorDetails.forEach((detail: string) => {
              errorMessage += `${detail} `;
            });

            Swal.fire({
              title: 'Error',
              text: errorMessage.trim(),
              icon: 'error',
              confirmButtonText: 'Aceptar',
              width: '75%',
            });
          } else {
            Swal.fire({
              title: 'Error',
              text: 'No se pudo cargar la factura. Inténtalo de nuevo más tarde.',
              icon: 'error',
              confirmButtonText: 'Aceptar',
              width: '75%',
            });
          }
        },
      });
    } else {
      console.error('No se ha seleccionado ningún archivo');
    }
  }

  isInvoiceUpload(): boolean {
    return this.selectedFile !== null;
  }

  goToInvoice() {
    this.router.navigate(['/invoice']);
  }
  goToMeasurements() {
    this.router.navigate(['measurement-search']);
  }
  goToAttachedInvoices(): void {
    this.router.navigate(['/invoce-listing']);
  }

  goToHome(): void {
    this.router.navigate(['/home']);
  }
}
