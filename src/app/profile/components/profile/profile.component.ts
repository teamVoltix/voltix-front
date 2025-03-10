import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../service/profile.service';
import { User } from '../../../core/model/user';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { AuthService } from '../../../auth/service/auth-service.service';
import { DatePipe } from '@angular/common';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [DatePipe]
})

export class ProfileComponent implements OnInit {
  user: User = {
    user_id: 0,
    address: '',
    birth_date: '',
    phone_number: '',
    photo: '',
    email: '',
    fullname: '',
    dni: '',
  };

  originalUser!: User;
  public profileForm: FormGroup;
  public passwordForm: FormGroup;
  public photoForm: FormGroup;
  public edit: Boolean = true;
  public save: Boolean = false;
  public newPasswordPage: Boolean = false;
  public profileInputs: Boolean = true;
  public current_password: string = '';
  public new_password: string = '';
  public confirm_new_password: string = '';
  public selectedFile: File | null = null;
  public previewUrl: string | null = null;
  public modalProfileOpen = false;
  public modalPasswordOpen = false;
  file: File | null = null;

  // Inyección estándar en el constructor
  constructor(
    private fb: FormBuilder,
    private service: ProfileService,
    private router: Router,
    private authService: AuthService, // Ahora se inyecta en el constructor
    private datePipe: DatePipe 
  ) {
    this.profileForm = this.fb.group({
      phone_number: [{ value: '', disabled: true }],
      address: [{ value: '', disabled: true }],
      birth_date: [{ value: '', disabled: true }],
    });

    this.passwordForm = this.fb.group(
      {
        current_password: ['', [Validators.required]],
        new_password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(15),
            Validators.pattern(
              '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&#.,-])[A-Za-z\\d@$!%*?&#.,-]{8,15}$'
            ),
          ],
        ],
        confirm_new_password: ['', [Validators.required, this.passwordsMatch]],
      },
      {
        validators: this.passwordsMatch,
      }
    );

    this.photoForm = this.fb.group({
      photo: [null],
    });
  }

  ngOnInit(): void {
    this.service.profile().subscribe((data) => {
      this.user = data;
      this.originalUser = { ...data };
    });
  }

  enable(phone_number: string, address: string, birth_date: string): void {
    this.profileForm.get(phone_number)?.enable();
    this.profileForm.get(address)?.enable();
    this.profileForm.get(birth_date)?.enable();
    this.edit = false;
    this.save = true;
  }

  disable(phone_number: string, address: string, birth_date: string): void {
    this.profileForm.get(phone_number)?.disable();
    this.profileForm.get(address)?.disable();
    this.profileForm.get(birth_date)?.disable();

    this.edit = true;
    this.save = false;
  }
  saveUser() {
    const updatedUser: Partial<User> = {};

    if (this.profileForm.get('phone_number')?.dirty) {
      updatedUser.phone_number = this.profileForm.get('phone_number')?.value;
    } else {
      updatedUser.phone_number = this.originalUser.phone_number;
    }

    if (this.profileForm.get('address')?.dirty) {
      updatedUser.address = this.profileForm.get('address')?.value;
    } else {
      updatedUser.address = this.originalUser.address;
    }

    if (this.profileForm.get('birth_date')?.dirty) {
      updatedUser.birth_date = this.profileForm.get('birth_date')?.value;
    } else {
      updatedUser.birth_date = this.originalUser.birth_date;
    }
    this.service.editUser(updatedUser).subscribe({
      next: () => {
        this.closeModalProfile();
        this.ngOnInit();
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }

  formatDate(date: string): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy') || ''; // Formato de fecha dd/MM/yyyy
  }

  onSubmit() {
    if (this.passwordForm.valid) {
      const { current_password, new_password, confirm_new_password } =
        this.passwordForm.value;

      this.service
        .editPassword(current_password, new_password, confirm_new_password)
        .subscribe({
          next: (res) => this.showSuccessAlert(),
          error: (error) => {
            console.error('Error:', error), this.showErrorAlert();
          },
        });
      this.closeModalPassword();
      this.profileInputs = true;
      this.newPasswordPage = false;
    } else {
      console.error('Inválido');
    }
  }

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      this.photoForm.patchValue({ photo: file });
      this.uploadPhoto(file);
    }
  }

  uploadPhoto(file: File): void {
    this.service.uploadPhoto(file).subscribe({
      next: (response) => {
        if (response.photo_url) {
          this.user.photo = response.photo_url;
        }
      },
      error: (error) => {
        console.error('Error al subir la foto', error);
        this.showErrorPhotoAlert();
      },
    });
  }

  openModalProfile() {
    this.modalProfileOpen = true;
  }
  closeModalProfile() {
    this.modalProfileOpen = false;
  }
  openModalPassword() {
    this.modalPasswordOpen = true;
  }
  closeModalPassword() {
    this.modalPasswordOpen = false;
  }

  changepassword() {
    this.newPasswordPage = true;
    this.profileInputs = false;
  }

  passwordsMatch(group: FormGroup) {
    const newPassword = group.get('new_password')?.value;
    const confirmPassword = group.get('confirm_new_password')?.value;
    return newPassword === confirmPassword ? null : { passwordMismatch: true };
  }
  getPhonePlaceholder(): string {
    return this.user.phone_number ? this.user.phone_number : '';
  }
  getAdressPlaceholder(): string {
    return this.user.address ? this.user.address : '';
  }
  logout(): void {
    this.service.logout();
  }
  goBack(): void {
    this.router.navigate(['/home']);
  }

  deleteAccount(): void {
    // Obtener el ID del usuario desde el servicio de autenticación
    const userId = this.authService.getUserId(); 
  
    // Verificar si el userId es válido
    if (!userId) {
      Swal.fire({
        title: 'Error',
        text: 'No se ha encontrado el ID del usuario. Intenta iniciar sesión nuevamente.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
      return;  // Detener la ejecución si no hay un ID válido
    }
  
    // Convertir el userId a número si es necesario
    const userIdNumber = Number(userId);  // Conversión de string a number
  
    // Verificar si la conversión fue exitosa
    if (isNaN(userIdNumber)) {
      Swal.fire({
        title: 'Error',
        text: 'El ID de usuario no es válido.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
      return;
    }
  
    // Confirmación antes de eliminar la cuenta
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Dispondrás de 30 días para recuperar tu cuenta antes de que sea eliminada definitivamente',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        // Llamar al servicio de eliminación pasando el ID convertido a número
        this.service.deleteUserAccount(userIdNumber).subscribe({
          next: () => {
            // Mostrar mensaje de éxito
            Swal.fire({
              title: 'Cuenta eliminada',
              text: 'Tu cuenta ha sido eliminada con éxito. Si deseas reactivarla, inicia sesión en los próximos 30 días.',
              icon: 'success',
              confirmButtonText: 'Aceptar',
            });
            // Redirigir al login o página de inicio
            this.router.navigate(['/login']);
          },
          error: (error) => {
            console.error('Error al eliminar la cuenta:', error);
            Swal.fire({
              title: 'Error',
              text: 'Hubo un problema al eliminar la cuenta. Intenta nuevamente.',
              icon: 'error',
              confirmButtonText: 'Aceptar',
            });
          },
        });
      }
    });
  }  
  
  showSuccessAlert() {
    Swal.fire({
      title: 'Actualizado correctamente',
      text: 'Actualiza el sitio para ver los cambios.',
      icon: 'success',
      confirmButtonText: 'Aceptar',
      position: 'top-end',
      width: 500,
    });
  }
  showErrorAlert() {
    Swal.fire({
      title: 'La contraseña actual no coincide',
      text: 'Actualiza el sitio para ver los cambios.',
      icon: 'error',
      confirmButtonText: 'Aceptar',
      position: 'top-end',
      width: 600,
    });
  }
  showErrorPhotoAlert() {
    Swal.fire({
      title: 'Error en cargar la foto',
      text: 'OOPS! Algo salió mal!',
      icon: 'error',
      confirmButtonText: 'Aceptar',
      position: 'top',
      width: 300,
      showConfirmButton: false,
      timer: 1500,
    });
  }
}
