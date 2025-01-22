import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toggle-switch',
  standalone: true,
  imports: [],
  templateUrl: './toggle-switch.component.html',
  styleUrl: './toggle-switch.component.css'
})
export class ToggleSwitchComponent {
  @Input() isChecked = false;
  @Output() toggleChange = new EventEmitter<boolean>();

  onToggle() {
    this.isChecked = !this.isChecked;
    this.toggleChange.emit(this.isChecked);
  }

}
