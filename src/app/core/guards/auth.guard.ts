import { CanActivateFn } from '@angular/router';
import { AuthService } from '../auth/service/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);

  if (authService.isAuthenticated()) {
    return true;
  }

  const user = await authService.loadCurrentUser();
  if (user) {
    return true;
  }

  authService.login();
  return false;
};
