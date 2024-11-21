import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  // TODO: poner isLoggedIn dinamico según este logueado o no
  isLoggedIn = false;

  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }
}
