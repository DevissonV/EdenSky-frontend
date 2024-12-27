import { inject, Injectable, Type } from '@angular/core';
import { HttpEvent,HttpHandlerFn, HttpInterceptorFn,HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../LoginService/login.service';

export const interceptor: HttpInterceptorFn = (
    request: HttpRequest<any>,
    next: HttpHandlerFn,
): Observable<HttpEvent<any>> => {
    console.log(request.url);
    const loginService = inject(LoginService);
    const token = loginService.getToken();

    if (token) {
        request = request.clone({
            setHeaders: {
                'Content-Type': 'application/json',
                Authorization: `'Authorization','Bearer '${token}`,
            },
        });
    }

    return next(request);
}

