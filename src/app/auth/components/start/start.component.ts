import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StateService } from '../../../core/state/state.service';

@Component({
  selector: 'app-start',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './start.component.html',
  styleUrl: './start.component.css',
})
export class StartComponent implements OnInit {
  private service = inject(StateService);

  ngOnInit() {
    this.service.getLogged();
    console.log('StartComponent initialized');
  }
}
