import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
})
export class LogoutComponent {
  mostrarVentanaEmergente = false;

  mostrarPopup() {
    this.mostrarVentanaEmergente = true;
    console.log('Popup mostrado');
  }

  ocultarPopup() {
    this.mostrarVentanaEmergente = false;
    console.log('Popup ocultado');
  }

  logout() {
    console.log('Cerrando sesión');
    this.ocultarPopup();
    // Aquí puedes agregar la lógica para cerrar la sesión (por ejemplo, redirigir a la página de login).
  }
}
