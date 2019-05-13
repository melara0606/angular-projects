import { NgForm } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HorarioService } from './../../services/horario.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styles: []
})
export class HorariosComponent implements OnInit {
  public list: any = [];
  public itemHorario: any;
  public loading: boolean;
  public ctrl: FormControl;

  constructor(
    private modalService: NgbModal,
    private horarioService: HorarioService
  ) {
    this.loading = false;
    this.itemHorario = this.reset();
  }

  ngOnInit() {
    this.horarioService.getAll().subscribe(data => {
      this.list = data;
    });
  }

  saveOnUpdate(forma: NgForm, modal: NgbActiveModal) {
    if (forma.valid) {
      if (this.itemHorario.save) {
        this.horarioService.add({ ...this.itemHorario }).subscribe(data => {
          this.list.push(data);
          modal.close();
        });
      } else {
        this.horarioService.edit(this.itemHorario.id, {...this.itemHorario}).subscribe(data => {
          modal.close();
          this.list[this.itemHorario.$index] = data;
        });
      }
    }
  }

  public create(content) {
    this.itemHorario = this.reset();
    this.open(content);
  }

  public editar(item, content, $index) {
    this.itemHorario = this.reset();
    const { dias, timeSalida, timeEntrada, nombre, tipo_horario } = item;
    this.itemHorario.nombre = nombre;
    this.itemHorario.tipo_horario = tipo_horario;

    dias.forEach((el: any) => {
      this.itemHorario.dias[el.dia.toLowerCase()] = true;
    });
    this.itemHorario.timeSalida = {
      hour: parseInt(timeSalida.substr(0, 2)),
      minute: parseInt(timeSalida.substr(3, 2))
    };
    this.itemHorario.timeEntrada = {
      hour: parseInt(timeEntrada.substr(0, 2)),
      minute: parseInt(timeEntrada.substr(3, 2))
    };
    this.itemHorario.save = false;
    this.itemHorario.id = item.id;
    this.itemHorario.$index = $index;
    this.open(content);
  }

  private open(content) {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title', centered: true, size: 'lg'
    }).result.then((result) => { }, (reason) => { });
  }

  private reset() {
    return {
      nombre: null, tipo_horario: null,
      timeEntrada: { hour: 7, minute: 7 },
      timeSalida: { hour: 7, minute: 7 },
      dias: {
        lunes: false, martes: false, miercoles: false, jueves: false,
        viernes: false, sabado: false, domingo: false
      },
      save: true
    };
  }
}
