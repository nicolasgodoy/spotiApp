import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    
    constructor(public authService: AuthService)
    {

    }
intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if(req.url.includes('token'))
    {
        return next.handle(req);
    }

    const token = localStorage.getItem('access_token');
    let authReq = req;

    if(token != null)
    {
        authReq = this.addTokenHeader(req, token);
        return next.handle(authReq).pipe(catchError( error => {

            if (error.status === 401) {
                localStorage.removeItem('access_token');
                localStorage.removeItem('token_type');
                localStorage.removeItem('expires_in');

                this.refreshTokenSubject.next(null);

                this.generateToken();

                return this.refreshTokenSubject.pipe(
                    filter(token => token !== null),
                    take(1),
                    switchMap((token) => next.handle(this.addTokenHeader(req, token)))
                );
            }

            return throwError(error);
         }));
    }

    this.refreshTokenSubject.next(null);

    this.generateToken();

    return this.refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap((token) => next.handle(this.addTokenHeader(req, token)))
    );


  }

  private generateToken()
  {
    this.authService.getToken().subscribe((resp : any) => {
        
        localStorage.setItem('access_token', resp.access_token);
        localStorage.setItem('token_type', resp.token_type);
        localStorage.setItem('expires_in', resp.expires_in);

        this.refreshTokenSubject.next(resp.access_token);
    })
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    /* for Spring Boot back-end */
    // return request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });

    /* for Node.js Express back-end */
    return request.clone({ headers: request.headers.set('Authorization', `Bearer ${token}`) });
  }

}