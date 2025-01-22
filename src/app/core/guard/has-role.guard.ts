import { inject } from '@angular/core';
import { map } from 'rxjs';
import { CanActivateFn } from '@angular/router';
import { LoginService } from '../services/login.service';

export const hasRoleGuard: CanActivateFn = (route, state) => {
  const roles = route.data?.['roles'] as string[];
  return true;
};
