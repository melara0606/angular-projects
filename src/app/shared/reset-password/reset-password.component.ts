import Swal from 'sweetalert2';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['../login/login.component.css']
})
export class ResetPasswordComponent {
  public forma: FormGroup;

  @Input() public data: any;
  @Output() public response = new EventEmitter();

  constructor(
    public loginService: LoginService
  ) {
    this.forma = new FormGroup({
      password: new FormControl('', [Validators.required]),
      password2: new FormControl('', [Validators.required, Validators.minLength(8)]),
      password3: new FormControl('')
    });

    this.forma.controls['password3'].setValidators([
      Validators.required, Validators.minLength(8), this.verifyPassword
    ]);
  }

  verifyPassword = (psw: FormControl): { [s: string]: boolean } => {
    if (this.forma.controls['password2'].value === psw.value) {
      return null;
    }
    return { existe: true };
  }

  public updatePassword() {
    if (this.forma.valid) {
      this.loginService.changePassword({
        usuario_cod: this.data[3], ...this.forma.value
      }).subscribe((response) => {
        Swal.fire({
          type: 'success',
          text: 'Hemos tenido exito en la peticion',
          title: 'Exito!'
        }).then(() => {
          this.response.emit({
            response: true
          });
        });
      }, (err) => {
        const { message } = err.error;
        Swal.fire({
          title: 'Error!',
          type: 'error',
          text: message
        });
      });
    }
  }
}
