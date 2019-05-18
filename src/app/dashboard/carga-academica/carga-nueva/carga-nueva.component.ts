import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import {
  Controller,
  CargaAcademica,
  CargaAcademicaService
} from '../../all-utils';

@Component({
  selector: 'app-carga-nueva',
  templateUrl: './carga-nueva.component.html',
  styles: [`
    .m-n { margin: 0px; }
  `]
})
export class CargaNuevaComponent extends Controller implements OnInit {
  public forma: FormGroup;
  public horarios: [] = [];
  public niveles: any[] = [];
  public topics: any[] = [];
  public cargaAcademica: CargaAcademica;

  constructor(
    public cargaAcademicaService: CargaAcademicaService
  ) {
    super(null, null);
    this.cargaAcademicaService.getNivel().subscribe(data => this.niveles = data);
  }
  ngOnInit() {
    this.forma = new FormGroup({
      nivel: new FormControl('', Validators.required),
      topic: new FormControl('', [Validators.required]),
      type_horario: new FormControl('', Validators.required),
      horario: new FormControl('', [Validators.required]),
      fecha_inicio: new FormControl('', Validators.required),
      personal_cod: new FormControl('', Validators.required)
    });

    this.forma.controls['type_horario'].valueChanges.subscribe(value => {
      if (value) {
        this.cargaAcademicaService.getHorario(value).subscribe(values => this.horarios = values);
      }
    });

    this.forma.controls['nivel'].valueChanges.subscribe(value => {
      if (value) {
        this.cargaAcademicaService.getNivelTopics(value).subscribe(values => this.topics = values);
      }
    });
  }
}
