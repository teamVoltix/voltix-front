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
  // Controla la visibilidad de la contraseña
  passwordVisible: boolean = false;
  .

  
  login: FormGroup;

  // Estados para validación del formulario
  usuarioCorrecto: boolean = false; 
  passwordCorrecta: boolean = false;
  userNotFound: boolean = false; 
  passwordNotFound: boolean = false; 
  camposIncompletos: boolean = false;

  // Base de datos simulada
  private baseDeDatos = [
    { usuario: '12345678A', password: 'password123' },
    { usuario: '87654321B', password: 'qwerty456' },
    { usuario: '13579246C', password: 'pass7890' },
  ];

  constructor(private fb: FormBuilder) {
    // Inicializa el formulario
    this.login = this.fb.group({
      usuario: ['', [Validators.required, Validators.minLength(8)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    // Suscripciones para manejo dinámico de validaciones
    this.login.get('usuario')?.valueChanges.subscribe((value) => {
      if (value === '') {
        this.userNotFound = false;
        this.usuarioCorrecto = false;
      }
      this.actualizarEstadoCampos();
    });

    this.login.get('password')?.valueChanges.subscribe((value) => {
      if (value === '') {
        this.passwordNotFound = false;
        this.passwordCorrecta = false;
      }
      this.actualizarEstadoCampos();
    });
  }

  // Alterna la visibilidad del campo de contraseña
  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  // Actualiza el estado general de los campos
  actualizarEstadoCampos(): void {
    const usuario = this.login.get('usuario')?.value;
    const password = this.login.get('password')?.value;

    this.camposIncompletos = !usuario || !password;
  }

  // Manejo del evento de envío del formulario
  onSubmit(): void {
    // Verifica primero si los campos están completos
    this.actualizarEstadoCampos();
    if (this.camposIncompletos) {
      this.userNotFound = false;
      this.passwordNotFound = false;
      console.log('Faltan campos por completar.');
      return;
    }

    // Extraemos los valores ingresados
    const usuarioIngresado = this.login.get('usuario')?.value;
    const passwordIngresada = this.login.get('password')?.value;

    // Verifica si el usuario existe en la base de datos
    const usuarioEncontrado = this.baseDeDatos.find(
      (user) => user.usuario === usuarioIngresado
    );

    this.userNotFound = !usuarioEncontrado;
    this.usuarioCorrecto = !!usuarioEncontrado;

    if (!this.userNotFound) {
      // Si el usuario existe, verifica la contraseña
      this.passwordNotFound = usuarioEncontrado?.password !== passwordIngresada;
      this.passwordCorrecta = !this.passwordNotFound;

      if (this.passwordCorrecta) {
        console.log('Inicio de sesión exitoso.');
        // Aquí podrías redirigir al usuario a otra página
      } else {
        console.log('Contraseña incorrecta.');
      }
    } else {
      this.passwordCorrecta = false;
      console.log('Usuario no encontrado.');
    }
  }

  
}
