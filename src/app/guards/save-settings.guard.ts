import { CanDeactivateFn } from '@angular/router';
import { NotificationsSettingsComponent } from '../notifications-settings/notifications-settings.component';

export const saveSettingsGuard: CanDeactivateFn<NotificationsSettingsComponent> = (
  component: NotificationsSettingsComponent,
  currentRoute,
  currentState,
  nextState
) => {
  if (component.handlePageLeave) {
    component.handlePageLeave();
  }
  return true;
};
