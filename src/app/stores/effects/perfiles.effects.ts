import { of } from 'rxjs';
import { Injectable, Pipe } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, mergeMap } from 'rxjs/operators';

// Actions
import * as perfilActions from 'src/app/stores/actions/perfiles.actions';

// servicio
import { Perfil } from 'src/app/models/Perfil';
import { PerfilesService } from 'src/app/services/perfiles.service';

@Injectable()
export class PerfilesEffects {
  constructor(
    private $action: Actions,
    private perfilesService: PerfilesService
  ) { }

  @Effect()
  cargarPerfiles$ = this.$action.pipe(
    ofType( perfilActions.PerfilesTypesActions.CargarPerfiles ),
    mergeMap(() => this.perfilesService.getPerfiles().pipe(
      map((perfiles: Perfil[]) => new perfilActions.PerfilesGetItems(perfiles)),
      catchError((error) => of(new perfilActions.PerfilesFails(error)))
    ))
  );

  @Effect()
  addPerfil$ = this.$action.pipe(
    ofType( perfilActions.PerfilesTypesActions.Add ),
    mergeMap((nombre) => this.perfilesService.add(nombre).pipe(
      map((perfil) => new perfilActions.PerfilesAddPush(perfil) ),
      catchError((error) => of(new perfilActions.PerfilesFails(error)))
    ))
  );

  @Effect()
  update = this.$action.pipe(
    ofType(perfilActions.PerfilesTypesActions.UpdatePerfil),
    mergeMap((action) => this.perfilesService.edit(action['id'], action['nombre']).pipe(
      map((perfil) => new perfilActions.PerfilesEditPop(action['id'], perfil))
    ))
  );

  // Perfil
  @Effect()
  getById = this.$action.pipe(
    ofType(perfilActions.PerfilesTypesActions.GetItem),
    mergeMap((payload) => this.perfilesService.getById(payload).pipe(
      map((perfil) => new perfilActions.PerfilItemSucess(perfil))
    ))
  );

  @Effect()
  deleteById = this.$action.pipe(
    ofType(perfilActions.PerfilesTypesActions.DeleteItem),
    mergeMap((payload) => this.perfilesService.deleteById(payload).pipe(
      map((response) => new perfilActions.PerfilDeleteSucess(response))
    ))
  );

  // Recursos
  @Effect()
  addRecurso = this.$action.pipe(
    ofType(perfilActions.PerfilesTypesActions.AddRecurso),
    map((action) => action['payload']),
    mergeMap((payload: any) => this.perfilesService.addRecurso(payload).pipe(
      map((result) => new perfilActions.PerfilRecursoAddSucess(result) )
    ))
  );

  @Effect()
  updateRecurso = this.$action.pipe(
    ofType(perfilActions.PerfilesTypesActions.UpdateRecurso),
    map((action) => action['payload']),
    switchMap((payload) => this.perfilesService.updateRecurso(payload).pipe(
      map((result) => new perfilActions.PerfilRecursoUpdateSucess(result))
    ))
  );
}
