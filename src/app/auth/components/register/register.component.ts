import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
  FormsModule,
  AbstractControl,
  ValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { AuthService } from '../../service/auth-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  private service = inject(AuthService);
  private router = inject(Router);

  isPasswordVisible: boolean = false;
  isRepeatPasswordVisible: boolean = false;
  registerForm: FormGroup;
  repeatPasswordTouched: boolean = false;
  errorPasswordCheck: string = '';
  errorPassword: string = '';
  passwordTouched: boolean = false;
  errorFieldsEmpty: string = '';
  errorEmail: string = '';
  hasUpperCase: boolean = false;
  hasLowerCase: boolean = false;
  hasNumber: boolean = false;
  hasSpecialChar: boolean = false;
  hasUpperCaseAndLowerCase: boolean = false;

  public modalNumberOpen = false;
  enteredCode: string = '';
  verificationCode: string = '';

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      fullname: ['', [Validators.required, this.fullNameValidator()]],
      email: ['', Validators.required],
      dni: ['', Validators.required,],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required],
    });
  }

  fullNameValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value || '';
      const isValid =
      /^[a-zA-ZÑñÁáÉéÍíÓóÚú\s]+$/.test(value) &&
        value.trim().length > 0 &&
        value.trim().length < 20;
      return !isValid ? { invalidFullName: true } : null;
    };
  }

  passwordsMatch(): boolean {
    const password = this.registerForm.get('password')?.value;
    const repeatPassword = this.registerForm.get('repeatPassword')?.value;
    return password === repeatPassword;
  }
  onPasswordInput(): void {
    this.passwordTouched = true;
    this.isAllInputsValid();
  }

  onRepeatPasswordInput(): void {
    this.repeatPasswordTouched = true;
    this.isAllInputsValid();
  }

  checkEmptyFields(): void {
    this.errorFieldsEmpty = '';
    for (const control in this.registerForm.controls) {
      if (
        this.registerForm.controls[control].invalid &&
        this.registerForm.controls[control].touched
      ) {
        this.errorFieldsEmpty = '¡Error! Todos los campos son obligatorios.';
        break;
      }
    }
  }

  checkUpperAndLowerCase(): void {
    const password = this.registerForm.value.password;
    this.hasUpperCaseAndLowerCase =
      /[A-Z]/.test(password) && /[a-z]/.test(password);
  }

  // Llama a este método en cada input
  onInputChange(): void {
    this.passwordsMatch();
    this.isPasswordValid();
    this.checkEmptyFields();
    this.checkUpperAndLowerCase();
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
    this.checkUpperAndLowerCase();
    this.hasUpperCase = /[A-Z]/.test(password);
    this.hasLowerCase = /[a-z]/.test(password);
    this.hasNumber = /\d/.test(password);
    this.hasSpecialChar = /[!@#$%^&*(),.?":{}|<>/_·]/.test(password);

    return (
      password.length >= minLength &&
      password.length <= maxLength &&
      this.hasUpperCase &&
      this.hasLowerCase &&
      this.hasNumber &&
      this.hasSpecialChar
    );
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  toggleRepeatPasswordVisibility() {
    this.isRepeatPasswordVisible = !this.isRepeatPasswordVisible;
  }

  isAllInputsValid(): boolean {
    return (
      this.isPasswordValid() &&
      this.passwordsMatch() &&
      (this.registerForm.get('fullname')?.valid ?? false) &&
      (this.registerForm.get('email')?.valid ?? false) &&
      (this.registerForm.get('dni')?.valid ?? false)
    );
  }

  onSubmit() {
    // Resetea los errores al inicio
    this.errorPassword = '';
    this.errorPasswordCheck = '';
    this.errorFieldsEmpty = '';
    this.errorEmail = '';

    console.log(this.registerForm.value);

    if (this.registerForm.invalid) {
      this.checkEmptyFields(); // Verifica si hay campos vacíos
      return;
    }

    if (!this.isEmailValid()) {
      this.errorEmail = '¡Error! El email no es válido.';
      return;
    }

    if (!this.isPasswordValid()) {
      this.errorPassword =
        '¡Error! La contraseña no cumple con los requisitos.';
      return;
    }

    if (!this.passwordsMatch()) {
      this.errorPasswordCheck = '¡Error! Las contraseñas no coinciden.';
    } else {
      this.errorPasswordCheck = ''; // Limpiar el error si las contraseñas coinciden
    }

    // Aquí puedes continuar con el registro
    console.log(this.registerForm.value);
    this.registerForm.removeControl('repeatPassword');
    console.log(this.registerForm.value);
    this.service.register(this.registerForm.value).subscribe({
      next: (response) => {
        console.log('Registro exitoso:', response);
        this.showSuccessAlert();
        this.registerForm.reset();

        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.showErrorAlert();
        console.error('Error en el registro:', error);
        // Manejar el error de registro aquí, como mostrar un mensaje de error al usuario
      },
    });
  }

  /*   showSuccessAlert() {
    Swal.fire({
      title: 'Profil creado correctamente',
      text: 'Bienvenido a Voltix!',
      icon: 'success',
      confirmButtonText: 'Aceptar',
      position: 'top-end',
      width: 500,
    });
  } */
  showSuccessAlert() {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Profil creado correctamente',
      text: 'Bienvenido a Voltix!',
      showConfirmButton: false,
      timer: 1500,
    });
  }
  showErrorAlert() {
    Swal.fire({
      title: 'Hay un error nel registro',
      text: 'OPS! Algo a salido mal!',
      icon: 'error',
      confirmButtonText: 'Aceptar',
      position: 'top-end',
      width: 600,
    });
  }

  openModalNumber() {
    if (this.isAllInputsValid()){
    this.modalNumberOpen = true;
    }
  }

  closeModalNumber() {
    this.modalNumberOpen = false;
  }

  sendVerificationCode() {
    const email = this.registerForm.value.email;
    this.service.sendVerificationCode(email).subscribe({
      next: (response) => {
        console.log('send verificacion code:', response);
        this.verificationCode = response.code;
        this.modalNumberOpen = true;
      },
      error: (error) => {
        console.error('Error en el envío del código de verificación', error);
      },
    });
  }

  verifyCode() {
    const email = this.registerForm.value.email;
    this.service.verifyCode(email, this.enteredCode).subscribe({
      next: (response) => {
        console.log('Codice verificato:', response);
        this.onCodeVerified();
      },
      error: (error) => {
        console.error('Error en la verificación del código', error);
        // Manejar el error, como mostrar un mensaje al usuario
      },
    });
  }
  onCodeVerified() {
    this.modalNumberOpen = false;
    this.onSubmit();
  }
}
