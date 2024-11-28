import { Component } from '@angular/core';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'] 
})
export class HomePageComponent {
  user = {
    firstname: 'Juan' // Quemado mientras no se conecte el backend, despues hacer dinamico
  };
}