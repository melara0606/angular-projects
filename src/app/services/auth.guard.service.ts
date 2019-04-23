import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  public constructor(
    private auth: LoginService,
    public router: Router
  ) { }

  canActivate(): boolean {
    if (this.auth.isAuthenticated()) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
