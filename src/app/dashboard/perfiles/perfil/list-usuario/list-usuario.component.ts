import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-list-usuario',
  templateUrl: './list-usuario.component.html',
  styles: []
})
export class ListUsuarioComponent{
  @Input() usuarios: any[] = [];
  constructor() {}
}
