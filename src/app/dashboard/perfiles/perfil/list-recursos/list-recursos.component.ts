import { Store } from '@ngrx/store';
import { NgForm } from '@angular/forms';
import { Component, Input } from '@angular/core';

import { PerfilesService } from 'src/app/services/perfiles.service';
import { AppState } from 'src/app/stores/reducers/usuarios.reducers';
import {
  PerfilDelete, PerfilRecursoAdd, PerfilRecursoUpdate
} from '../../../../stores/actions/perfiles.actions';

// Modal configuration
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-list-recursos',
  templateUrl: './list-recursos.component.html',
  styles: [`
    .bg-light-info{
      font-size: 1.4em;
      padding: 15px;
      border-radius: 3px;
    }
    .pointer-courser {
      cursor:pointer;
    }
  `]
})
export class ListRecursosComponent {
  @Input() perfil: number;
  @Input() recursos: any[] = [];

  public routes: any[] = [];
  public recursoElement: any = {};
  public recursosInNot: any[] = [];

  constructor(
    private store: Store<AppState>,
    private modalService: NgbModal,
    private loginService: LoginService,
    private perfilService: PerfilesService
  ) {
    this.routes = this.loginService.getRouteScope('perfil');
  }

  deleteById(recurso: any) {
    this.store.dispatch(new PerfilDelete(recurso));
  }

  add(content) {
    if (this.routes.includes('perfil.agregar')) {
      this.perfilService.recursosNotIn(this.perfil).subscribe((response) => {
        this.open(content);
        this.recursoElement = { type: 'add' };
        this.recursosInNot = response['recursos'];
      });
    }
  }

  editById(recurso: any, content) {
    if (this.routes.includes('perfil.editar')) {
      this.open(content);
      this.recursoElement = { ...recurso, type: 'update' };
    }
  }

  saveUpdate(forma: NgForm, modal: NgbActiveModal) {
    if (forma.valid) {
      const value = forma.value;
      modal.close();

      if (this.recursoElement.type === 'update') {
        this.store.dispatch(new PerfilRecursoUpdate({
          ...this.recursoElement
        }));
      } else if (this.recursoElement.type === 'add') {
        this.store.dispatch(new PerfilRecursoAdd({ ...value, perfil: this.perfil }));
      }
    }
  }

  // modal
  private open(content) {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title', centered: true, size: 'lg'
    }).result.then((result) => { }, (reason) => { });
  }
}
