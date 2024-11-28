import { CommonModule, Location } from '@angular/common';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invoice-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './invoice-upload.component.html',
  styleUrls: ['./invoice-upload.component.css']
})
export class InvoiceUploadComponent {
  selectedFile: File | null = null;
  isFileUploaded: boolean = false;

  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(private location: Location, private router: Router) {}

  // Método para ir a la vista anterior
  goBack(): void {
    this.location.back();
  }

  // Método para ir a la ruta de las facturas adjuntas
  goToAttachedInvoices(): void {
    this.router.navigate(['/invoce-listing']);
  }

  // Método para ir al inicio
  goToHome(): void {
    this.router.navigate(['/home']); 
  }

  // Método para manejar la selección de un archivo
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
            console.error('Tipo de archivo no admitido. Solo se permiten archivos PDF, JPG y PNG.');
        }
    }
}

  // Método para reiniciar el archivo seleccionado
resetFile() {
  this.selectedFile = null; // Reinicia el archivo seleccionado
  this.fileInput.nativeElement.value = ''; // Resetea el valor del input file
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

  // Método para cargar el archivo
  uploadFile() {
    if (this.selectedFile) {
      console.log('Cargando archivo:', this.selectedFile);
      this.isFileUploaded = true; // Cambia el estado a verdadero después de la carga
      // Implementa tu lógica del post cuando tengamos el endpoint del backend
    } else {
      console.error('No se ha seleccionado ningún archivo');
    }
  }


  // Método para verificar si se ha subido un archivo
  isInvoiceUpload(): boolean {
    return this.selectedFile !== null; // Retorna verdadero si hay un archivo seleccionado
  }
}