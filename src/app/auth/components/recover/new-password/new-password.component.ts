import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../service/auth-service.service';

@Component({
  selector: 'app-new-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.css',
})
export class NewPasswordComponent implements OnInit {
  newPasswordForm!: FormGroup;

  showSuccessSection: boolean = false;
  token: string | null = null;
  uidb64: string | null = null;

  new_password: string = '';
  confirm_password: string = '';
  email: string = '';

  repeatPasswordTouched: boolean = false;
  errorPasswordCheck: string = '';
  errorPassword: string = '';
  passwordTouched: boolean = false;
  errorFieldsEmpty: string = '';
  hasUpperCase: boolean = false;
  hasLowerCase: boolean = false;
  hasNumber: boolean = false;
  hasSpecialChar: boolean = false;
  hasUpperCaseAndLowerCase: boolean = false;

  // modificare isFormValid
  isFormValid: any;
  isPasswordVisible: boolean = false;
  isRepeatPasswordVisible: boolean = false;

  fb = inject(FormBuilder);
  router = inject(Router);
  route = inject(ActivatedRoute);
  service = inject(AuthService);
  constructor() {
    this.newPasswordForm = this.fb.group({
      new_password: ['', Validators.required],
      confirm_password: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    // Ottieni il token dalla route
    this.uidb64 = this.route.snapshot.paramMap.get('uidb64');
    this.token = this.route.snapshot.paramMap.get('token');

    if (this.uidb64 && this.token) {
      console.log('uidb64:', this.uidb64);
      console.log('token:', this.token);
    }
  }
  passwordsMatch(): boolean {
    const password = this.newPasswordForm.get('new_password')?.value;
    const repeatPassword = this.newPasswordForm.get('confirm_password')?.value;
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
    for (const control in this.newPasswordForm.controls) {
      if (
        this.newPasswordForm.controls[control].invalid &&
        this.newPasswordForm.controls[control].touched
      ) {
        this.errorFieldsEmpty = '¡Error! Todos los campos son obligatorios.';
        break;
      }
    }
  }

  checkUpperAndLowerCase(): void {
    const password = this.newPasswordForm.value.new_password;
    this.hasUpperCaseAndLowerCase =
      /[A-Z]/.test(password) && /[a-z]/.test(password);
  }
  isPasswordValid(): boolean {
    const password = this.newPasswordForm.value.new_password;
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
      (this.newPasswordForm.get('new_password')?.valid ?? false) &&
      (this.newPasswordForm.get('confirm_password')?.valid ?? false)
    );
  }

  onSubmit() {
    this.resetPassword();
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToForgotPassword() {
    this.router.navigate(['/forgor-password']);
  }

  resetPassword() {
    const new_password = this.newPasswordForm.get('new_password')?.value;
    const confirm_password = this.newPasswordForm.get('confirm_password')?.value;
    if (
      this.new_password === this.confirm_password &&
      this.uidb64 &&
      this.token
    ) {
      this.service
        .newPassword(
          new_password,
          confirm_password,
          this.token,
          this.uidb64
        )
        .subscribe({
          next: (response) => {
            console.log('Password reset successful', response);
            this.showSuccessSection = true;
          },
          error: (error) => {
            console.error('Error resetting password', error);
            console.log('new_password:', this.newPasswordForm.value);
            console.log('confirm_password:', this.confirm_password);
            console.log('token:', this.token);
            console.log('uidb64:', this.uidb64);
          },
        });
    } else {
      console.error('Passwords do not match');
    }
  }
}
