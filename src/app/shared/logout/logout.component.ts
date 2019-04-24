import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-logout',
  template: `
  <p>Login</p>`,
  styles: []
})
export class LogoutComponent {
  constructor(
    private router: Router,
    private loginService: LoginService
  ) {
    this.loginService.setTokenLocalStorage('', 'REMOVE');
    this.router.navigate(['login']);
  }
}
