import { Component, AfterViewInit, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router } from '@angular/router';
import Swiper from 'swiper/bundle';
import { Navigation } from 'swiper/modules';
import ApexCharts from 'apexcharts';
import { HomepageService } from '../service/homepage.service';
import { User } from '../../core/model/user';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit, AfterViewInit {
  isDropdownOpen = false;
  private service = inject(HomepageService);

  user!: User;

  /* this.service.profile().subscribe((data) => {
    console.log(data);
  }) */

  constructor(private location: Location, private router: Router) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
    console.log('Dropdown state:', this.isDropdownOpen);
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
  getLastSixMonths(): string[] {
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
    const now = new Date();
    const result: string[] = [];

    for (let i = 5; i >= 0; i--) {
      const monthIndex = (now.getMonth() - i + 12) % 12;
      result.push(months[monthIndex]);
    }

    return result;
  }

  initializeChart(): void {
    const lastSixMonths = this.getLastSixMonths();

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
          data: [35, 41, 36, 26, 45, 48], // Datos de ejemplo
        },
        {
          name: 'Mediciones',
          data: [45, 52, 38, 45, 19, 23], // Datos de ejemplo
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
        categories: lastSixMonths, // Usa los últimos 6 meses calculados
      },
      yaxis: {},
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: (val) => `${val} unidades`,
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

  ngAfterViewInit(): void {
    this.service.profile().subscribe((data) => {
      console.log(data);
      this.user = data;
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
