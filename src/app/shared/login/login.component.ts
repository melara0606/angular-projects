import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

import { Usuario } from './../../models/Usuario';
import { LoginService } from './../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public usuario: Usuario = {
    email: null,
    password: null
  };
  public loading: boolean;

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {
    this.loading = false;
  }

  onSubmit(f: NgForm) {
    this.loading = true;
    this.loginService.login(this.usuario).subscribe((data: any) => {
      if (data) {
        this.loading = false;
        const { personal } = data;
        Swal.fire({
          title: 'Bienvenido (a)',
          text: `${personal[0]} ${personal[1]}`,
          type: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Entrar'
        }).then(() => {
          this.router.navigate(['']);
          this.loginService.setTokenLocalStorage(data.token);
        });
      }
    }, (response) => {
      this.loading = false;
      const { message } = response.error;
      Swal.fire({
        title: 'Error!',
        type: 'error',
        text: message,
        confirmButtonText: 'Ok ;('
      });
      f.reset({
        email: this.usuario.email,
        password: ''
      });
    });
  }
}
