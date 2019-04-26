import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

// services
import { AppState } from 'src/app/app.reducers';
import { Usuario } from './../../models/Usuario';
import { UsuariosLoad } from '../../stores/actions/usuarios.actions';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {
  public loading: boolean;
  public usuarios: Usuario[];

  constructor(
    public store: Store<AppState>,
    public usuarioService: UsuariosService
  ) {
    this.store.select('usuarios').subscribe(data => {
      this.usuarios = data.items;
      this.loading = data.loading;
    });
  }

  ngOnInit() {
    this.store.dispatch( new UsuariosLoad() );
  }
}
