import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services';

export const authenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  if(authService.isAuthenticated()) {
    if(authService.getUserLoggedIn()?.role === 'ROLE_ADMIN')
      return router.navigate(['/admin']);
    else if(authService.getUserLoggedIn()?.role === 'ROLE_RECRUITER')
      return router.navigate(['/recruiter']);
    else if(authService.getUserLoggedIn()?.role === 'ROLE_APPLICANT')
      return router.navigate(['/applicant']);
  }

  authService.logout();
  return true;
};
