import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services';

export const recruiterGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if(authService.isAuthenticated() && authService.getUserLoggedIn()!.role === 'ROLE_RECRUITER')
    return true;

  return router.navigate(['/']);
};
