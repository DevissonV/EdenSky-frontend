import { CanMatchFn, GuardResult, MaybeAsync } from '@angular/router';
import { LoginService } from '../services/LoginService/login.service';
import { inject } from '@angular/core';
import { map } from 'rxjs';

export const authGuard: CanMatchFn = (
  route, 
  segments,

):MaybeAsync<GuardResult> => {
 return true
};
