import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  template: `
    <section class="header-section flex items-center justify-between px-4 relative">
      <div class="text-center">
        <img
          src="/assets/images/VoltixLoginBlanco.svg"
          alt="Voltix logo"
          class="w-28"
        />
      </div>

      <div class="user-container">
        <div class="user-avatar" (click)="toggleDropdown()">
          <img
            [src]="user?.photo || 'assets/avatar-default.png'"
            alt="Avatar"
            class="avatar"
          />
        </div>

        <!-- Dropdown -->
        <div class="dropdown" [class.hidden]="!isDropdownOpen">>
          <ul>
            <li class="dropdown-item" (click)="closeDropdown()">
              <img src="/assets/icons/close-x.svg" alt="Close Icon" class="closeX" />
            </li>
            <li class="dropdown-item mb-4" (click)="navigateTo('profile')">
              <img src="/assets/icons/user.svg" alt="User Icon" class="icon" /> 
              Mi perfil
              <img src="/assets/icons/chevron-right.svg" alt="Chevron" class="chevronRight" />
            </li>
            <li class="dropdown-item my-4" (click)="navigateTo('notifications')">
              <img src="/assets/icons/alerts.svg" alt="Alerts Icon" class="icon" />
              Notificaciones
              <img src="/assets/icons/chevron-right.svg" alt="Chevron" class="chevronRight" />
            </li>
            <li class="dropdown-item my-4">
              <img src="/assets/icons/question-circle.svg" alt="Help Icon" class="icon" />
              Ayuda
              <img src="/assets/icons/chevron-right.svg" alt="Chevron" class="chevronRight" />
            </li>
            <hr />
            <li class="dropdown-item my-4" (click)="logout.emit()">
              <img src="/assets/icons/exit.svg" alt="Logout Icon" class="icon" />
              Cerrar Sesión
              <img src="/assets/icons/chevron-right.svg" alt="Chevron" class="chevronRight" />
            </li>
          </ul>
        </div>
      </div>
    </section>
  `,
  styles: `
  .hidden { display: none; }
  `
})
export class NavbarComponent {
  @Input() user: any;
  @Output() navigate = new EventEmitter<string>();
  @Output() logout = new EventEmitter<void>();

  isDropdownOpen = false;

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown(): void {
    this.isDropdownOpen = false;
  }

  navigateTo(route: string): void {
    this.navigate.emit(route);
  }

}
