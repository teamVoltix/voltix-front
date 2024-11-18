import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '../../../core/components/button/button.component';
import { HeaderComponent } from '../../../core/components/header/header.component';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonComponent,
    HeaderComponent,
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent implements OnInit {
  resetPasswordForm!: FormGroup;
  showSuccessSection: boolean = false;

  fb = inject(FormBuilder);
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
    }
  }

  get isFormValid() {
    return this.resetPasswordForm.valid;
  }

  get email() {
    return this.resetPasswordForm.get('email');
  }
}
