import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
} from '@angular/common/http';

import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(tap(() => { },
      (error: any) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 403) {
            alert(error.status);
          }
        }
      }
    ));
  }
}
