import { Component, AfterViewInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router } from '@angular/router';
import Swiper from 'swiper/bundle'; // La importación correcta si has instalado Swiper en la última versión
import { Navigation } from 'swiper/modules'; // Importa el módulo de navegación

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements AfterViewInit {
  
  user = {
    firstname: 'Juan' // Temporario hasta conectarse con backend
  };

  constructor(private location: Location, private router: Router) {}

  goToUploadInvoice(): void {
    this.router.navigate(['/invoice-upload']); 
  }

  ngAfterViewInit(): void {
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
}