import { HttpUserEvent } from '@angular/common/http';
import { Component } from '@angular/core';
// import { User } from '/src/app/model/user.ts'


@Component({
  selector: 'app-profile-settings',
  standalone: true,
  imports: [],
  templateUrl: './profile-settings.component.html',
  styleUrl: './profile-settings.component.css'
})
export class ProfileSettingsComponent {

  // public user: User;

  constructor (){
    // this.user 
  }

  public editar(photo: String, fullname: String , dni: String, birth_date: String, email: String, password: String, password2: String, address: String){

    console.log(fullname, dni, birth_date)
  }

}
