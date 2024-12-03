import { Component, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swiper from 'swiper/bundle';
import { Navigation } from 'swiper/modules';
import ApexCharts from 'apexcharts';
import { HomepageService } from '../service/homepage.service';
import { User } from '../../core/model/user';
import { Invoice } from '../../core/model/invoice';
import { MeasurementsResponse, Measurement } from '../../core/model/measurement';


@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements AfterViewInit {
  isDropdownOpen = false;
  private service = inject(HomepageService);
  private router = inject(Router);

  user: User = {
    address: '',
    birth_date: '',
    phone_number: '',
    photo: '',
    email: '',
    fullname: '',
    dni: '',
  };

  latestInvoiceKWh: number = 0;
  latestInvoiceMonth: string = '';
  previousInvoiceKWh: number = 0; 
  percentChange: number = 0; 
  changeDirection: 'up' | 'down' | '' = ''; 
  changeColor: string = ''; 
  invoiceData: number[] = []; 
  measurementData: number[] = []; 
  lastInvoiceDate?: Date;

  logout(): void {
    this.service.logout();
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

  goToUploadInvoice(): void {
    this.router.navigate(['/invoice-upload']);
  }

  goToAttachedInvoices(): void {
    this.router.navigate(['/invoce-listing']);
  }

  goToMeasurementSearch(): void {
    this.router.navigate(['/measurement-search']);
  }

  // Método para obtener los últimos 6 meses
  getLastSixMonthsFromDate(startDate: Date): string[] {
    const months = [
      'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 
      'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
    ];
    const result: string[] = [];
    const month = startDate.getMonth();
    const year = startDate.getFullYear();

    for (let i = 5; i >= 0; i--) {
      const ms = new Date(year, month - i); 
      result.push(months[ms.getMonth()]); 
    }

    return result;
  }

  private getMonthName(date: Date): string {
    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    return monthNames[date.getMonth()];
}


initializeChart(): void {
  if (this.lastInvoiceDate) { // Verificar que lastInvoiceDate no sea undefined
    const lastSixMonths = this.getLastSixMonthsFromDate(this.lastInvoiceDate); 

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'bar',
      height: 350,
      toolbar: {
        show: false,
      },
    },
    title: {
      text: 'Consumo energético (kWh)',
      align: 'center',
      style: {
        fontSize: '16px',
        fontWeight: 'semibold',
        color: '#333',
      },
      offsetY: 0,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 4,
        dataLabels: {
          position: 'top',
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val) => Number(val).toFixed(0),
      offsetY: -20,
      style: {
        fontSize: '12px',
        colors: ['#304758'],
      },
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    series: [
      {
        name: 'Facturas',
        data: this.invoiceData, // Datos de facturas
      },
      {
        name: 'Mediciones',
        data: this.measurementData, // Datos de mediciones
      },
    ],
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'center',
      floating: false,
      fontSize: '12px',
      fontWeight: 'bold',
      labels: {
        colors: ['#01D4AD', '#0158A3'],
      },
      offsetY: 0,
      markers: {
        size: 6,
        strokeWidth: 2,
        fillColors: ['#01D4AD', '#0158A3'],
        shape: 'circle',
      },
      itemMargin: {
        horizontal: 10,
        vertical: 0,
      },
    },
    xaxis: {
      categories: lastSixMonths,
    },
    yaxis: {},
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: (val) => `${val}`,
      },
    },
    colors: ['#01D4AD', '#0158A3'],
    grid: {
      borderColor: '#f1f1f1',
    },
  };

  const chart = new ApexCharts(
    document.querySelector('.containerGraphic'),
    options
  );
  chart.render();
}
}
  //esto es despues de haber cargado la vista
  ngAfterViewInit(): void {
    this.service.profile().subscribe({
      next: (data) => {
        this.user = data;

        // Obtener facturas
        this.service.getInvoices().subscribe({
          next: (invoiceData) => {
            const expectedClientName = 'Cliente Generado';
            const userInvoices = invoiceData.invoices.filter((invoice: Invoice) => {
              return invoice.data.nombre_cliente === expectedClientName;
            });

            if (userInvoices.length > 1) {
              const latestInvoice = userInvoices[userInvoices.length - 1];
              const previousInvoice = userInvoices[userInvoices.length - 2];

              this.latestInvoiceKWh = parseFloat(latestInvoice.data.detalles_consumo.consumo_total);
              this.previousInvoiceKWh = parseFloat(previousInvoice.data.detalles_consumo.consumo_total);

              if (this.previousInvoiceKWh !== 0) {
                  this.percentChange = ((this.latestInvoiceKWh - this.previousInvoiceKWh) / this.previousInvoiceKWh) * 100;
              } else {
                  this.percentChange = this.latestInvoiceKWh > 0 ? 100 : -100; 
              }

              if (this.percentChange > 0) {
                  this.changeDirection = 'up'; 
                  this.changeColor = 'text-green-600'; 
              } else if (this.percentChange < 0) {
                  this.changeDirection = 'down'; 
                  this.changeColor = 'text-red-600'; 
              } else {
                  this.changeDirection = ''; 
                  this.changeColor = 'text-gray-500';
              }

              this.latestInvoiceMonth = this.getMonthName(new Date(latestInvoice.billing_period_end));
            } else {
              this.latestInvoiceKWh = 0;
              this.previousInvoiceKWh = 0;
              this.latestInvoiceMonth = 'No disponible';
            }

            // Obtener mediciones
            this.service.getMeasurements().subscribe({
              next: (measurementsData: MeasurementsResponse) => {
                // Extraer consumos totales desde las mediciones
                this.measurementData = measurementsData.measurements.map((measurement: Measurement) => 
                  measurement.data.consumo_total
                );

                this.initializeChart(); 
              },
              error: (err) => {
                console.error('Error al obtener mediciones', err);
              }
            });
          },
          error: (err) => {
            console.error('Error al obtener facturas', err);
          }
        });
      },
      error: (err) => {
        console.error('Error al obtener perfil', err);
      }
    });


    const swiper = new Swiper('.swiper-container', {
      modules: [Navigation],
      slidesPerView: 1,
      spaceBetween: 10,

      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },

      breakpoints: {
        640: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        850: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 4,
        },
      },
    });
    setTimeout(() => {
      this.initializeChart();
    }, 100);
  }

}