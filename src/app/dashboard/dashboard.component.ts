import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

declare function init_plugins();

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  public userData: object;
  public routes: any[] = [];

  constructor(
    private loginService: LoginService
  ) {    
    init_plugins();
    this.routes = this.loginService.getRoutesApplication();
    this.userData = this.loginService.getUserData();
  }
}
