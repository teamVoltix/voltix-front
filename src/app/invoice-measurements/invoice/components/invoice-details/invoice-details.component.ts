import { Component, OnInit, inject, Input } from '@angular/core';
import { Invoice } from '../../../../core/model/invoice';
import { CommonModule } from '@angular/common';
import { InvMesHeaderComponent } from '../../../shared/header/inv-mes-header.component';
import { InvoiceService } from '../../service/invoice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../../core/model/user';

@Component({
  selector: 'app-invoice-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './invoice-details.component.html',
  styleUrl: './invoice-details.component.css',
})
export class InvoiceDetailsComponent implements OnInit {
  public route = inject(ActivatedRoute);
  public router = inject(Router);
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

  @Input() invoice: Invoice | undefined;

  public invoicePage: Boolean = true;
  public invoiceImage: Boolean = false;
  public isLoading = true;

  ngOnInit(): void {
    this.invoice_id();
    const id = this.route.snapshot.paramMap.get('id') || '';

    this.getInvoice(id);

    this.invoiceService.profile().subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (err) => {
        console.error('Error al obtener el perfil', err);
      },
    });
  }
  getInvoice(id: any) {
    this.isLoading = true;
    this.invoiceService.getInvoiceById(id).subscribe({
      next: (data) => {
        this.invoice = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error en detalle de factura', err);
        this.isLoading = false;
      },
    });
  }

  invoice_id() {
    return this.route.snapshot.paramMap.get('id') || '';
  }

  getInvoiceDetail() {
    this.invoiceService.getInvoiceById(this.invoice_id()).subscribe({
      next: (data) => {
        this.invoice = data;
      },
      error: (err) => {
        console.error('Error en detalle de factura', err);
      },
    });
  }
  //Cambiar vista a Imagen
  getImage() {
    this.invoicePage = false;
    this.invoiceImage = true;
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
