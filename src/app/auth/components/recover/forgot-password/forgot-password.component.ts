import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../service/auth-service.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent implements OnInit {
  resetForm: FormGroup;
  showSuccessSection: boolean = false;

  router = inject(Router);
  public service = inject(AuthService);

  constructor(private fb: FormBuilder) {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }
  get isFormValid() {
    return this.resetForm.valid;
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.resetForm.invalid) {
      return;
    }
    const email = this.resetForm.get('email')?.value;
    console.log('Restablecer contraseña para:', email);

    this.service.recoverPassword(email).subscribe({
      next: (response) => {
        console.log('Respuesta:', response);
        this.showSuccessSection = true;
      },
      error: (error) => {
        console.log('Error:', error);
      },
    });
  }

  get email() {
    return this.resetForm.get('email');
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
  
  resetPassword(email: string) {
    this.service.recoverPassword(email).subscribe({
      next: (response) => {
        console.log('Password reset email sent successfully', response);
      },
      error: (error) => {
        console.error('Error sending password reset email', error);
      },
    });
  }
}
