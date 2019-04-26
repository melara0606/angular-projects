import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { Router, CanLoad, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanLoad {
  public constructor(
    private auth: LoginService,
    public router: Router
  ) { }

  canLoad(): boolean {
    if (this.auth.isAuthenticated()) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }

  // canActivate() { return this.authRedirect(); }
  // canLoad() { return this.authRedirect(); }
}
