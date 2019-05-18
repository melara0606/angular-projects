import { Component } from '@angular/core';

@Component({
  selector: 'app-carga-empy',
  template: `
    <div>
      <h1>
        <i class="mdi mdi-flask-empty-outline"></i>
        <h2>Debes seleccionar un elemento para poder visualizar</h2>
      </h1>
    </div>
  `,
  styles: [`
    div {
      display: flex;
      height: 100%;
      justify-content: center;
      align-items: center;
    }
    div > h1 {
      width: 100%;
      font-size: 5rem;
      text-align:center;
    }
    h1 > h2 {
      margin-top: 10px;
      font-size: 2.5rem;
    }
  `]
})
export class CargaEmpyComponent {
  constructor() { }
}
