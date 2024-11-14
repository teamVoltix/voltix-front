import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../service/profile.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  constructor(private service: ProfileService) {}

  ngOnInit(): void {
    this.service.getUser().subscribe((data) => {
      console.log(data);
    });
    console.log('OnInit not implemented.');
  }
}
