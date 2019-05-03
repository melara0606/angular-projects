import { Perfil } from 'src/app/models/Perfil';
import { Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from 'src/app/stores/reducers/perfiles.reducers';
import { PerfilItem } from 'src/app/stores/actions/perfiles.actions';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: []
})
export class PerfilComponent implements OnInit, OnDestroy {
  public perfil: Perfil;
  public loading: boolean;
  public subscription: Subscription;

  constructor(
    private router: ActivatedRoute,
    private store: Store<AppState>
  ) {
    this.subscription = this.store.select('perfiles').subscribe((payload) => {
      this.perfil = payload['item'];
      this.loading = payload['loading'];
    });
  }

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.store.dispatch( new PerfilItem (params.id) );
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
