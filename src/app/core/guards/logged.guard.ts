import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SecurityService } from 'src/app/shared/services/security.service';

export const loggedGuard: CanActivateFn = (route, state) => {
  const securityService = inject(SecurityService);
  const router = inject(Router);
  if (securityService.isLogged() && securityService.getUserData()) {
    router.navigate(['/home']);
    return false;
  }
  return true;
};
