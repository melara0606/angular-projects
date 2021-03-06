import { Component, Input } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [`
    a.waves-effect.active { background-color: transparent; }
  `]
})
export class SidebarComponent {
  @Input() user: object;
  @Input() routes: any[];

  constructor(
    private loginService: LoginService
  ) { }
}
