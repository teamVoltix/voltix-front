import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { saveSettingsGuard } from './save-settings.guard';

describe('saveSettingsGuard', () => {
  const executeGuard: CanDeactivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => saveSettingsGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
