import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  isPasswordVisible: boolean = false;
  isRepeatPasswordVisible: boolean = false;
  registerForm: FormGroup;
  repeatPasswordTouched: boolean = false;
  errorPasswordCheck: string = '';
  errorPassword: string = '';
  passwordTouched: boolean = false;
  errorFieldsEmpty: string = '';
  errorEmail: string = '';

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      fullname: ['', Validators.required],
      email: ['', Validators.required],
      usuario: ['', Validators.required],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required],
      terms: [false, Validators.requiredTrue]
    });
  }
  isEmailValid(): boolean {
    const email = this.registerForm.value.email;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }
  isPasswordValid(): boolean {
    const password = this.registerForm.value.password;
    const minLength = 8;
    const maxLength = 15;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return password.length >= minLength && password.length <= maxLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
  }
  passwordsMatch(): boolean {
    return this.registerForm.value.password === this.registerForm.value.repeatPassword;
  }
  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  toggleRepeatPasswordVisibility() {
    this.isRepeatPasswordVisible = !this.isRepeatPasswordVisible;
  }

  onSubmit() {
    // Resetea los errores al inicio
    this.errorPassword = '';
    this.errorPasswordCheck = '';
    this.errorFieldsEmpty = '';
    this.errorEmail = '';

    if (this.registerForm.invalid) {
      this.errorFieldsEmpty = '¡Error! Todos los campos son obligatorios.';
      return;
    }

    if (!this.isEmailValid()) {
      this.errorEmail = '¡Error! El email no es válido.';
      return;
    }

    if (!this.isPasswordValid()) {
      this.errorPassword = '¡Error! La contraseña no cumple con los requisitos.';
      return;
    }

    if (!this.passwordsMatch()) {
      this.errorPasswordCheck = '¡Error! Las contraseñas no coinciden.';
      return;
    }

    // Aquí puedes continuar con el registro


    this.registerForm.reset();
  }
}