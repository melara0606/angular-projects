import { LoginService } from 'src/app/services/login.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent {
  @Input() user: object;

  constructor(
    private loginService: LoginService
  ) { }

  onToggleClassNavBar() {
    this.onToggleClass();
  }

  private onToggleClass(bandera = false, initial = false) {
    const $body = document.getElementsByTagName('body')[0];
    if (bandera) {
      if (initial) {
        $body.classList.add('mini-sidebar');
      } else {
        $body.classList.remove('mini-sidebar');
      }
    } else {
      $body.classList.toggle('mini-sidebar');
    }
  }
}
