import Swal from 'sweetalert2';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PerfilesService } from './../../../services/perfiles.service';
import { PersonalesService } from './../../../services/personales.service';
import { NgbDatepickerConfig, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-personal-add',
  templateUrl: './personal-add.component.html',
  styles: [`
    [formControlName="fechaNacimiento"],
    [formControlName="fechaIngreso"]{
      padding: 19px;
    }
  `]
})
export class PersonalAddComponent implements OnInit {
  public id: number;
  public edit: boolean;
  public loading = false;
  public forma: FormGroup;
  // public oPersonal: any = {};
  public model: NgbDateStruct;
  public perfiles: any[] = [];
  public maskISSS = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
  public maskNup = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
  public masktelefono = [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public maskDui = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/];
  public maskNit = [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/];

  constructor(
    public route: Router,
    public router: ActivatedRoute,
    public config: NgbDatepickerConfig,
    public perfilService: PerfilesService,
    public personalesService: PersonalesService,
  ) {
    this.edit = false;
    const now = moment();
    config.minDate = { year: 1920, month: 1, day: 1 };
    config.maxDate = { year: now.year(), month: now.month() + 1, day: now.date() };

    this.perfilService.getPerfiles().subscribe(data => {
      this.perfiles = data;
    });
    this.createForm();
  }
  ngOnInit() {
    this.loading = true;
    this.router.params.subscribe((params) => {
      if (params.id) {
        this.id = params.id;
        this.personalesService.getById(params.id).subscribe(data => {
          this.loading = false;
          Object.keys(data).forEach(key => {
            if (this.forma.controls[key]) {
              let dataForm = data[key];
              if (key.includes('fecha')) {
                const momentData = moment( dataForm ).toArray();
                dataForm = { year: momentData[0], month: momentData[1] + 1, day: momentData[2]};
              }
              this.forma.controls[key].setValue(dataForm, { onlySelf: false });
            }
          });
        });
        this.edit = true;
      } else {
        this.loading = false;
      }
    });
  }

  // Agregar empleado.
  public saveOnUpdate() {
    if (this.forma.valid) {
      this.personalesService.addPersonal(this.forma.value)
        .subscribe(data => {
          Swal.fire({
            title: 'Exito!',
            text: `Hemos agregado con exito al nuevo empleado`,
            type: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Entrar'
          }).then(() => {
            this.route.navigate(['personales']);
          });
        }, (err) => {
          const { message } = err.error;
          Swal.fire({
            type: 'error',
            title: 'Error!',
            text: message
          });
        });
    }
  }

  public saveOnEdit() {
    if (this.forma.valid) {
      this.personalesService.editPersonal(this.id, this.forma.value)
        .subscribe(() => {
          Swal.fire({
            title: 'Exito!',
            text: `Hemos actualizado con exito al empleado`,
            type: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Entrar'
          }).then(() => {
            this.route.navigate(['personales']);
          });
        }, (err) => {
          const { message } = err.error;
          Swal.fire({
            type: 'error',
            title: 'Error!',
            text: message
          });
        });
    }
  }

  public reset() {
    this.route.navigate(['personales']);
  }

  // creando los campos del formulario
  public createForm() {
    this.forma = new FormGroup({
      nombres: new FormControl('', Validators.required),
      apellidos: new FormControl('', Validators.required),
      genero: new FormControl('', Validators.required),
      estado_civil: new FormControl('', Validators.required),
      fecha_nacimiento: new FormControl('', Validators.required),
      fecha_ingreso: new FormControl('', [Validators.required]),
      dui: new FormControl('', [Validators.required, Validators.minLength(10)], this.verify),
      nit: new FormControl('', [Validators.required, Validators.minLength(17)]),
      isss: new FormControl('', [Validators.required, Validators.minLength(8)]),
      nup: new FormControl('', [Validators.required, Validators.minLength(8)]),
      telefono: new FormControl('', [Validators.required, Validators.minLength(9)]),
      movil: new FormControl('', [Validators.required, Validators.minLength(9)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      perfil: new FormControl('', [Validators.required]),
      direccion: new FormControl('', [Validators.required]),
    });
  }

  verify = (control: FormControl): Promise<any> | Observable<any> => {
    if (this.edit) {
      return new Promise((resolve) => {
        resolve(null);
      });
    }

    return new Promise((resolve, reject) => {
      this.personalesService.searchById(control.value).subscribe((response) => {
        if (response === 0) {
          resolve(null);
        } else {
          resolve({ existe: true });
        }
      });
    });
  }
}
