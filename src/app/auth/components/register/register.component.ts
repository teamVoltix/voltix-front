import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule], // Aquí importas CommonModule
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'], 
})
export class RegisterComponent {
  isPasswordVisible: boolean = false; 
  isRepeatPasswordVisible: boolean = false; 

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible; 
  }

  toggleRepeatPasswordVisibility() {
    this.isRepeatPasswordVisible = !this.isRepeatPasswordVisible; 
  }
}