import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
} from '@angular/common/http';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(
    public router: Router
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(tap(() => { },
      (error: any) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 403) {
            this.router.navigate(['error403']);
          }
        }
      }
    ));
  }
}
