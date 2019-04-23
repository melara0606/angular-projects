import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { LoginService } from '../services/login.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  public constructor(public loginService: LoginService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (!req.url.includes('login')) {
      const token = JSON.parse(this.loginService.getTokenLocalStorage());
      req = req.clone({
        url: `${environment.server}/${req.url}`,
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(req);
  }
}
