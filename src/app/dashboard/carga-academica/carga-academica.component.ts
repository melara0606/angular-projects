import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

import {
  Controller
} from '../all-utils';

@Component({
  selector: 'app-carga-academica',
  templateUrl: './carga-academica.component.html',
  styleUrls: ['./carga-academica.css']
})
export class CargaAcademicaComponent extends Controller implements OnInit, OnDestroy {
  constructor(
    public router: Router
  ) {
    super(null, router );
  }

  ngOnInit() {
    this.addClassContainerFluid();
  }

  ngOnDestroy(): void {
    this.removeClassContainerFluid();
  }
}
