import { Component, inject, OnInit } from '@angular/core';
import { ProfileService } from '../../service/profile.service';
import { User } from '../../../model/user';
import { RouterLink } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, AbstractControl, FormControl } from '@angular/forms';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  user!: User;
  public userTest: User;
  public perfilForm: FormGroup;
  public edit: Boolean = true;
  public save: Boolean = false;

  // user: User = mockUser;
  private service = inject(ProfileService);
  private location = inject(Location);

  constructor(private fb: FormBuilder ) {
    this.userTest = {
      iprofile_id: 1,
      user: 'user',
      fullname: 'Mock User',
      dni: 'Y4074276R',
      birth_date: '11/01/1986',
      email: 'mockUser@vamoEquipo',
      password: '**********',
      address: 'Calle sita 999',
      phoneNumber: '522698741', 
      photo: 'https://images.pexels.com/photos/4129015/pexels-photo-4129015.jpeg'
    }

  
    this.perfilForm = this.fb.group({
      user: [],
      fullname: [{ value: '', disabled: true }],
      dni: ({ value: '', disabled: true }),
      phoneNumber: [{ value: '', disabled: true }],
      address: [{ value: '', disabled: true }],
      email: [{ value: '', disabled: true }, [,Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)]],
      password: [{ value: '', disabled: true }, [Validators.minLength(8), Validators.maxLength(15), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&#.,-])[A-Za-z\\d@$!%*?&#.,-]{8,15}$')]],
    })
  }


  public enable(fullname: string, dni: string, phoneNumber: string, address: string, email: string, password: string): void {
    this.perfilForm.get(fullname)?.enable();
    this.perfilForm.get(dni)?.enable();
    this.perfilForm.get(phoneNumber)?.enable();
    this.perfilForm.get(address)?.enable();
    this.perfilForm.get(email)?.enable();
    this.perfilForm.get(password)?.enable();
    // this.perfilForm.get(photo)?.enable();

    this.edit = false;
    this.save = true;
  }
  disable(fullname: string, dni: string, phoneNumber: string, address: string, email: string, password: string): void {
    this.perfilForm.get(fullname)?.disable();
    this.perfilForm.get(dni)?.disable();
    this.perfilForm.get(phoneNumber)?.disable();
    this.perfilForm.get(address)?.disable();
    this.perfilForm.get(email)?.disable();
    this.perfilForm.get(password)?.disable();
    // this.perfilForm.get(photo)?.disable();

    this.edit = true;
    this.save = false;
  }

  editUser(fullname: string, dni: string, phoneNumber: string, address: string, email: string, password: string){
    console.log(fullname, email)
  }
  
  ngOnInit(): void {
    this.service.profile().subscribe((data) => {
      console.log(data);
      this.user = data;
    });
  }
  
  logout(): void {
    this.service.logout();
  }
  goBack(): void {
    this.location.back();
  }

  onSubmit(): void {
    if (this.perfilForm.valid) {
      console.log('Formulario corrercto', this.perfilForm.value);
    }
  }
  
}
