import { HttpUserEvent } from '@angular/common/http';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

// import { User } from '/src/app/model/user.ts'


@Component({
  selector: 'app-profile-settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile-settings.component.html',
  styleUrl: './profile-settings.component.css'
})
export class ProfileSettingsComponent {
  
  settingsForm: FormGroup;
  errorEmail: string = '';
  isPasswordVisible: boolean = false;
  isPassword2Visible: boolean = false;
  password2Touched: boolean = false;
  errorPasswordCheck: string = '';
  errorPassword: string = '';
  passwordTouched: boolean = false;
 
  constructor (
    private fb: FormBuilder){

  this.settingsForm = this.fb.group({
    email: ['', [,Validators.email]],
    password: ['', [Validators.minLength(8), Validators.maxLength(15), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&#.,-])[A-Za-z\\d@$!%*?&#.,-]{8,15}$')]],
    password2: ['', Validators.required]
  },
  {
    validators: this.passwordsMatch
  }
);
}
togglePasswordVisibility() {
  this.isPasswordVisible = !this.isPasswordVisible;
}
togglePassword2Visibility() {
  this.isPassword2Visible = !this.isPassword2Visible;
}

  get email() {
    return this.settingsForm.get('email');
  }
  get password() {
    return this.settingsForm.get('password');
  }
  get password2() {
    return this.settingsForm.get('password2');
  }
  passwordsMatch(group: FormGroup) {
    const password = group.get('password')?.value;
    const password2 = group.get('password2')?.value;
    return password === password2 ? null : { passwordMismatch: true };
  }
  

  onSubmit(){
    if (this.settingsForm.valid){
      alert('Email válido:' + this.settingsForm.value.email)
    } else {
      alert('Email no válido')
    }
  
  }

  public editar(photo: String, fullname: String , dni: String, birth_date: String, email: String, password: String, password2: String, address: String){

    console.log(photo, fullname, dni, birth_date, email, password, address)
  }


}
