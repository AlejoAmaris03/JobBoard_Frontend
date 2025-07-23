import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if(authService.isAuthenticated() && authService.getUserLoggedIn()!.role === 'ROLE_ADMIN')
    return true;

  return router.navigate(['/']);
};
