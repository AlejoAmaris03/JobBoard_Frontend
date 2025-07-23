import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services';
import { inject } from '@angular/core';

export const applicantGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if(authService.isAuthenticated() && authService.getUserLoggedIn()!.role === 'ROLE_APPLICANT')
    return true;

  return router.navigate(['/']);
};
