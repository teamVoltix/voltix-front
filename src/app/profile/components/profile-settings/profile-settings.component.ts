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
  isPasswordVisible: boolean = false;
  isPassword2Visible: boolean = false;

 
  constructor (
    private formBuilder: FormBuilder){

      this.settingsForm = this.formBuilder.group({
        
        photo: [],
        fullname: [],
        birth_date: [],
        email: ['', [,Validators.email]],
        password: ['', [Validators.minLength(8), Validators.maxLength(15), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&#.,-])[A-Za-z\\d@$!%*?&#.,-]{8,15}$')]],
        password2: ['', [, this.passwordsMatch]],
        address: []
      },
      {
        validators: this.passwordsMatch,
      }
    )
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
    if (this.settingsForm.valid) {
      console.log('El formulario es válido.', this.settingsForm.value);
   }
   else{
    console.log('El formulario no es válido')
   }
  }
  public editar(photo: String, fullname: String , birth_date: String, email: String, password: String, password2: String, address: String){

    console.log(photo, fullname, birth_date, email, password, address)
  }


}
