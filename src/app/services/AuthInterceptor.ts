import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(
    null
  );
  private isRefreshing = false;

  constructor(public authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('token')) {
      return next.handle(req);
    }

    const token = localStorage.getItem('access_token');
    let authReq = req;

    if (token) {
      authReq = this.addTokenHeader(req, token);
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && !req.url.includes('token')) {
          return this.handle401Error(authReq, next);
        }
        return throwError(() => error);
      })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.getToken().pipe(
        switchMap((resp: { access_token: string; token_type: string; expires_in: string }) => {
          this.isRefreshing = false;
          const newToken = resp.access_token;
          localStorage.setItem('access_token', newToken);
          localStorage.setItem('token_type', resp.token_type);
          localStorage.setItem('expires_in', resp.expires_in);
          this.refreshTokenSubject.next(newToken);
          return next.handle(this.addTokenHeader(request, newToken));
        }),
        catchError((err: HttpErrorResponse) => {
          this.isRefreshing = false;
          localStorage.removeItem('access_token');
          return throwError(() => err);
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter((token: string | null): token is string => token !== null),
        take(1),
        switchMap((token: string) => next.handle(this.addTokenHeader(request, token)))
      );
    }
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`),
    });
  }
}
