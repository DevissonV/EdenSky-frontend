import { Inject, inject, Injectable, Type } from '@angular/core';
import { HttpEvent,HttpHandlerFn, HttpInterceptorFn,HttpRequest } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { LoginService } from '../../core/services/login.service';
import { Router } from '@angular/router';

export const interceptor: HttpInterceptorFn = (
    request: HttpRequest<any>,
    next: HttpHandlerFn,
): Observable<HttpEvent<any>> => {
    
    const loginService = inject(LoginService);
    const router = inject(Router);
    const token = loginService.getToken();

    if (token) {
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`,
            },
        });
    }

    return next(request).pipe(
        catchError((error) => {
            const codeStatus = [401,403];

            if (codeStatus.includes(error.status)) {
                router.navigate(['/login']);
            }
            return throwError(error);
        }),
    );
}

