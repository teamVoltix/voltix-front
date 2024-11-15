import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OnInit } from '@angular/core'
import { FlowbiteService } from '../core/services/flowbite.service';
import { ProfileSettingsComponent } from './profile/components/profile-settings/profile-settings.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProfileSettingsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'web-app';

  constructor(private flowbiteService: FlowbiteService){}

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite(flowbite => {
      
      console.log('Flowbite loaded', flowbite);
    });
  }
  
}
