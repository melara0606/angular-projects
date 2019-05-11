import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { NivelesService } from 'src/app/services/niveles.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-niveles',
  templateUrl: './niveles.component.html',
  styleUrls: ['./niveles.component.css']
})
export class NivelesComponent implements OnInit {
  public item: any;
  public list: any = [];
  public loading: boolean;

  constructor(
    private modalService: NgbModal,
    private nivelesService: NivelesService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.nivelesService.getNiveles().subscribe(data => {
      this.list = data;
      this.loading = false;
    });
  }

  addNivel() {
    this.openModal('Nuevo Nivel', '', '* Nombre del Nivel (min: 5)').then((result) => {
      if (result.value) {
        this.nivelesService.add({ nombre: result.value }).subscribe(data => {
          this.list.push(data);
        });
      }
    });
  }

  editNivel(item: any, index: number) {
    const { nombre, id } = item;
    this.openModal('Editar Nivel', nombre.trim(), '* Nombre del Nivel (min: 5)').then(result => {
      if (result.value) {
        this.nivelesService.edit(id, { nombre: result.value }).subscribe(data => {
          this.list[index] = data;
        });
      }
    });
  }

  // Modal
  private open(content, item: any) {
    this.item = item;
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title', centered: true, size: 'lg'
    }).result.then((result) => { }, (reason) => { });
  }

  private openModal(title = '', value = '', placeholder = 'Nombre del perfil (max: 25, min: 5)') {
    return Swal.fire({
      input: 'text',
      title: `${title.trim()}`,
      showCancelButton: true,
      inputValidator: this.validator,
      inputValue: `${value.trim()}`,
      inputPlaceholder: placeholder,
    });
  }

  private validator(value): Promise<string> {
    return new Promise((resolve) => {
      if (value === '') {
        resolve('El nombre del nivel es obligatorio');
      } else if (value.length < 5) {
        resolve('Debes digitar un nombre mayor o igual a 5');
      } else {
        resolve();
      }
    });
  }

  // Modal Function
  public editar(item: any, index: number) {
    item.editing = true;
  }

  public save(item, index, txt) {
    const { value } = txt;

    if (!value) {
      alert('El campo no puede estar vacio');
      return;
    }

    const { nombre, id } = item;
    if (value === nombre) {
      item.editing = false;
    } else {
      this.nivelesService.editTopics(id, { nombre: value }).subscribe(data => {
        this.item.items[index] = data;
      });
    }
  }

  public addTopics(input) {
    const { value } = input;
    const { id } = this.item;

    if (!value) {
      alert('El campo no puede estar vacio');
      return;
    }

    input.value = '';
    this.nivelesService.addTopics(id, { nombre: value }).subscribe(data => {
      this.item.items.push( data );
    });
  }
}
