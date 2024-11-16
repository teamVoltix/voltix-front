import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { RouterModule } from '@angular/router';
import { LogoutComponent } from './auth/components/logout/logout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, LogoutComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'web-app';

  ngOnInit() {
    initFlowbite();
  }
}
