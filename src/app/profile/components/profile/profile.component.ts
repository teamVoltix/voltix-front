import { Component, inject, OnInit } from '@angular/core';
import { ProfileService } from '../../service/profile.service';
import { User } from '../../../core/model/user';
import { CommonModule, Location } from '@angular/common';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  user: User = {
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
  public edit: Boolean = true;
  public save: Boolean = false;
  public newPasswordPage: Boolean = false;
  public profileInputs: Boolean = true;
  public currentPassword: string = '';
  public newPassword: string = '';
  public confirmPassword: string = '';
  public selectedFile: File | null = null;
  public previewUrl: string | null = null;
  public modalProfileOpen = false;
  public modalPasswordOpen = false;

  private service = inject(ProfileService);
  private location = inject(Location);
  photo = 'https://images.pexels.com/photos/4129015/pexels-photo-4129015.jpeg';

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      phone_number: [{ value: '', disabled: true }],
      address: [{ value: '', disabled: true }],
      birth_date: [{ value: '', disabled: true }],
    });

    this.passwordForm = this.fb.group(
      {
        currentPassword: ['', [Validators.required]],
        newPassword: [
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
        confirmPassword: ['', [Validators.required, this.passwordsMatch]],
      },
      {
        validators: this.passwordsMatch,
      }
    );
  }
  formatDate(date: string): string {
    return new Date(date).toLocaleDateString();
  }

  enable(phone_number: string, address: string, birth_date: string): void {
    this.profileForm.get(phone_number)?.enable();
    this.profileForm.get(address)?.enable();
    this.profileForm.get(birth_date)?.enable();
    this.edit = false;
    this.save = true;
  }

  //Deshabilitar campos y guardar datos
  disable(phone_number: string, address: string, birth_date: string): void {
    this.profileForm.get(phone_number)?.disable();
    this.profileForm.get(address)?.disable();
    this.profileForm.get(birth_date)?.disable();

    this.edit = true;
    this.save = false;
  }
  ngOnInit(): void {
    this.service.profile().subscribe((data) => {
      console.log(data);
      this.user = data;
      this.originalUser = { ...data };
    });
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

  //funcionale però envia todo los 3 datos a la vez
  /* saveUser() {
    this.service.editUser(this.profileForm.value).subscribe({
      next: () => {
        this.closeModalProfile();
        this.ngOnInit();
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  } */

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;

    if (fileInput.files && fileInput.files[0]) {
      this.selectedFile = fileInput.files[0];

      // Crear la vista previa
      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewUrl = e.target?.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
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

  editPhoto(): void {
    if (this.selectedFile) {
      console.log('Foto guardada:', this.selectedFile.name);
      alert('Foto de perfil actualizada.');
    }
  }

  changepassword() {
    console.log('Pasamos a cambiar contraseña');
    this.newPasswordPage = true;
    this.profileInputs = false;
  }

  passwordsMatch(group: FormGroup) {
    const newPassword = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { passwordMismatch: true };
  }

  savePassword(currentPassword: string, newPassword: string) {
    console.log(currentPassword, newPassword);
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
    this.location.back();
  }

  // onSubmitProfile() {
  //   if(this.profileForm.valid){
  //     const{fullname, dni, phone_number, address, email} = this.profileForm.value;
  //     console.log ('OnSubmit:', fullname, dni, phone_number, address, email)
  //   } else {
  //     console.log('Formulario inválido');
  //   }
  // }

  onSubmitPassword() {
    if (this.passwordForm.valid) {
      const { currentPassword, newPassword } = this.passwordForm.value;
      console.log('Contraseña actual:', currentPassword);
      console.log('Nueva contraseña:', newPassword);
    } else {
      console.log('Formulario inválido');
    }
  }
}
