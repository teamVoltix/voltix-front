import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent implements OnInit {
  resetPasswordForm!: FormGroup;
  showSuccessSection: boolean = false;

  fb = inject(FormBuilder);
  router = inject(Router);

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.resetPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.resetPasswordForm.valid) {
      const email = this.resetPasswordForm.get('email')?.value;
      console.log('Restablecer contraseña para:', email);
      // Lógica para enviar el correo de restablecimiento de contraseña
      //Si se ha enviado todo ok, mostrar sección de se ha enviado el correo para restablecer contraseña
      this.showSuccessSection = true;
    } else {
      this.resetPasswordForm.markAllAsTouched();
      return;
    }
  }

  get isFormValid() {
    return this.resetPasswordForm.valid;
  }

  get email() {
    return this.resetPasswordForm.get('email');
  }

  goToLogin(){
    this.router.navigate(['/login']);
  }
}
