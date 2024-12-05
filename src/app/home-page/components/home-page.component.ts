import { Component, AfterViewInit, inject, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swiper from 'swiper/bundle';
import { Navigation } from 'swiper/modules';
import ApexCharts from 'apexcharts';
import { HomepageService } from '../service/homepage.service';
import { User } from '../../core/model/user';
import { Invoice } from '../../core/model/invoice';
import {
  MeasurementsResponse,
  Measurement,
} from '../../core/model/measurement';

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
  invoiceData: number[] = Array(6).fill(0);
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

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const dropdown = document.querySelector('.dropdown');

    if (this.isDropdownOpen && dropdown && !dropdown.contains(target) && !target.closest('.user-avatar')) {
      this.closeDropdown();
    }
  }

  goToProfile(): void {
    this.router.navigate(['/profile']);
  }

  goToUploadInvoice(): void {
    this.router.navigate(['/invoice-upload']);
  }

  goToAttachedInvoices(): void {
    this.router.navigate(['/invoice']);
  }

  goToMeasurementSearch(): void {
    this.router.navigate(['/measurement-search']);
  }

  getLastSixMonthsFromDate(startDate: Date): string[] {
    const months = [
      'Ene',
      'Feb',
      'Mar',
      'Abr',
      'May',
      'Jun',
      'Jul',
      'Ago',
      'Sep',
      'Oct',
      'Nov',
      'Dic',
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
    const monthNames = [
      'Enero', 'Febrero', 'Marzo',
      'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre',
      'Octubre', 'Noviembre', 'Diciembre',
    ];
    return monthNames[date.getMonth()];
  }

  //esto es despues de haber cargado la vista
  ngAfterViewInit(): void {
    this.service.profile().subscribe({
      next: (data) => {
        this.user = data;
        this.loadInvoices();
      },
      error: (err) => {
        console.error('Error al obtener perfil', err);
      },
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
  }

  private loadInvoices(): void {
    this.service.getInvoices().subscribe({
        next: (invoiceData) => {
            console.log('Datos de facturas recibidos:', invoiceData);
            const userInvoices = invoiceData.invoices; 

            this.getConsumptionForLastSixMonths(userInvoices);

            const latestInvoice = this.getLatestInvoice(userInvoices);
            if (latestInvoice) {
                this.latestInvoiceKWh = parseFloat(latestInvoice.data.detalles_consumo.consumo_total);
                this.latestInvoiceMonth = this.getMonthName(new Date(latestInvoice.billing_period_end));

                const previousInvoice = this.getPreviousInvoice(userInvoices, latestInvoice);
                if (previousInvoice) {
                    this.previousInvoiceKWh = parseFloat(previousInvoice.data.detalles_consumo.consumo_total);
                    this.calculatePercentChange();
                } else {
                    this.resetPreviousInvoiceData();
                }
            } else {
                this.resetInvoiceData();
            }

            this.service.getMeasurements().subscribe({
                next: (measurementsData: MeasurementsResponse) => {
                    const userMeasurements = measurementsData.measurements;
                    this.getMeasurementConsumptionForLastSixMonths(userMeasurements);
                    this.initializeChart(); 
                },
                error: (err) => {
                    console.error('Error al obtener mediciones', err);
                },
            });
        },
        error: (err) => {
            console.error('Error al obtener facturas', err);
        },
    });
}
  
  private getConsumptionForLastSixMonths(invoices: Invoice[]): void {
    const now = new Date();
    const monthlyConsumption: number[] = Array(6).fill(0);
    const latestInvoicesByMonth: { [key: string]: Invoice } = {};
  
    invoices.forEach((invoice) => {
      const billingEnd = new Date(invoice.billing_period_end);
      const monthDiff = (now.getFullYear() - billingEnd.getFullYear()) * 12 + now.getMonth() - billingEnd.getMonth();
  
      if (monthDiff >= 0 && monthDiff < 6) {
        const monthKey = billingEnd.toISOString().slice(0, 7); 

        if (!latestInvoicesByMonth[monthKey] || invoice.id > latestInvoicesByMonth[monthKey].id) {
          latestInvoicesByMonth[monthKey] = invoice;
        }
      }
    });
  
    Object.values(latestInvoicesByMonth).forEach((invoice) => {
      const consumption = parseFloat(invoice.data.detalles_consumo.consumo_total);
      const billingEnd = new Date(invoice.billing_period_end);
      const monthDiff = (now.getFullYear() - billingEnd.getFullYear()) * 12 + now.getMonth() - billingEnd.getMonth();
  
      if (!isNaN(consumption)) {
        monthlyConsumption[5 - monthDiff] += consumption;
      } else {
        console.error('Valor de consumo no válido:', invoice.data.detalles_consumo.consumo_total);
      }
    });
  
    console.log('Consumo mensual de facturas:', monthlyConsumption);
    this.invoiceData = monthlyConsumption; 
  }
  
  private getMeasurementConsumptionForLastSixMonths(measurements: Measurement[]): void {
    const now = new Date();
    const monthlyMeasurementConsumption = Array(6).fill(0);
  
    measurements.forEach((measurement) => {
      const measurementEnd = new Date(measurement.measurement_end);
      const monthDiff =
        (now.getFullYear() - measurementEnd.getFullYear()) * 12 +
        now.getMonth() -
        measurementEnd.getMonth();
  
      if (monthDiff >= 0 && monthDiff < 6) {
        monthlyMeasurementConsumption[5 - monthDiff] += measurement.data.consumo_total;
      }
    });
  
    console.log('Consumo mensual de mediciones:', monthlyMeasurementConsumption);
    this.measurementData = monthlyMeasurementConsumption; 
  }

  initializeChart(): void {
    const lastSixMonths = this.getLastSixMonthsFromDate(this.lastInvoiceDate || new Date());
  
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
        enabled: false,
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
          data: this.invoiceData.length > 0 ? this.invoiceData : Array(6).fill(null),
        },
        {
          name: 'Mediciones',
          data: this.measurementData.length > 0 ? this.measurementData : Array(6).fill(null),
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
          formatter: (val) => `${Number(val).toFixed(3)} kWh`,
        },
      },
      colors: ['#01D4AD', '#0158A3'],
      grid: {
        borderColor: '#f1f1f1',
      },
    };
  
    const chart = new ApexCharts(document.querySelector('.containerGraphic'), options);
    chart.render();
  }

  private getLatestInvoice(invoices: Invoice[]): Invoice | null {
    if (invoices.length === 0) return null;
  
    const today = new Date(); 
    let closestInvoice: Invoice | null = null;
  
    invoices.forEach((invoice) => {
      const billingEndDate = new Date(invoice.billing_period_end);
  
      if (billingEndDate <= today) {
        if (!closestInvoice || 
            billingEndDate > new Date(closestInvoice.billing_period_end) || 
            (billingEndDate.getTime() === new Date(closestInvoice.billing_period_end).getTime() && invoice.id > closestInvoice.id)) {
          closestInvoice = invoice;
        }
      }
    });
  
    return closestInvoice; 
  }

  private getPreviousInvoice(invoices: Invoice[], currentInvoice: Invoice): Invoice | null {
    const currentBillingPeriodEnd = currentInvoice.billing_period_end;
    const previousInvoices = invoices.filter(invoice => 
      new Date(invoice.billing_period_end) < new Date(currentBillingPeriodEnd)
    );

    return previousInvoices.length > 0 ? previousInvoices[previousInvoices.length - 1] : null;
  }

  private resetPreviousInvoiceData(): void {
    this.previousInvoiceKWh = 0;
    this.percentChange = 0;
    this.changeDirection = '';
    this.changeColor = 'text-gray-500';
  }

  private resetInvoiceData(): void {
    this.latestInvoiceKWh = 0;
    this.latestInvoiceMonth = 'No disponible';
    this.percentChange = 0;
    this.changeDirection = '';
    this.changeColor = 'text-gray-500';
  }
  private calculatePercentChange(): void {
    if (this.previousInvoiceKWh) {
      this.percentChange =
        ((this.latestInvoiceKWh - this.previousInvoiceKWh) / this.previousInvoiceKWh) * 100;
    } else if (this.latestInvoiceKWh > 0) {
      this.percentChange = 100; 
    } else {
      this.percentChange = 0; 
    }
  
    this.changeDirection = this.percentChange > 0 ? 'up' : this.percentChange < 0 ? 'down' : '';
    this.changeColor = this.percentChange > 0 ? 'text-green-600' : this.percentChange < 0 ? 'text-red-600' : 'text-gray-500';
  }
}
