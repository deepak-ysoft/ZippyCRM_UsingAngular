import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  // For Authorization
  const isLogged = localStorage.getItem('jwtToken');
  const router = inject(Router);
  if (isLogged) {
    return true;
  } else {
    router.navigateByUrl('login');
    return false;
  }
};
