//logica con validacion con el boton aceptar
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  passwordVisible: boolean = false; // visibilidad de la contraseña
  login: FormGroup;
  // control de datos
  usuarioCorrecto: boolean = false; 
  passwordCorrecta: boolean = false;
  userNotFound: boolean = false; 
  passwordNotFound: boolean = false; 
  camposIncompletos: boolean = false; 

  constructor(private fb: FormBuilder) {
    this.login = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required],
    });

    // Escucha los cambios en el campo de contraseña
    this.login.get('password')?.valueChanges.subscribe((passwordValue) => {
      if (passwordValue === '') {
        this.passwordNotFound = false; 
        this.passwordCorrecta = false;
      }
      this.actualizarEstadoCampos();
    });

    // Escucha los cambios en el campo de usuario
    this.login.get('usuario')?.valueChanges.subscribe((usuarioValue) => {
      if (usuarioValue === '') {
        this.userNotFound = false;
        this.usuarioCorrecto = false; 
      }
      this.actualizarEstadoCampos();
    });
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible; // Alterna la visibilidad
  }

  actualizarEstadoCampos() {
    // Verifica si hay campos incompletos
    const usuarioIngresado = this.login.get('usuario')?.value;
    const passwordIngresada = this.login.get('password')?.value;
    this.camposIncompletos = !usuarioIngresado || !passwordIngresada;
  }

  // Lógica de validación
  onSubmit() {
    // Verifica si hay campos incompletos antes de validar usuario/contraseña
    this.actualizarEstadoCampos();
    if (this.camposIncompletos) {
      this.passwordNotFound = false; 
      this.userNotFound = false; 
      return; // Corrige la lógica aquí, cerrando correctamente el if
    }

    const usuarioIngresado = this.login.get('usuario')?.value;
    const passwordIngresada = this.login.get('password')?.value;

    // Simulamos una base de datos con usuarios y contraseñas
    const baseDeDatos = [
      { usuario: '12345678A', password: 'password123' },
      { usuario: '87654321B', password: 'qwerty456' },
    ];

    // Verificamos si el usuario existe
    const usuarioEncontrado = baseDeDatos.find(user => user.usuario === usuarioIngresado);

    this.userNotFound = !usuarioEncontrado; 
    this.usuarioCorrecto = !!usuarioEncontrado; 

    if (!this.userNotFound) {      
      this.passwordNotFound = usuarioEncontrado?.password !== passwordIngresada;
      this.passwordCorrecta = !this.passwordNotFound; 

      if (this.passwordCorrecta) {
        console.log('Inicio de sesión exitoso. Redirigiendo...');
        // Aquí puedes añadir la lógica para redirigir al usuario
      } else {
        console.log('Contraseña incorrecta.');
      }
    } else {
      this.passwordCorrecta = false; 
      console.log('Usuario no encontrado.');
    }
  }
}
