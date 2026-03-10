import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const authGuard: CanActivateFn = () => {

  const router = inject(Router);
  const cookie = inject(CookieService);

  const user = cookie.get('user');

  if (user) {
    return true; // allow dashboard
  } else {
    router.navigate(['/signup']);
    return false;
  }
};