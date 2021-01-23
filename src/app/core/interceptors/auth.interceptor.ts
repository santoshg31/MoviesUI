import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { from, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth-service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private _authService: AuthService,
    private _router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.startsWith(environment.apiUrl)) {
      return from(this._authService.getAccessToken().then(token => {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        const authReq = req.clone({ headers });
        return next.handle(authReq).toPromise();
      }));
    }
    else {
      return next.handle(req);
    }
  }
}