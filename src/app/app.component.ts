
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { RouterModule } from '@angular/router';
import { LogoutComponent } from './auth/components/logout/logout.component';

import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FlowbiteService } from './core/services/flowbite.service';


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

  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'template-angular-ts';

  constructor(private flowbiteService: FlowbiteService) {}

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      // Your custom code here
      console.log('Flowbite loaded', flowbite);
    });

  }
}
