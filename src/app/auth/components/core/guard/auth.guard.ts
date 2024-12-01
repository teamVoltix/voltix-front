import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { StateService } from '../../../../core/state/state.service';

export const authGuard: CanActivateFn = (route, state) => {
  const stateService = inject(StateService);
  const router = inject(Router);

  if (stateService.isAuthenticated()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
